import { blobs } from '@netlify/blobs';

export async function handler() {
  try {
    const store = blobs.getStore('app-data');

    const raw = await store.get('entries.json', { type: 'json' });

    const data = Array.isArray(raw) ? raw : [];

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
