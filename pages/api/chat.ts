import type { NextApiRequest, NextApiResponse } from 'next';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';

import { getVectorStore } from '@/utilities/getVectorStore';
import { makeChain } from '@/utilities/pinecone/makechain';
import { ChatLog } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { question, chatLogs, currentIndex, currentRole, currentVectorStore } = req.body;

  const history = chatLogs.map((log: ChatLog) => log.content);

  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }

  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

  const vectorStore: PineconeStore | HNSWLib = await getVectorStore({
    currentIndex,
    currentVectorStore,
  });

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
  });

  const sendData = (data: string) => {
    res.write(`data: ${data}\n\n`);
  };

  sendData(JSON.stringify({ data: '' }));

  const chain = makeChain(vectorStore, currentRole, (token: string) => {
    sendData(JSON.stringify({ data: token }));
  });

  try {
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: history || [],
    });

    sendData(JSON.stringify({ sourceDocs: response.sourceDocuments }));
  } catch (error) {
    console.log('error', error);
  } finally {
    sendData('[DONE]');
    res.end();
  }
}
