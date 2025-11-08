import { getStore } from '@netlify/blobs';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const store = getStore('app-data');

  const body = JSON.parse(event.body || '{}');
  const { text, tier, wave } = body;

  // always ensure an array
  let saved = await store.get('entries.json', { type: 'json' });
  if (!Array.isArray(saved)) {
    saved = [];
  }

  saved.push({ text, tier, wave });

  await store.set('entries.json', JSON.stringify(saved));

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
}
