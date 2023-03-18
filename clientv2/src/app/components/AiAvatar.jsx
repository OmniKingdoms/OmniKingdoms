"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const AiAvatar = (props) => {
  const maxRetries = 20;

  const [input, setInput] = useState("");
  const [img, setImg] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [finalPrompt, setFinalPrompt] = useState("");
  const [retry, setRetry] = useState(0);
  const [retryCount, setRetryCount] = useState(maxRetries);

  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

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
    console.log(promptPost);
    // fetch request
    const response = await axios.post("api/avatar", {
      promptPost: promptPost,
    });
    // const response = await fetch("api/avatar", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ promptPost }),
    // });

    console.log(response);
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
    console.log(data.image);
    setImg(data.image);

    setIsGenerating(false);
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

    runRetry();
  }, [retry]);

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
          {img && (
            <div className="output-content">
              <img src={img} width="500" height="500" alt={input} />
              <p>{finalPrompt}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AiAvatar;
