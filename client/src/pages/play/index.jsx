import Image from "next/image";
import minimap from "../../../public/images/minimapv2.png";
import { useAccount, useNetwork } from "wagmi";
import playerStore, { contractStore } from "@/store/contractStore";
import { useEffect, useState } from "react";
import Mint from "@/components/mint";
import { HiLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import Link from "next/link";
import { ethers } from "ethers";
import Diamond from "@/contracts/data/diamond.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Play() {
  const store = playerStore();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const diamond = contractStore((state) => state.diamond);

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const loadContract = async () => {
      if (address) {
        const response = await diamond.getPlayers(address);
        const players = await response.map((val) => val.toNumber());
        store.setPlayers(await players);
        setPlayers(players);
      }
    };
    loadContract();
  }, [address]);
  if (!address || (chain?.id === 534353 && chain?.id === 5001)) {
    return (
      <div className="relative min-h-[85vh] min-w-full flex flex-col items-center justify-center">
        <h2 className="font-bold text-white m-4">Connect to play</h2>
        <ConnectButton />
      </div>
    );
  }

  if (players.length === 0 && chain?.id === 5001) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-fit mb-auto min-h-fit flex flex-col items-center justify-center mx-auto  h-[78vh]"
      >
        {" "}
        {/* <div>
          <span className="inline-flex h-6 w-6 animate-spin rounded-full border-4 border-dotted border-purple-800"></span>
        </div> */}
        <Mint />
      </motion.div>
    );
  }
  if (players.length === 0 && chain?.id === 534353) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-fit mb-auto min-h-fit flex flex-col items-center justify-center mx-auto  h-[78vh]"
      >
        {" "}
        {/* <div>
          <span className="inline-flex h-6 w-6 animate-spin rounded-full border-4 border-dotted border-purple-800"></span>
        </div> */}
        <Mint />
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-fit mb-auto min-h-fit flex flex-col sm:flex-row items-center justify-center mx-auto "
      >
        <Image
          src={minimap}
          alt="game map"
          width={1200}
          className="rounded-3xl shadow-inner "
        />
        <Link href={"/play/craft"}>
          <span
            className=" absolute right-[28%] top-[40%] w-[6%] hover:cursor-pointer animate-bounce tooltip"
            data-tip="craft"
          >
            <HiLocationMarker className="   w-full h-full  stroke-purple-800 stroke-1 fill-[#E6E6FA] mt-1 mx-auto" />
          </span>
        </Link>
        <Link href={"/play/train"}>
          <span
            className=" absolute right-[48%] top-[35%] w-[6%] hover:cursor-pointer animate-bounce tooltip"
            data-tip="training"
          >
            <HiLocationMarker className="   w-full h-full  stroke-purple-800 stroke-1 fill-[#E6E6FA] mt-1 mx-auto" />
          </span>
        </Link>
        <Link href={"/play/quest"}>
          <span
            className=" absolute right-[33%] top-[15%]  w-[6%]  hover:cursor-pointer animate-bounce tooltip"
            data-tip="quest"
          >
            <HiLocationMarker className="  w-full h-full stroke-purple-800 stroke-1 fill-[#E6E6FA] mt-1 mx-auto" />
          </span>
        </Link>
        <Link href={"/play/arena"}>
          <span
            className=" absolute right-[53%] top-[10%]  w-[6%]  hover:cursor-pointer animate-bounce tooltip"
            data-tip="arena"
          >
            <HiLocationMarker className="  w-full h-full stroke-purple-800 stroke-1 fill-[#E6E6FA] mt-1 mx-auto" />
          </span>
        </Link>

        {/* <div className="absolute right-[5%] inset-y-10  mx-auto grid h-fit w-fit  max-w-4xl animate-rotate place-items-center rounded-lg bg-[linear-gradient(var(--rotate),var(--tw-gradient-from)_33%,rgb(37_99_235)_66%,var(--tw-gradient-to))] from-yellow-600 via-yellow-300 to-yellow-500 p-[0.15rem] shadow-xl ring-1 before:absolute before:inset-0 before:z-0 before:h-full before:w-full before:animate-rotate before:bg-[linear-gradient(var(--rotate),var(--tw-gradient-from)_33%,rgb(37_99_235)_66%,var(--tw-gradient-to))] before:from-yellow-500 before:via-yellow-300 before:to-yellow-600 before:blur-2xl before:transition-all before:hover:scale-110 before:hover:blur-3xl sm:mx-auto">
        <div className="z-10 grid h-full w-full place-items-center rounded-lg bg-primary bg-gradient-to-t from-neutral-800 py-2 px-4 text-white">
        Gold: 10
        </div>
      </div> */}
        {/* <button className="btn  normal-case absolute top-[65%] left-[25%] overflow-hidden rounded-lg px-12 py-6 ring-red-500/50 ring-offset-black will-change-transform focus:outline-none focus:ring-1 focus:ring-offset-2">
          <span className="absolute inset-px z-10 grid place-items-center rounded-lg bg-primary bg-gradient-to-t from-neutral-800 text-white">
            Train
            </span>
            <span
            aria-hidden
            className="absolute inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
            />
            </button>
            <button className="btn  normal-case absolute top-[28%] left-[50%] overflow-hidden rounded-lg px-12 py-6 ring-red-500/50 ring-offset-black will-change-transform focus:outline-none focus:ring-1 focus:ring-offset-2">
            <span className="absolute inset-px z-10 grid place-items-center rounded-lg bg-primary bg-gradient-to-t from-neutral-800 text-white">
            Arena
            </span>
            <span
            aria-hidden
            className="absolute inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
            />
            </button>
            <button className="btn  normal-case absolute top-[35%] left-[85%] overflow-hidden rounded-lg px-12 py-6 ring-red-500/50 ring-offset-black will-change-transform focus:outline-none focus:ring-1 focus:ring-offset-2">
            <span className="absolute inset-px z-10 grid place-items-center rounded-lg bg-primary bg-gradient-to-t from-neutral-800 text-white">
            Quest
            </span>
            <span
            aria-hidden
            className="absolute inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
            />
            </button>
            <button className="btn  normal-case absolute top-[75%] left-[65%] overflow-hidden rounded-lg px-12 py-6 ring-red-500/50 ring-offset-black will-change-transform focus:outline-none focus:ring-1 focus:ring-offset-2">
            <span className="absolute inset-px z-10 grid place-items-center rounded-lg bg-primary bg-gradient-to-t from-neutral-800 text-white">
            Craft
            </span>
            <span
            aria-hidden
            className="absolute inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
            />
            </button>
          */}
      </motion.div>
    </>
  );
}
