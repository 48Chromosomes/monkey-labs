import { OpenAIChat } from 'langchain/llms/openai';
import { LLMChain, ChatVectorDBQAChain, loadQAChain } from 'langchain/chains';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { VectorStore } from 'langchain/vectorstores';
import { CallbackManager } from 'langchain/callbacks';

import { CONDENSE_PROMPT, PROMPTS } from '@/templates/prompts';

import { Role } from '@/types';

export const makeChain = (
  vectorstore: PineconeStore | VectorStore,
  role: Role,
  onTokenStream?: (token: string) => void,
) => {
  const { prompt, temperature } = role;

  const questionGenerator = new LLMChain({
    llm: new OpenAIChat({ temperature }),
    prompt: CONDENSE_PROMPT,
  });

  const docChain = loadQAChain(
    new OpenAIChat({
      temperature,
      modelName: 'gpt-3.5-turbo',
      streaming: Boolean(onTokenStream),
      callbackManager: onTokenStream
        ? CallbackManager.fromHandlers({
            async handleLLMNewToken(token) {
              onTokenStream(token);
            },
          })
        : undefined,
    }),
    { prompt: PROMPTS[prompt] },
  );

  return new ChatVectorDBQAChain({
    vectorstore,
    combineDocumentsChain: docChain,
    questionGeneratorChain: questionGenerator,
    returnSourceDocuments: true,
    k: 4, //number of source documents to return
  });
};
