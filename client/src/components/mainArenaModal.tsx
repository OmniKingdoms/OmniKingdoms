import { ethers } from "ethers";
import playerStore, { contractStore } from "@/store/contractStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { PlayerStructOutput } from "../../../types/ethers-contracts/DIAMOND1HARDHAT";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { TbSword } from "react-icons/tb";

export default function MainArenaModal() {
  const player = playerStore((state) => state.player);
  const selectedPlayer = playerStore((state) => state.selectedPlayer);
  const diamond = contractStore((state) => state.diamond);

  const [endQuest, setEndQuest] = useState(false);
  const [arena, setArena] = useState(false);
  const [host, setHost] = useState<PlayerStructOutput | undefined>();

  async function getArena() {
    const openArena = await diamond?.getMainArena();
    console.log(openArena);
    setArena(openArena?.[0] as any);
    console.log(openArena?.[1].toNumber());
    return openArena?.[1].toNumber();
  }

  async function getHost() {
    const hostId = await getArena();
    const player = await diamond?.getPlayer(hostId as any);
    setHost(player);
  }

  useEffect(() => {
    getArena();

    if (!player?.status) {
      setEndQuest(false);
    } else if (player.status.toNumber() != 0) {
      setEndQuest(true);
    } else {
      setEndQuest(false);
    }
    if (!arena) {
      getHost();
    }
  }, [player?.status, arena]);

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
          <div className="flex flex-col w-full ">
            <button
              className="btn grid flex-grow h-12 card  rounded-box place-items-center bg-[#9696ea] btn-accent "
              onClick={handleEnterArena}
              disabled={endQuest || !arena}
            >
              Enter Arena
            </button>
            <div className="divider "></div>
          </div>
          {(endQuest || !arena) && (
            <div className="flex mt-4 justify-center items-center gap-4">
              <div className="avatar p-4 ">
                <div className="w-6 sm:w-16 rounded-full ">
                  <Image
                    alt="player"
                    src={host?.uri as any}
                    fill
                    className="rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className=" sm:text-2xl font-bold text-red-700 ">
                  {host?.name}
                </div>

                <div
                  className=" flex justify-center items-center sm:text-2xl text-red-700 tooltip"
                  data-tip="health"
                >
                  <AiOutlineHeart />
                  {host?.health.toNumber()}
                </div>
                <div
                  className=" flex justify-center items-center sm:text-2xl text-red-700  tooltip"
                  data-tip="strength"
                >
                  <TbSword />0{host?.strength.toNumber()}
                </div>
              </div>
              <button
                className="btn grid flex-grow h-12 card  rounded-box place-items-center bg-[#9696ea] btn-accent"
                onClick={handleFightArena}
                disabled={endQuest || arena}
              >
                Challenge
              </button>
            </div>
          )}
        </label>
        <ToastContainer theme="dark" />
      </label>
    </>
  );
}
