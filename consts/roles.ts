import { Role } from '@/types';
import { prompts } from '@/utilities/pinecone/consts';

export const ROLES: Role[] = [
  {
    id: 'ASSISTANT',
    label: 'Assistant',
    description:
      'The Assistant role will act as a Virtual Assistant, giving very direct answers based only on the training material given.',
    temperature: 0,
    prompt: prompts.ASSISTANT,
  },
  {
    id: 'SOFTWARE_ENGINEER',
    label: 'Software Engineer',
    description:
      'The Software Engineer role will act as a coder, analyzing the given problem and attempt to give a solution based on the documentation training documentation.',
    temperature: 0.2,
    prompt: prompts.SOFTWARE_ENGINEER,
  },
  {
    id: 'TWEETER',
    label: 'Tweeter',
    description:
      'The Tweeter role will act as a social media influencer, returning a tweet based on the training material given.',
    temperature: 0.8,
    prompt: prompts.TWEETER,
  },
];
