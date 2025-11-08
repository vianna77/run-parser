import { getStore } from '@netlify/blobs';

export const handler = async (event) => {
  try {
    const store = getStore({
      name: 'runparser',
      siteID: process.env.NETLIFY_BLOBS_SITE_ID,
      token: process.env.NETLIFY_BLOBS_TOKEN
    });

    const body = JSON.parse(event.body || '{}');
    const newData = body.data || [];

    await store.set('data', JSON.stringify(newData));

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
