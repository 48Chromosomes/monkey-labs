WORK IN PROGRESS

This repository contains a Next.js application which uses ChainLang and Pinecone to create and communicate with OpenAI models using custom embeddings.

## Creating new AI models

To create a new AI model you can run `npm run ingest`. Ensure you have set your application keys for Pinecone in your .env file.

### Loaders

The prompt will ask you which type of loader you want to use. Select the loader you want based on what data you want to train the model on.

After running the command you will be prompted to select which loader you wish to use. Select one of the following:

#### GithubRepoLoader

If you choose the GithubRepoLoader it will ask you for a few more details such as repo URL, branch, and whether or not it should load reccurively.

#### DirectoryLoader

If you choose DirectoryLoader it will train the model on the files currently in the `/docs` directory. Only .pdf, .json, .jsonl, .txt, and .csv files can be loaded. All others will be ignored.

#### MarkdownLoader

If you choose Markdown Loader it will train the model on .md files located in the `/docs` directory. This is a good option for injesting Notion documentation for example.

## Running the app

To run the app simply run `npm start` if you just wish to use the applcation or `npm run dev` if you wish to modify the application for your own purposes.
