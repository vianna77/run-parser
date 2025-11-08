const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    const filePath = path.join(__dirname, "../../data/data.json");
    const content = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(content);

    return {
      statusCode: 200,
      body: JSON.stringify(json)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(err) })
    };
  }
};
