const baseFetch = async (URL: string = '', options?: RequestInit) => {
  const response = await fetch(URL, { headers: { 'Content-Type': 'application/json' }, ...options });

  if (response.status === 204) return;

  return await response.json();
};

export default baseFetch;
