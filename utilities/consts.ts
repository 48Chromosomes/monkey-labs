import { PromptObject } from 'prompts';

export const CHECK_INDEX_PROMPTS: PromptObject<string>[] = [
  {
    type: 'toggle',
    name: 'createIndex',
    message: `Index does not exist. Would you like to create index? `,
    initial: true,
    active: 'yes',
    inactive: 'no',
  },
];

export const GITHUB_LOADER_PROMPTS: PromptObject<string>[] = [
  {
    type: 'text',
    name: 'repo',
    message: `Repo URL: `,
  },
  {
    type: 'text',
    name: 'branch',
    message: `Branch: `,
    initial: 'main',
  },
  {
    type: 'toggle',
    name: 'recursive',
    message: `Recursive? `,
    initial: true,
    active: 'yes',
    inactive: 'no',
  },
];

export const CHECK_LOCAL_VECTOR_STORE_PROMPTS: PromptObject<string>[] = [
  {
    type: 'toggle',
    name: 'createIndex',
    message: `This index already exists. Continuing will overwrite the current version. Would you like to continue? `,
    initial: true,
    active: 'yes',
    inactive: 'no',
  },
];

export const SPLITTER_OPTIONS = {
  chunkSize: 1000,
  chunkOverlap: 200,
};
