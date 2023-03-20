export const sendImagePrompt = async ({ prompt }: { prompt: string }) => {
  const res: Response = await fetch('/api/midjourney', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  const response = await res.json();

  return response;
};
