import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { PineconeClient } from '@pinecone-database/pinecone';

if ((process.env.NODE_ENV && !process.env.PINECONE_ENVIRONMENT) || !process.env.PINECONE_API_KEY) {
  throw new Error('Pinecone environment or api key vars missing');
}

export const initPinecone = async () => {
  try {
    const pinecone = new PineconeClient();

    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT ?? '',
      apiKey: process.env.PINECONE_API_KEY ?? '',
    });

    return pinecone;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
};
