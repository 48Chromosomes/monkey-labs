import { PromptObject } from 'prompts';

import { getPDFLoader, getNotionLoader, getGithubLoader, getDirectoryLoader } from './helpers';

export const INITAL_PROMPTS_PINECONE: PromptObject<string>[] = [
  {
    type: 'text',
    name: 'index',
    message: 'Pinecone Index: ',
  },
  {
    type: 'text',
    name: 'namespace',
    message: 'Pinecone Index Namespace: ',
    initial: 'default',
  },
  {
    type: 'select',
    name: 'loaderFunction',
    message: 'Choose loader: ',
    choices: [
      { title: 'PDFLoader', value: getPDFLoader },
      { title: 'MarkdownLoader', value: getNotionLoader },
      { title: 'GithubRepoLoader', value: getGithubLoader },
      { title: 'DirectoryLoader', value: getDirectoryLoader },
    ],
  },
];

export const INITAL_PROMPTS_MEMORY: PromptObject<string>[] = [
  {
    type: 'text',
    name: 'name',
    message: `Name embedding: `,
  },
  {
    type: 'select',
    name: 'loaderFunction',
    message: 'Choose loader: ',
    choices: [
      { title: 'PDFLoader', value: getPDFLoader },
      { title: 'MarkdownLoader', value: getNotionLoader },
      { title: 'GithubRepoLoader', value: getGithubLoader },
      { title: 'DirectoryLoader', value: getDirectoryLoader },
    ],
  },
];

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
