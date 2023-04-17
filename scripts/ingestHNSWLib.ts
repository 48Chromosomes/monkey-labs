import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

import { checkIndex, getInitialPromptsHNSWLib } from '@/utilities/helpers';

export const ingestHNSWLib = async () => {
  try {
    const promptAnswers = await getInitialPromptsHNSWLib();
    const { name, loaderFunction } = promptAnswers;

    //await checkIndex(name);

    const docs = await loaderFunction();

    console.log(`${docs.length} documents created...`);

    console.log('Ingesting data...');

    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

    await vectorStore.save(`vectors/${name}.bin`);
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};
