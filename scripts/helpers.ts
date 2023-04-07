import prompts from 'prompts';
import { MarkdownTextSplitter, RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/document';
import {
  GithubRepoLoader,
  DirectoryLoader,
  JSONLoader,
  JSONLinesLoader,
  TextLoader,
  CSVLoader,
  PDFLoader,
  NotionLoader,
} from 'langchain/document_loaders';

const filePath = 'docs';

export const getGithubLoader = async () => {
  const promptAnswers = await prompts([
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
      initial: false,
      active: 'yes',
      inactive: 'no',
    },
  ]);

  const { repo, recursive, branch } = promptAnswers;

  const loader = new GithubRepoLoader(repo, {
    branch,
    recursive,
    unknown: 'warn',
  });

  const rawDocs: Document[] = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 10,
    chunkOverlap: 1,
  });

  const docs = await textSplitter.splitDocuments(rawDocs);

  return docs;
};

export const getDirectoryLoader = async () => {
  const loader = new DirectoryLoader(filePath, {
    '.pdf': (path) => new PDFLoader(path),
    '.json': (path) => new JSONLoader(path),
    '.jsonl': (path) => new JSONLinesLoader(path, '/html'),
    '.txt': (path) => new TextLoader(path),
    '.csv': (path) => new CSVLoader(path, 'text'),
  });

  const rawDocs: Document[] = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 10,
    chunkOverlap: 1,
  });

  const docs = await textSplitter.splitDocuments(rawDocs);

  return docs;
};

export const getNotionLoader = async () => {
  const loader = new NotionLoader(filePath);

  const rawDocs = await loader.load();

  const textSplitter = new MarkdownTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await textSplitter.splitDocuments(rawDocs);

  return docs;
};

export const getInitialUserPrompts = async () => {
  const promptAnswers = await prompts([
    {
      type: 'text',
      name: 'index',
      message: `Pinecone Index: `,
    },
    {
      type: 'text',
      name: 'namespace',
      message: `Pinecone Index Namespace: `,
      initial: 'default',
    },
    {
      type: 'select',
      name: 'loaderFunction',
      message: 'Choose loader: ',
      choices: [
        { title: 'GithubRepoLoader', value: getGithubLoader },
        { title: 'DirectoryLoader', value: getDirectoryLoader },
        { title: 'MarkdownLoader', value: getNotionLoader },
      ],
    },
  ]);

  return promptAnswers;
};
