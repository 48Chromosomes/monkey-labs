import { OpenAIChat } from 'langchain/llms';
import { LLMChain, ChatVectorDBQAChain, loadQAChain } from 'langchain/chains';
import { PineconeStore } from 'langchain/vectorstores';
import { CallbackManager } from 'langchain/callbacks';

import { CONDENSE_PROMPT } from '@/templates/prompts';
import { prompts } from '@/utilities/pinecone/consts';
import { Role } from '@/types';

export const makeChain = (vectorstore: PineconeStore, role: Role, onTokenStream?: (token: string) => void) => {
  const questionGenerator = new LLMChain({
    llm: new OpenAIChat({ temperature: 0.2 }),
    prompt: CONDENSE_PROMPT,
  });

  const prompt = prompts[role];

  const docChain = loadQAChain(
    new OpenAIChat({
      temperature: 0.2,
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
    { prompt },
  );

  return new ChatVectorDBQAChain({
    vectorstore,
    combineDocumentsChain: docChain,
    questionGeneratorChain: questionGenerator,
    returnSourceDocuments: true,
    k: 2, //number of source documents to return
  });
};
