// write.js
import { getStore } from '@netlify/blobs';

export const handler = async (event) => {
  try {
    // Replace 'YOUR_NETLIFY_SITE_ID' with your actual Netlify Site ID
    if (!process.env.NETLIFY_BLOBS_TOKEN) {
      throw new Error('NETLIFY_BLOBS_TOKEN is not set');
    }

    const store = getStore({
      name: 'runparser',
      siteID: 'b8a540f1-dba6-466b-af1f-c81f5e986b8b',
      token: process.env.NETLIFY_BLOBS_TOKEN
    });

    // PUT → sobrescreve tudo (usado pelo botão Deletar)
    if (event.httpMethod === "PUT") {
      const body = JSON.parse(event.body);
      await store.setJSON('data', body.full);
      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true })
      };
    }

    // POST → adiciona um item novo
    const body = JSON.parse(event.body);
    const currentData = (await store.get('data', { type: 'json' })) || [];

    // Append new entry
    currentData.push(body);

    // Save back to store
    await store.setJSON('data', currentData);

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
};
