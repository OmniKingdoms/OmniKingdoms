import { ethers } from "ethers";
import playerStore, { contractStore } from "@/store/contractStore";
import Countdown from "react-countdown";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

export default function ManaTrainingModal() {
  const player = playerStore((state) => state.player);
  const selectedPlayer = playerStore((state) => state.selectedPlayer);
  const diamond = contractStore((state) => state.diamond);

  const [endTrain, setEndTrain] = useState(false);
  const [timer, setTimer] = useState(false);
  const [countdown, setCountdown] = useState(0);

  async function manaTimer() {
    const blockTimestamp = (await diamond?.getManaStart(selectedPlayer)) as any;
    const startTime = blockTimestamp.toNumber() as any;
    console.log(startTime);
    const curTime = (Date.now() / 1000).toFixed(0) as any;
    const time = curTime - startTime;
    if (time < 315) {
      setCountdown(315 - time); // 5min
      setTimer(true);
    }
  }

  useEffect(() => {
    manaTimer();
    if (!player?.status) {
      setEndTrain(false);
    } else {
      if (player.status.toNumber() === 3) {
        setEndTrain(true);
      }
    }
  }, [player?.status, timer]);

  async function handleStartManaTrain() {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);

    try {
      const train = await diamond?.startTrainingMana(selectedPlayer);
      toast.promise(provider.waitForTransaction(train?.hash as any), {
        pending: "Tx pending: " + train?.hash,
        success: {
          render() {
            setEndTrain(true);
            setTimer(true);
            return "Success: " + train?.hash;
          },
        },
        error: "Tx failed",
      });
    } catch (error: any) {
      if (error.data) {
        toast.error(error.data.message as string, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error(error.reason as string, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  }
  async function handleEndManaTrain() {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);

    try {
      const train = await diamond?.endTrainingMana(selectedPlayer);

      toast.promise(provider.waitForTransaction(train?.hash as any), {
        pending: "Tx pending: " + train?.hash,
        success: {
          render() {
            setEndTrain(false);

            return "Success: " + train?.hash;
          },
        },
        error: "Tx failed",
      });
    } catch (error: any) {
      if (error.data) {
        toast.error(error.data.message as string, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error(error.reason as string, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  }

  return (
    <>
      <input type="checkbox" id="mana-train" className="modal-toggle" />
      <label htmlFor="mana-train" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold text-center mb-2 text-purple-900">
            Training to earn mana
          </h3>
          <div className="flex flex-col w-full lg:flex-row">
            <button
              className="btn grid flex-grow h-12 card  rounded-box place-items-center bg-[#9696ea] btn-accent "
              onClick={handleStartManaTrain}
              disabled={endTrain}
            >
              Begin Training
            </button>
            <div className="divider lg:divider-horizontal"></div>
            <button
              className="btn grid flex-grow h-12 card  rounded-box place-items-center bg-[#9696ea] btn-accent"
              onClick={handleEndManaTrain}
              disabled={timer || !endTrain}
            >
              {timer ? (
                <Countdown
                  date={Date.now() + 1000 * countdown} // 1sec * seconds
                  onComplete={() => {
                    setTimer(false);
                  }}
                  renderer={(props) => (
                    <>
                      0{props.minutes}:{props.seconds}
                    </>
                  )}
                />
              ) : (
                "End Training"
              )}
            </button>
          </div>
        </label>
        <ToastContainer theme="dark" />
      </label>
    </>
  );
}
