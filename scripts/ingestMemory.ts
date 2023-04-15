import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import prompts from 'prompts';
import fs from 'fs';

import { checkLocalVectorStore } from './helpers.js';
import { INITAL_PROMPTS_MEMORY } from './consts';

export const ingestMemory = async () => {
  try {
    const promptAnswers = await prompts(INITAL_PROMPTS_MEMORY);

    const { name, loaderFunction } = promptAnswers;

    await checkLocalVectorStore(name);

    const docs = await loaderFunction();

    console.log(`${docs.length} documents created...`);

    console.log('Ingesting data...');

    const vectorStore = await MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());

    console.log('Writing data...');

    fs.writeFileSync(`vectors/${name}.json`, JSON.stringify(vectorStore));
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};
