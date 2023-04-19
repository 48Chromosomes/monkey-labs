import type { NextApiRequest, NextApiResponse } from 'next';
import { initPinecone } from '@/utilities/pinecone/pinecone-client';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body.currentVectorStore === 'Pinecone') {
    const pinecone = await initPinecone();

    const indexesList = await pinecone.listIndexes();

    res.status(200).json(indexesList);
  } else if (req.body.currentVectorStore === 'HNSWLib') {
    fs.readdir(path.join(process.cwd(), '/vectors'), (err, files) => {
      const indexesList: string[] = [];

      // Filter out hidden files
      files = files.filter((item) => !/(^|\/)\.[^\/\.]/g.test(item));

      files.forEach((file) => indexesList.push(file.split('.')[0]));

      res.status(200).json(indexesList);
    });
  }
}
