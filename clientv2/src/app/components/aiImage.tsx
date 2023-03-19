"use client";
import { create } from "ipfs-http-client";
import { fetchImg } from "@/Utils/image";

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

export default function AiImage() {
  async function createFile() {
    const img = await fetchImg();
    let response = await fetch(img);
    let data = await response.blob();
    let metadata = {
      type: "image/jpeg",
    };
    let file = new File([data], "test.jpg", metadata);
    uploadToIPFS(file);
  }
  async function uploadToIPFS(file: any) {
    if (typeof file !== "undefined") {
      try {
        console.log("hit the try, so there is a file");
        const result = await client.add(file);
        console.log(result);
        console.log(`https://infura-ipfs.io/ipfs/${result.path}`);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  }
  return (
    <button
      onClick={() => {
        createFile();
      }}
    >
      {" "}
      upload
    </button>
  );
}
