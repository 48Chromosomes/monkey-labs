WORK IN PROGRESS

This repository contains a Next.js application which uses ChainLang and Pinecone to create and communicate with OpenAI models using custom embeddings.

## Creating new AI models

To create a new AI model you can run `npm run ingest`. Ensure you have set your application keys for Pinecone in your .env file.

Before running this command you must first fill the `/docs` directory with the content you wish to train your AI model on and adjusted the loader in `/scripts/ingest.ts`. See [LangChain documentation on what types of loaders are available](https://js.langchain.com/docs/modules/indexes/document_loaders/).

## Running the app

To run the app simply run `npm start` if you just wish to use the applcation or `npm run dev` if you wish to modify the application for your own purposes.
