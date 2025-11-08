import { getStore } from '@netlify/blobs';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const store = getStore('app-data');

  const body = JSON.parse(event.body || '{}');
  const { text, tier, wave } = body;

  // lê os dados existentes
  const saved = await store.get('entries.json', { type: 'json' });
  const data = Array.isArray(saved) ? saved : [];

  // adiciona nova entrada
  data.push({ text, tier, wave });

  // salva novamente
  await store.set('entries.json', JSON.stringify(data), {
    metadata: { updated: new Date().toISOString() }
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
}
