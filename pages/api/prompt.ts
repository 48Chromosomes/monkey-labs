// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { openai } from '@/utilities/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('HELLO');
  console.log(req.body.chatLogs);
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: req.body.chatLogs,
    max_tokens: 1000,
  });

  const response = completion.data.choices[0].message || {};
  console.log(response);

  res.status(200).json(response);
}
