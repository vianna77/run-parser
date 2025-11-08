import { getStore } from '@netlify/blobs';

export const handler = async () => {
  const store = getStore('runparser');
  const data = await store.get('data', { type: 'json' });

  return {
    statusCode: 200,
    body: JSON.stringify(data || [])
  };
};
