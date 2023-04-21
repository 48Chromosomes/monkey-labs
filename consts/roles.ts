import { Role } from '@/types';

export const ROLES: Role[] = [
  {
    id: 'ASSISTANT',
    label: 'Assistant',
    description:
      'The Assistant role will act as a Virtual Assistant, giving very direct answers based only on the training material given.',
    temperature: 0,
    prompt: 'QA_PROMPT',
  },
  {
    id: 'SOFTWARE_ENGINEER',
    label: 'Software Engineer',
    description:
      'The Software Engineer role will act as a coder, analyzing the given problem and attempt to give a solution based on the documentation training documentation.',
    temperature: 0,
    prompt: 'SOFTWARE_ENGINEER_PROMPT',
  },
  {
    id: 'TWEETER',
    label: 'Tweeter',
    description:
      'The Tweeter role will act as a social media influencer, returning a tweet based on the training material given.',
    temperature: 0.8,
    prompt: 'TWEETER_PROMPT',
  },
];
