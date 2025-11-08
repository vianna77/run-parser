import { blobs } from '@netlify/blobs';

export async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method not allowed' };
    }

    const store = blobs.getStore('app-data');

    const body = JSON.parse(event.body || '{}');
    const { text, tier, wave } = body;

    const raw = await store.get('entries.json', { type: 'json' });
    const data = Array.isArray(raw) ? raw : [];

    data.push({ text, tier, wave });

    await store.set('entries.json', JSON.stringify(data));

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
