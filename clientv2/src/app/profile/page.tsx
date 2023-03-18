import PlayerCard from "../components/playerCard";
import AiAvatar from "../components/AiAvatar";
import axios from "axios";
import Image from "next/image";

const bufferToBase64 = (buffer: any) => {
  let arr = new Uint8Array(buffer);
  const base64 = btoa(
    arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
  );
  return `data:image/png;base64,${base64}`;
};

const fetchPost = async (prompt: string) => {
  console.log(`POST route starting...`);
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
        inputs: prompt,
      }),
    }
  );
  return response;
};

export default async function Profile() {
  const promptPost =
    "default character of beautiful goddess adventurer, magical powers, full body shot, high poly model, front facing symmetrical, facing forward for character in a game UI for fantasy web3 metaverse game, on colorful nature landscape background, unreal engine 5, intricate details, blender 3d model, cinematic lighting, golden ratio";
  const response = await fetchPost(promptPost);

  console.log(response);
  // const response = await axios.post("api/avatar", {
  //   promptPost: promptPost,
  // });
  // const response = await fetch("api/avatar", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ promptPost }),
  // });

  return (
    <>
      <Image
        src={
          "https://bafybeihfvy2hmcnvpax6anx3tgx53qie4nj32eqtuehsu2g5c5hx3ukxc4.ipfs.nftstorage.link/240.png"
        }
        alt="player"
        fill
      />
    </>
  );
}
