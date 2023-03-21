import type { NextApiRequest, NextApiResponse } from 'next';

import textToSpeech from '@google-cloud/text-to-speech';

const client = new textToSpeech.TextToSpeechClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const request = {
    input: { text: req.body.text },
    voice: { languageCode: 'en-US', name: 'en-GB-News-J' },
    audioConfig: { audioEncoding: 'MP3', pitch: -3 },
  };

  //@ts-ignore
  const [response] = await client.synthesizeSpeech(request);

  res.status(200).json(response);
}
