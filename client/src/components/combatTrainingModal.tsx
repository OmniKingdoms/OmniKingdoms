import { ethers } from "ethers";
import contractStore from "@/store/contractStore";
import Diamond from "@/contracts/data/diamond.json";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

export default function CombatTrainingModal() {
  const store = contractStore();
  const [endTrain, setEndTrain] = useState(false);

  useEffect(() => {
    if (!store.player.status) {
      setEndTrain(false);
    } else {
      console.log(store.player.status.toNumber());
      if (store.player.status.toNumber() === 1) {
        setEndTrain(true);
      }
    }
  }, [store.player.status]);

  async function handleStartCombatTrain() {
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
      const train = await contract.startTrainingCombat(store.selectedPlayer);
      console.log(await contract.playerCount());
      toast.promise(provider.waitForTransaction(train.hash), {
        pending: "Tx pending: " + train.hash,
        success: {
          render() {
            setEndTrain(true);

            return "Success: " + train.hash;
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
  async function handleEndCombatTrain() {
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
      const train = await contract.endTrainingCombat(store.selectedPlayer);

      toast.promise(provider.waitForTransaction(train.hash), {
        pending: "Tx pending: " + train.hash,
        success: {
          render() {
            setEndTrain(false);

            return "Success: " + train.hash;
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
            Training to earn strengh
          </h3>
          <div className="flex flex-col w-full lg:flex-row">
            <button
              className="btn grid flex-grow h-12 card  rounded-box place-items-center bg-[#9696ea] btn-accent "
              onClick={handleStartCombatTrain}
              disabled={endTrain}
            >
              Begin Training
            </button>
            <div className="divider lg:divider-horizontal"></div>
            <button
              className="btn grid flex-grow h-12 card  rounded-box place-items-center bg-[#9696ea] btn-accent"
              onClick={handleEndCombatTrain}
              disabled={!endTrain}
            >
              End Training
            </button>
          </div>
        </label>
        <ToastContainer theme="dark" />
      </label>
    </>
  );
}
