import { ethers } from "ethers";
import playerStore, { contractStore } from "@/store/contractStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

export default function MainArenaModal() {
  const player = playerStore((state) => state.player);
  const selectedPlayer = playerStore((state) => state.selectedPlayer);
  const diamond = contractStore((state) => state.diamond);

  const [endQuest, setEndQuest] = useState(false);
  const [arena, setArena] = useState(false);

  async function getArena() {
    const openArena = await diamond?.getMainArena();
    setArena(openArena?.[0] as any);
  }

  useEffect(() => {
    getArena();

    if (!player.status) {
      setEndQuest(false);
    } else if (player.status.toNumber() != 0) {
      console.log(player.name);
      console.log(player.status.toNumber());
      setEndQuest(true);
    } else {
      setEndQuest(false);
    }

    console.log(arena);
    console.log(endQuest);
  }, [player.status, arena]);

  async function handleEnterArena() {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    try {
      const quest = await diamond?.enterMainArena(selectedPlayer);
      toast.promise(provider.waitForTransaction(quest?.hash as any), {
        pending: "Tx pending: " + quest?.hash,
        success: {
          render() {
            setEndQuest(true);
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
  async function handleFightArena() {
    console.log(player.status.toNumber());

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // Get signer

    try {
      const quest = await diamond?.fightMainArena(selectedPlayer);
      toast.promise(provider.waitForTransaction(quest?.hash as any), {
        pending: "Tx pending: " + quest?.hash,
        success: {
          render() {
            setEndQuest(false);
            setArena(true);

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
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold text-center mb-2 text-purple-900">
            Fight for gold in the Arena!
          </h3>
          <div className="flex flex-col w-full lg:flex-row">
            <button
              className="btn grid flex-grow h-12 card  rounded-box place-items-center bg-[#9696ea] btn-accent "
              onClick={handleEnterArena}
              disabled={endQuest || !arena}
            >
              Enter Arena
            </button>
            <div className="divider lg:divider-horizontal"></div>

            <button
              className="btn grid flex-grow h-12 card  rounded-box place-items-center bg-[#9696ea] btn-accent"
              onClick={handleFightArena}
              disabled={endQuest || arena}
            >
              Challenge
            </button>
          </div>
        </label>
        <ToastContainer theme="dark" />
      </label>
    </>
  );
}
