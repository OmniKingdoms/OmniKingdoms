import { bufferToBase64 } from "./util";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchImg() {
  const prompt =
    "default character of handsome god adventurer, magical powers, full body shot, high poly model, front facing symmetrical, facing forward for character in a game UI for fantasy web3 metaverse game, on colorful nature landscape background, unreal engine 5, intricate details, blender 3d model, cinematic lighting, golden ratio";

  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/SOV3/avatar-fantasy-high-poly`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_AUTH_KEY}`,
          "Content-Type": "application/json",
          "x-use-cache": "false",
        },
        method: "POST",
        body: JSON.stringify({
          // inputs: `default character of beautiful goddess adventurer, magical powers, full body shot, high poly model, front facing symmetrical, facing forward for character in a game UI for fantasy web3 metaverse game, on colorful nature landscape background, unreal engine 5, intricate details, blender 3d model, cinematic lighting, golden ratio`, // for testing
          inputs: prompt,
        }),
      }
    );
    if (response.status === 200) {
      console.log(`Got a response!`);
      const buffer = await response.arrayBuffer();
      const base64 = bufferToBase64(buffer);
      return base64;
    } else if (response.status === 503) {
      const data = await response.json();
      console.log(data.estimated_time);
      const retryAfter = data.estimated_time;
      const estimatedTime = parseInt(retryAfter);
      console.log(
        `Server is unavailable. Retrying after ${estimatedTime} seconds...`
      );
      await delay(estimatedTime * 1000);
      await fetchImg();
    }
  } catch (error) {
    console.log(error);
  }
}
