import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const bufferToBase64 = (buffer: any) => {
    let arr = new Uint8Array(buffer);
    const base64 = btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
    return `data:image/png;base64,${base64}`;
  };
  console.log(`POST route starting...`);
  // Get input from frontend
  const reqbody = await req.json();
  console.log("input req", reqbody.promptPost);
  const input = reqbody.promptPost;

  // Send post request
  const response = await fetch(
    `https://api-inference.huggingface.co/models/SOV3/avatar-fantasy-high-poly`,
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_AUTH_KEY}`,
        "Content-Type": "application/json",
        "x-use-cache": "false",
      },
      method: "POST",
      body: JSON.stringify({
        // inputs: `default character of beautiful goddess adventurer, magical powers, full body shot, high poly model, front facing symmetrical, facing forward for character in a game UI for fantasy web3 metaverse game, on colorful nature landscape background, unreal engine 5, intricate details, blender 3d model, cinematic lighting, golden ratio`, // for testing
        inputs: input,
      }),
    }
  );

  console.log("response", response);

  // Check for different statuses to send proper payload
  if (response.ok) {
    console.log(`Got a response!`);
    const buffer = await response.arrayBuffer();
    console.log(buffer);
    const base64 = bufferToBase64(buffer);
    res.status(200).json({ image: base64 });
  } else if (response.status === 503) {
    console.log(`failed :(`);
    const json = await response.json();
    res.status(503).json(json);
  } else {
    res.status(response.status).json({ error: response.statusText });
  }
}
