import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

import { initPinecone } from '@/utilities/pinecone/pinecone-client';
import { checkIndex, getInitialPromptsPinecone } from '@/utilities/helpers';

export const ingestPinecone = async () => {
  try {
    const pinecone = await initPinecone();
    const promptAnswers = await getInitialPromptsPinecone();
    const { index, namespace, loaderFunction } = promptAnswers;

    await checkIndex(index);

    const docs = await loaderFunction();

    console.log(`${docs.length} documents created...`);

    console.log('Creating vector store...');

    const pineconeIndex = pinecone.Index(index);

    console.log('Ingesting data...');

    await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
      pineconeIndex,
      namespace: namespace,
      textKey: 'text',
    });
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};
