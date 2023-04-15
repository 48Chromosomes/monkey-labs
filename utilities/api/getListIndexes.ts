import { AllowedVectorStores } from '@/types';

export const getListIndexes = async ({ currentVectorStore }: { currentVectorStore: AllowedVectorStores }) => {
  const res: Response = await fetch('/api/listIndexes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentVectorStore }),
  });

  const response = await res.json();

  return response;
};
