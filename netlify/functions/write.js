import { getStore } from '@netlify/blobs';


export const handler = async (event) => {
try {
if (!process.env.NETLIFY_BLOBS_TOKEN) {
throw new Error('NETLIFY_BLOBS_TOKEN is not set');
}


const store = getStore('runparser', { token: process.env.NETLIFY_BLOBS_TOKEN });
const body = JSON.parse(event.body);


const currentData = (await store.get('data', { type: 'json' })) || [];
currentData.push(body);


await store.setJSON('data', currentData);


return { statusCode: 200, body: JSON.stringify({ ok: true }) };
} catch (err) {
return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
}
};
