import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

import { initPinecone } from '@/utilities/pinecone/pinecone-client';
import { AllowedVectorStores } from '@/types';
import fs from 'fs';

export const getVectorStore = async ({
  currentIndex,
  currentVectorStore,
}: {
  currentIndex: string;
  currentVectorStore: AllowedVectorStores;
}) => {
  if (currentVectorStore === 'Pinecone') {
    const pinecone = await initPinecone();

    const index = pinecone.Index(currentIndex);

    const vectorStore = await PineconeStore.fromExistingIndex(new OpenAIEmbeddings({}), {
      pineconeIndex: index,
      textKey: 'text',
      namespace: 'default',
    });

    return vectorStore;
  } else if (currentVectorStore === 'Local') {
    let vectorStore: any = {};

    fs.readFile(`vectors/${currentIndex}.json`, 'utf8', (err, data) => (vectorStore = data));

    return vectorStore;
  }
};
