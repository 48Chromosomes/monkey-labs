import prompts from 'prompts';

import { ingestHNSWLib } from './ingestHNSWLib';
import { ingestPinecone } from './ingestPinecone';

export const run = async () => {
  const promptAnswers = await prompts([
    {
      type: 'select',
      name: 'vectorStoreMethod',
      message: 'Choose vector store: ',
      choices: [
        { title: 'HNSWLib', value: ingestHNSWLib },
        { title: 'Pinecone', value: ingestPinecone },
      ],
    },
  ]);

  const { vectorStoreMethod } = promptAnswers;

  vectorStoreMethod();
};

(async () => await run())();
