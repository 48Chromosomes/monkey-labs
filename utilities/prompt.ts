import { ChatLog } from '@/types';

export const sendPrompt = async ({ chatLogs }: { chatLogs: ChatLog[] }) => {
  const res: Response = await fetch('/api/prompt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chatLogs }),
  });

  const response: ChatLog = await res.json();

  return response;
};
