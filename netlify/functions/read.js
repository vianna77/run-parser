import { getStore } from '@netlify/blobs';

export async function handler() {
  const store = getStore('app-data');

  // pega o blob inteiro
  const saved = await store.get('entries.json', { type: 'json' });

  const data = Array.isArray(saved) ? saved : [];

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
