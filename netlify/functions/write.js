import { getStore } from "@netlify/blobs";

export const handler = async (event) => {
  try {
    const entry = JSON.parse(event.body);

    const store = getStore("runparser");

    // Load current JSON
    const data = await store.get("data.json", { type: "json" }) || [];

    // Add new entry
    data.push(entry);

    // Save new JSON atomically
    await store.setJSON("data.json", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
