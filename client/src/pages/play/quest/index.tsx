import { motion } from "framer-motion";
import questmap from "../../../../public/images/quest.png";
import contractStore from "@/store/contractStore";
import Diamond from "@/contracts/data/diamond.json";
import Image from "next/image";
import Link from "next/link";
import PlayerCard from "@/components/playerCard";
import { ethers } from "ethers";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Quest() {
  const store = contractStore();

  useEffect(() => {}, [store.player]);
  console.log(store.player);

  async function handleGold() {
    console.log(store.player.status.toNumber());

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // Get signer
    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      process.env.NEXT_PUBLIC_DIAMOND_ADDRESS as string,
      Diamond.abi,
      signer
    );
    if (store.player.status.toNumber() === 0) {
      try {
        const quest = await contract.startQuestGold(store.selectedPlayer);
        toast.promise(provider.waitForTransaction(quest.hash), {
          pending: "Tx pending: " + quest.hash,
          success: "Success: " + quest.hash,
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
    } else {
      try {
        const quest = await contract.endQuestGold(store.selectedPlayer);
        await provider.getTransaction(quest.hash);
        toast.promise(provider.waitForTransaction(quest.hash), {
          pending: "Tx pending: " + quest.hash,
          success: "Success: " + quest.hash,
          error: "Tx failed",
        });
      } catch (error: any) {
        toast.error(error.reason, {
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

  if (store.players.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-fit mb-auto min-h-fit flex flex-col sm:flex-row items-center justify-center mx-auto  h-[78vh]"
      >
        {" "}
        <div>
          <Link href={"/play"}>
            <span className="  hover:cursor-pointer font-bold text-2xl text-white rounded-lg bg-gray-600 py-1 px-2">
              Back to map
            </span>
          </Link>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-fit mb-auto min-h-fit flex flex-col sm:flex-row items-center justify-center mx-auto "
    >
      <Image
        src={questmap}
        alt="game map"
        height={800}
        className="rounded-3xl shadow-inner  mix-blend-	"
      />
      <PlayerCard />
      <ToastContainer theme="dark" />
      <Link href={"/play"}>
        <span className=" absolute left-[10%] btn top-[5%] hover:cursor-pointer font-bold text-white rounded-lg bg-gray-600 py-1 px-2">
          Back
        </span>
      </Link>

      <button
        className="absolute left-[46%] top-[30%] btn bg-gray-600 disabled:text-zinc-100 disabled:bg-opacity-90 disabled:text-opacity-100"
        onClick={() => {
          handleGold();
        }}
      >
        <>Gold Quest</>
      </button>
    </motion.div>
  );
}
