import type { NextApiRequest, NextApiResponse } from 'next';
import ejs from 'extract-json-string';

import { openai } from '@/utilities/openai';
import { ChatLog } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const messages = req.body.chatLogs.map((log: ChatLog) => ({ role: log.role, content: log.content }));

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 1000,
  });

  const response = completion.data.choices[0].message || { content: '' };

  response.content =
    JSON.stringify(ejs.extract(response.content)[0], undefined, 2) ||
    JSON.stringify(JSON.parse(response.content), undefined, 2);

  res.status(200).json(response);
}
