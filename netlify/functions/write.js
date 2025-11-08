const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    const filePath = path.join(__dirname, "../../data/data.json");
    const body = JSON.parse(event.body);

    const content = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(content);

    json.push({
      text: body.text,
      tier: body.tier,
      wave: body.wave
    });

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(err) })
    };
  }
};
