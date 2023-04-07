import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { PineconeStore } from 'langchain/vectorstores';
import { makeChain } from '@/utilities/pinecone/makechain';
import { initPinecone } from '@/utilities/pinecone/pinecone-client';

import { ChatLog } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pinecone = await initPinecone();
  const { question, chatLogs, currentIndex, currentRole } = req.body;

  const history = chatLogs.map((log: ChatLog) => log.content);

  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }

  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

  const index = pinecone.Index(currentIndex);

  const vectorStore = await PineconeStore.fromExistingIndex(new OpenAIEmbeddings({}), {
    pineconeIndex: index,
    textKey: 'text',
    namespace: 'default',
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
