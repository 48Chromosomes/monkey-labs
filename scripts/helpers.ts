import prompts from 'prompts';
import { MarkdownTextSplitter, RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { CustomPDFLoader } from '@/utilities/pinecone/customPDFLoader';
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
import { initPinecone } from '@/utilities/pinecone/pinecone-client';

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
      initial: true,
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
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await textSplitter.splitDocuments(rawDocs);

  return docs;
};

export const getPDFLoader = async () => {
  const directoryLoader = new DirectoryLoader(filePath, {
    '.pdf': (path) => new CustomPDFLoader(path),
  });

  const rawDocs: Document[] = await directoryLoader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await textSplitter.splitDocuments(rawDocs);

  return docs;
};

export const getDirectoryLoader = async () => {
  const loader = new DirectoryLoader(filePath, {
    '.pdf': (path) => new CustomPDFLoader(path),
    '.json': (path) => new JSONLoader(path),
    '.jsonl': (path) => new JSONLinesLoader(path, '/html'),
    '.txt': (path) => new TextLoader(path),
    '.csv': (path) => new CSVLoader(path, 'text'),
  });

  const rawDocs: Document[] = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
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
        { title: 'PDFLoader', value: getPDFLoader },
        { title: 'MarkdownLoader', value: getNotionLoader },
        { title: 'GithubRepoLoader', value: getGithubLoader },
        { title: 'DirectoryLoader', value: getDirectoryLoader },
      ],
    },
  ]);

  await checkIndex(promptAnswers.index);

  return promptAnswers;
};

export const checkIndex = async (indexName: string) => {
  const pinecone = await initPinecone();
  const indexesList = await pinecone.listIndexes();

  if (!indexesList.includes(indexName)) {
    const promptAnswers = await prompts([
      {
        type: 'toggle',
        name: 'createIndex',
        message: `Index does not exist. Would you like to create index ${indexName}? `,
        initial: true,
        active: 'yes',
        inactive: 'no',
      },
    ]);

    const { createIndex } = promptAnswers;

    if (createIndex) {
      console.log(`Creating index '${indexName}'...`);
      await pinecone.createIndex({ createRequest: { name: indexName, dimension: 1536 } });
      await pollIndex({ indexName });
    } else {
      console.log('Exiting...');
      process.exit(1);
    }
  }
};

const pollIndex = ({ indexName }: { indexName: string }) => {
  console.log('Waiting for index to init...');
  const maxAttempts = 100;
  let attempts = 0;

  const executePoll = async (resolve: any, reject: any) => {
    const pinecone = await initPinecone();
    const result = await pinecone.describeIndex({ indexName });
    console.log(attempts, result);
    const { database } = result;
    attempts++;

    if (database?.status?.ready) {
      return resolve(result);
    } else if (maxAttempts && attempts === maxAttempts) {
      return reject(new Error('Exceeded max attempts'));
    } else {
      setTimeout(executePoll, 10000, resolve, reject);
    }
  };

  return new Promise(executePoll);
};
