import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { VectorStoreToolkit } from 'langchain/agents';

import { initPinecone } from '@/utilities/pinecone/pinecone-client';
import { AllowedVectorStores } from '@/types';

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
  } else if (currentVectorStore === 'HNSWLib') {
    const vectorStore = await HNSWLib.load(`vectors/${currentIndex}.bin`, new OpenAIEmbeddings());
    return vectorStore;
  } else {
    throw new Error('Invalid vector store');
  }
};
