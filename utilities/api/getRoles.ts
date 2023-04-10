export const getRoles = async () => {
  const res: Response = await fetch('/api/getRoles', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const response = await res.json();

  return response;
};
