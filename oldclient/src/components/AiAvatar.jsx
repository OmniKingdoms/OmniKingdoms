import { useState, useEffect } from "react";
import { Button, Box, Typography, Modal, Form } from "@mui/material";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { Buffer } from "buffer";

const ipfsClient = require("ipfs-http-client");

const projectId = "2ErURtKagCMdhuyXpeKH3HhuRhb"; // <---------- your Infura Project ID

const projectSecret = "0270ba21357357b3a2ea8a02302cd117"; // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = ipfsClient.create({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const AiAvatar = (props) => {
  const maxRetries = 20;

  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [finalPrompt, setFinalPrompt] = useState("");
  const [retry, setRetry] = useState(0);
  const [retryCount, setRetryCount] = useState(maxRetries);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const uploadToIPFS = async (event) => {
    // event.preventDefault()
    // const file = event.target.files[0]
    const file = event;
    //console.log(file.src)
    if (typeof file !== "undefined") {
      try {
        console.log("hit the try, so there is a file");
        const result = await client.add(file);
        console.log(result);
        setImage(`https://infura-ipfs.io/ipfs/${result.path}`);
        //console.log(`https://infura-ipfs.io/ipfs/${result.path}`)
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };

  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

<<<<<<< HEAD
    const uploadToIPFS = async (event) => {
        // event.preventDefault()
        // const file = event.target.files[0]
        const file = event;
        //console.log(file.src)
        if (typeof file !== 'undefined') {
            try {
                console.log('hit the try, so there is a file')
                const result = await client.add(file)
                console.log(result)
                setImage(`https://infura-ipfs.io/ipfs/${result.path}`);
                console.log(`https://infura-ipfs.io/ipfs/${result.path}`)
            } catch (error){
                console.log("ipfs image upload error: ", error)
            }
=======
  const generateImage = async () => {
    // Add this check to make sure there is no double click
    if (isGenerating && retry === 0) return;

    // Set loading has started
    console.log("generating...");
    setIsGenerating(true);

    // If this is a retry request, take away retryCount
    if (retry > 0) {
      setRetryCount((prevState) => {
        if (prevState === 0) {
          return 0;
        } else {
          return prevState - 1;
>>>>>>> 31a734eef6a7298df7a5623ddabc801a7dcd9461
        }
      });
      setRetry(0);
    }

    let promptPost;

    if (Math.random() < 0.5)
      promptPost =
        "default character of beautiful goddess adventurer, magical powers, full body shot, high poly model, front facing symmetrical, facing forward for character in a game UI for fantasy web3 metaverse game, on colorful nature landscape background, unreal engine 5, intricate details, blender 3d model, cinematic lighting, golden ratio";
    else
      promptPost =
        "default character of handsome god adventurer, magical powers, full body shot, high poly model, front facing symmetrical, facing forward for character in a game UI for fantasy web3 metaverse game, on colorful nature landscape background, unreal engine 5, intricate details, blender 3d model, cinematic lighting, golden ratio";

    // fetch request
    const response = await fetch("http://localhost:8080/avatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ promptPost }),
    });

    const data = await response.json();

    if (response.status === 503) {
      console.log("Model is still loading...");
      setRetry(data.estimated_time);
      return;
    }

    if (!response.ok) {
      console.log(`Error: ${data.error}`);
      setIsGenerating(false);
      return;
    }

    setFinalPrompt(input);
    setInput("");

    // Set image data into state property
    props.setImg(data.image);
    createFile(data.image);

    setIsGenerating(false);
  };

  async function createFile(pic) {
    console.log(pic);
    let response = await fetch(pic);
    let data = await response.blob();
    let metadata = {
      type: "image/jpeg",
    };
    let file = new File([data], "test.jpg", metadata);
    uploadToIPFS(file);
  }

  const mint = async () => {
    await props.diamond.mint(name, image, true);
  };

  const inputHandler = async (e) => {
    e.preventDefault();
    const val = e.target.value;
    setName(val);
  };

  useEffect(() => {
    const runRetry = async () => {
      if (retryCount === 0) {
        console.log(
          `Model still loading after ${maxRetries} retries. Try request again in 5 minutes.`
        );
        setRetryCount(maxRetries);
        return;
      }

      console.log(`Trying again in ${retry} seconds.`);

      await sleep(retry * 1000);

      await generateImage();
    };

    if (retry === 0) {
      return;
    }

<<<<<<< HEAD
    async function createFile(pic){
        let response = await fetch(pic);
        let data = await response.blob();
        let metadata = {
          type: 'image/jpeg'
        };
        let file = new File([data], "test.jpg", metadata);
        uploadToIPFS(file)
    }
=======
    runRetry();
  }, [retry]);
>>>>>>> 31a734eef6a7298df7a5623ddabc801a7dcd9461

  return (
    <>
      <div className="container">
        <h1>Avatar Generatooor</h1>
        <div>
          <div className="dream-container">
            <div className="dream-buttons">
              <div
                className={
                  isGenerating ? "generate-button loading" : "generate-button"
                }
                onClick={generateImage}
              >
                <div className="generate">
                  {isGenerating ? (
                    <div className="loader-container">
                      <div className="loader"></div>
                    </div>
                  ) : (
                    <>
                      <button>Randomize</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="image-container">
          {props.img && (
            <div className="output-content">
              <img src={props.img} width="500" height="500" alt={input} />
              <p>{finalPrompt}</p>
            </div>
          )}
        </div>
        <input type="text" onInput={inputHandler} value={name} />
        <Button onClick={mint}>Mint</Button>
        {props.img && <div>{props.img}</div>}
        {name && <div>{name}</div>}
      </div>
    </>
  );
};

export default AiAvatar;
