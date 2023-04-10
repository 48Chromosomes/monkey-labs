import type { NextApiRequest, NextApiResponse } from 'next';
import { ROLES } from '@/consts/roles';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(ROLES);
}
