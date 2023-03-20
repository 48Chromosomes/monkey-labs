import type { NextApiRequest, NextApiResponse } from 'next';
import { predict, PredictionState } from 'replicate-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prediction: PredictionState = await predict({
    model: 'prompthero/openjourney',
    input: {
      prompt: `mdjrny-v4 ${req.body.prompt} in the style of dark fantasy`,
      height: 512,
      width: 1024,
      num_outputs: 1,
      guidance_scale: 14,
      num_inference_steps: 50,
    },
    token: process.env.REPLICATE_API_TOKEN || '',
    poll: true,
  });

  // @ts-ignore
  res.status(200).json(prediction.output[0]);
}
