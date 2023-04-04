import { ethers } from "ethers";
import contractStore from "@/store/contractStore";
import Diamond from "@/contracts/data/diamond.json";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

export default function GoldModal() {
  const store = contractStore();
  const [endQuest, setEndQuest] = useState(false);

  useEffect(() => {
    if (!store.player.status) {
      setEndQuest(false);
    } else {
      if (store.player.status.toNumber() === 2) {
        setEndQuest(true);
      }
    }
  }, [store.player.status]);

  async function handleBeginGold() {
    console.log(store.player.status.toNumber());

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // Get signer
    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      process.env.NEXT_PUBLIC_DIAMOND_ADDRESS as string,
      Diamond.abi,
      signer
    );

    try {
      const quest = await contract.startQuestGold(store.selectedPlayer);
      toast.promise(provider.waitForTransaction(quest.hash), {
        pending: "Tx pending: " + quest.hash,
        success: {
          render() {
            setEndQuest(true);

            return "Success: " + quest.hash;
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
  async function handleEndGold() {
    console.log(store.player.status.toNumber());

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // Get signer
    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      process.env.NEXT_PUBLIC_DIAMOND_ADDRESS as string,
      Diamond.abi,
      signer
    );
    try {
      const quest = await contract.endQuestGold(store.selectedPlayer);
      toast.promise(provider.waitForTransaction(quest.hash), {
        pending: "Tx pending: " + quest.hash,
        success: {
          render() {
            setEndQuest(false);

            return "Success: " + quest.hash;
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

  useEffect(() => {}, []);
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold text-center mb-2 text-purple-900">
            Quest to earn Gold!
          </h3>
          <div className="flex flex-col w-full lg:flex-row">
            <button
              className="btn grid flex-grow h-12 card  rounded-box place-items-center bg-[#9696ea] btn-accent "
              onClick={handleBeginGold}
              disabled={endQuest}
            >
              Begin Quest
            </button>
            <div className="divider lg:divider-horizontal"></div>
            <button
              className="btn grid flex-grow h-12 card  rounded-box place-items-center bg-[#9696ea] btn-accent"
              onClick={handleEndGold}
              disabled={!endQuest}
            >
              End Quest
            </button>
          </div>
        </label>
        <ToastContainer theme="dark" />
      </label>
    </>
  );
}
