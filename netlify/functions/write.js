import { getStore } from '@netlify/blobs';

export const handler = async (event) => {
  try {
    const store = getStore('runparser');

    const body = JSON.parse(event.body || '{}');
    const current = (await store.get('data', { type: 'json' })) || [];

    current.push(body);

    await store.set('data', JSON.stringify(current));

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
