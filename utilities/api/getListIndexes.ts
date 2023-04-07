export const getListIndexes = async () => {
  const res: Response = await fetch('/api/listIndexes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const response = await res.json();

  return response;
};
