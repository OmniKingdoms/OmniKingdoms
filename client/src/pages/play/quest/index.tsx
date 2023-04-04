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
import GoldModal from "@/components/goldModal";
import { RiCoinLine } from "react-icons/ri";

export default function Quest() {
  const store = contractStore();

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
      <Link href={"/play"}>
        <span className=" absolute left-[10%] btn top-[5%] hover:cursor-pointer font-bold text-white rounded-lg bg-gray-600 py-1 px-2">
          Back
        </span>
      </Link>

      <label
        htmlFor="my-modal-4"
        className="absolute left-[46%] top-[30%] btn mt-2 bg-[#9696ea] btn-accent gap-4"
      >
        Gold Quest
        <div className="badge gap-2 text-amber-300 ">
          +1
          <RiCoinLine className="" />
        </div>
      </label>
      <GoldModal />
    </motion.div>
  );
}
