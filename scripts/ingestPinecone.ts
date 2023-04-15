import { OpenAIEmbeddings } from 'langchain/embeddings';
import { PineconeStore } from 'langchain/vectorstores';
import prompts from 'prompts';

import { initPinecone } from '../utilities/pinecone/pinecone-client.js';
import { checkIndex } from './helpers.js';
import { INITAL_PROMPTS_PINECONE } from './consts';

export const ingestPinecone = async () => {
  try {
    const pinecone = await initPinecone();
    const promptAnswers = await prompts(INITAL_PROMPTS_PINECONE);
    const { index, namespace, loaderFunction } = promptAnswers;

    await checkIndex(promptAnswers.index);

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
