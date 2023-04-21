import { ethers } from "ethers";
import playerStore, { contractStore } from "@/store/contractStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

export default function GemModal() {
  const player = playerStore((state) => state.player);
  const selectedPlayer = playerStore((state) => state.selectedPlayer);
  const diamond = contractStore((state) => state.diamond);

  const [endQuest, setEndQuest] = useState(false);
  const [timer, setTimer] = useState(false);
  const [beginTimer, setBeginTimer] = useState(false);
  const [countdown, setCountdown] = useState(0);

  async function questTimer() {
    const blockTimestamp = (await diamond?.getGemStart(selectedPlayer)) as any;
    const startTime = blockTimestamp.toNumber() as any;
    const curTime = (Date.now() / 1000).toFixed(0) as any;
    const time = curTime - startTime;
    if (time < 80) {
      setCountdown(80 - time);
      setTimer(true);
    }
  }
  async function CooldownTimer() {
    const blockTimestamp = (await diamond?.getCooldown(selectedPlayer)) as any;
    const startTime = blockTimestamp.toNumber() as any;
    const curTime = (Date.now() / 1000).toFixed(0) as any;
    const time = curTime - startTime;
    if (time < 80) {
      setCountdown(80 - time);
      setBeginTimer(true);
    }
  }
  useEffect(() => {
    CooldownTimer();
    questTimer();
    if (!player?.status) {
      setEndQuest(false);
    } else {
      if (player.status.toNumber() === 5) {
        setEndQuest(true);
      }
    }
  }, [player?.status, timer, beginTimer]);

  async function handleBeginGem() {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    try {
      const quest = await diamond?.startQuestGem(selectedPlayer);
      toast.promise(provider.waitForTransaction(quest?.hash as any), {
        pending: "Tx pending: " + quest?.hash,
        success: {
          render() {
            setEndQuest(true);
            setTimer(true);
            return "Success: " + quest?.hash;
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
  async function handleEndGem() {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // Get signer

    try {
      const quest = await diamond?.endQuestGem(selectedPlayer);
      toast.promise(provider.waitForTransaction(quest?.hash as any), {
        pending: "Tx pending: " + quest?.hash,
        success: {
          render() {
            setEndQuest(false);
            setBeginTimer(true);

            return "Success: " + quest?.hash;
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
      <input type="checkbox" id="gem-quest" className="modal-toggle" />
      <label htmlFor="gem-quest" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold text-center mb-2 text-purple-900">
            Quest to earn Gem!
          </h3>
          <div className="flex flex-col w-full lg:flex-row">
            <button
              className="btn grid flex-grow h-12 card  rounded-box place-items-center bg-[#9696ea] btn-accent "
              onClick={handleBeginGem}
              disabled={beginTimer || endQuest}
            >
              {beginTimer ? (
                <Countdown
                  date={Date.now() + 1000 * countdown} // 1sec * seconds
                  onComplete={() => {
                    setBeginTimer(false);
                  }}
                  renderer={(props) => (
                    <>
                      0{props.minutes}:{props.seconds}
                    </>
                  )}
                />
              ) : (
                "Begin Quest"
              )}
            </button>
            <div className="divider lg:divider-horizontal"></div>

            <button
              className="btn grid flex-grow h-12 card  rounded-box place-items-center bg-[#9696ea] btn-accent"
              onClick={handleEndGem}
              disabled={timer || !endQuest}
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
                "End Quest"
              )}
            </button>
          </div>
        </label>
        <ToastContainer theme="dark" />
      </label>
    </>
  );
}
