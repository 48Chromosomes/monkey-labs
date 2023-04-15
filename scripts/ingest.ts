import prompts from 'prompts';

import { ingestMemory } from './ingestMemory';
import { ingestPinecone } from './ingestPinecone';

export const run = async () => {
  const promptAnswers = await prompts([
    {
      type: 'select',
      name: 'vectorStoreMethod',
      message: 'Choose vector store: ',
      choices: [
        { title: 'Memory', value: ingestMemory },
        { title: 'Pinecone', value: ingestPinecone },
      ],
    },
  ]);

  const { vectorStoreMethod } = promptAnswers;

  vectorStoreMethod();
};

(async () => await run())();
