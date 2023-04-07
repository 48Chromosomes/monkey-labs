import type { NextApiRequest, NextApiResponse } from 'next';
import { initPinecone } from '@/utilities/pinecone-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pinecone = await initPinecone();
  const indexesList = await pinecone.listIndexes();

  res.status(200).json(indexesList);
}
