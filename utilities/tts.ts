export const sendTTS = async ({ text }: { text: string }) => {
  const res: Response = await fetch('/api/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  const response = await res.json();

  return response.audioContent;
};
