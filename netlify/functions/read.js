import { getStore } from "@netlify/blobs";

export const handler = async () => {
  try {
    const store = getStore("runparser");

    // Read JSON. If empty, return an array.
    const data = await store.get("data.json", { type: "json" });

    return {
      statusCode: 200,
      body: JSON.stringify(Array.isArray(data) ? data : [])
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
