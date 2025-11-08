import { getStore } from '@netlify/blobs';

export const handler = async () => {
  try {
    const store = getStore({
      name: 'runparser',
      siteID: process.env.NETLIFY_BLOBS_SITE_ID,
      token: process.env.NETLIFY_BLOBS_TOKEN
    });

    const data = await store.get('data', { type: 'json' });

    return {
      statusCode: 200,
      body: JSON.stringify(data || [])
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
