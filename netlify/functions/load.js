import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function handler() {
  try {
    const filePath = path.join(__dirname, "../../data/data.json");

    const content = await readFile(filePath, "utf8");

    return {
      statusCode: 200,
      body: content
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
