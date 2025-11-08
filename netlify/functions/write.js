import { blobs } from '@netlify/blobs';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const store = blobs.getStore('app-data');

  const body = JSON.parse(event.body || '{}');

  const raw = await store.get('entries.json', { type: 'json' });
  const data = Array.isArray(raw) ? raw : [];

  data.push(body);

  await store.set('entries.json', JSON.stringify(data));

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
}
