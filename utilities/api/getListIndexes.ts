import { AllowedVectorStores } from '@/types';
import { url } from '@/utilities/server';

export const getListIndexes = async ({ currentVectorStore }: { currentVectorStore: AllowedVectorStores }) => {
  const res: Response = await fetch(`${url}/list-indexes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentVectorStore }),
  });

  const response = await res.json();

  return response;
};
