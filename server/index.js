require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/starter";

const bufferToBase64 = (buffer) => {
  let arr = new Uint8Array(buffer);
  const base64 = btoa(
    arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
  );
  return `data:image/png;base64,${base64}`;
};

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

// POST route for calling HuggingFace API to generate image
// Test call with terminal: `curl --location --request POST 'http://localhost:8080/avatar'`
app.post("/avatar", async (req, res) => {
  console.log(`POST route starting...`);
  // Get input from frontend
  console.log("input req", req.body);
  const input = req.body.promptPost;

    console.log(`POST route starting...`);
    // Get input from frontend
    console.log('input req', req.body);
    const input = req.body.promptPost;

    // Send post request
    const response = await fetch(
        `https://api-inference.huggingface.co/models/SOV3/avatar-fantasy-high-poly`, 
        {
            headers: {
                //Authorization: `Bearer ${process.env.HF_AUTH_KEY}`,
                Authorization: `Bearer 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`,
                'Content-Type': 'application/json',
                'x-use-cache': 'false'
            },
            method: 'POST',
            body: JSON.stringify({
                // inputs: `default character of beautiful goddess adventurer, magical powers, full body shot, high poly model, front facing symmetrical, facing forward for character in a game UI for fantasy web3 metaverse game, on colorful nature landscape background, unreal engine 5, intricate details, blender 3d model, cinematic lighting, golden ratio`, // for testing
                inputs: input,
            }),
        }
    )

    // Check for different statuses to send proper payload
    if (response.ok) {
        console.log(`Got a response!`);
        const buffer = await response.arrayBuffer();
        const base64 = bufferToBase64(buffer);
        res.status(200).json({ image: base64 });
    } else if (response.status === 503) {
        console.log(`failed :(`);
        const json = await response.json();
        res.status(503).json(json);
    } else {
        res.status(response.status).json({ error: response.statusText });
    }
  );
  console.log(response);

  // Check for different statuses to send proper payload
  if (response.ok) {
    console.log(`Got a response!`);
    const buffer = await response.arrayBuffer();
    const base64 = bufferToBase64(buffer);
    res.status(200).json({ image: base64 });
  } else if (response.status === 503) {
    console.log(`failed :(`);
    const json = await response.json();
    res.status(503).json(json);
  } else {
    res.status(response.status).json({ error: response.statusText });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
