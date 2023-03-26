import { NextApiRequest, NextApiResponse } from "next";
import { bufferToBase64 } from "../../Utils/util";
import { uploadToIPFS } from "../../Utils/image";
import { create } from "ipfs-http-client";

const client = create({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization:
      "Basic " +
      Buffer.from(
        process.env.NEXT_PUBLIC_INFURA_ID +
          ":" +
          process.env.NEXT_PUBLIC_INFURA_SECRET
      ).toString("base64"),
  },
});
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let countSuccess = 0;
  const fetchImg = async () => {
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
        console.log(`Got a response!`, countSuccess);
        if (countSuccess === 0) {
          countSuccess = countSuccess + 1;
          await fetchImg();
        } else {
          countSuccess = countSuccess + 1;
          console.log(response);
          const buffer = await response.arrayBuffer();
          const base64 = bufferToBase64(buffer);
          console.log(base64);
          const img = await fetch(base64);
          console.log(img);
          const data = await img.blob();
          console.log(data);
          const metadata = {
            type: "image/jpeg",
          };

          res.status(500).json({ img: base64, metadata: metadata });
        }
      } else if (response.status === 503) {
        const data = await response.json();
        const retryAfter = data.estimated_time;
        const estimatedTime = parseInt(retryAfter);
        console.log(
          `Server is unavailable. Retrying after ${estimatedTime} seconds...`
        );
        await delay(estimatedTime * 1000);
        await fetchImg();
      }
    } catch (error) {
      res.status(504);
      console.log(error);
    }
  };
  await fetchImg();
  //   const uploadToIPFS = async (file: any) => {
  //     if (typeof file !== "undefined") {
  //       try {
  //         console.log("hit the try, so there is a file");
  //         const result = await client.add(file);
  //         console.log(result);
  //         console.log(`https://infura-ipfs.io/ipfs/${result.path}`);
  //         return `https://infura-ipfs.io/ipfs/${result.path}`;
  //       } catch (error) {
  //         console.log("ipfs image upload error: ", error);
  //       }
  //     }
  //   };
  //   const createFile = async () => {
  //     const img = await fetchImg;
  //     console.log(img);
  //     let response = await fetch(img as any);
  //     let data = await response.blob();
  //     let metadata = {
  //       type: "image/jpeg",
  //     };
  //     let file = new File([data], "test.jpg", metadata);
  //     const imgPath = await uploadToIPFS(file);
  //     console.log(imgPath);
  //     return imgPath;
  //   };
}
