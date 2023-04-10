import { OpenAIEmbeddings } from 'langchain/embeddings';
import { PineconeStore } from 'langchain/vectorstores';
import { initPinecone } from '../utilities/pinecone/pinecone-client.js';
import { getInitialUserPrompts } from './helpers.js';

export const run = async () => {
  try {
    const pinecone = await initPinecone();
    const promptAnswers = await getInitialUserPrompts();
    const { index, namespace, loaderFunction } = promptAnswers;

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

(async () => {
  await run();
  console.log('Ingestion complete');
})();
