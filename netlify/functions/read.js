import { getStore } from '@netlify/blobs';

export async function handler() {
  const store = getStore('app-data');

  let saved = await store.get('entries.json', { type: 'json' });

  // If nothing saved yet, force empty array
  if (!Array.isArray(saved)) {
    saved = [];
  }

  return {
    statusCode: 200,
    body: JSON.stringify(saved)
  };
}
