import { motion } from "framer-motion";
import arenamap from "../../../../public/images/arena.png";
import contractStore from "@/store/contractStore";
import Image from "next/image";
import Link from "next/link";
import { RiCoinLine } from "react-icons/ri";
import { BiHide } from "react-icons/bi";

import MainArenaModal from "@/components/mainArenaModal";
import SecondArenaModal from "@/components/secondArenaModal";

export default function Arena() {
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
        src={arenamap}
        alt="game map"
        height={800}
        className="rounded-3xl shadow-inner  mix-blend-	"
      />
      <Link href={"/play"}>
        <span className=" absolute left-[10%] btn top-[5%] hover:cursor-pointer font-bold text-white rounded-lg bg-gray-600 py-1 px-2">
          Back
        </span>
      </Link>

      <label
        htmlFor="main-arena"
        className="absolute left-[46%] top-[30%] btn mt-2 bg-[#9696ea] btn-accent gap-4"
      >
        Main Arena
        <div className="badge gap-2 text-red-500 ">
          -1
          <RiCoinLine className="" />
        </div>
      </label>
      <label
        htmlFor="second-arena"
        className="absolute left-[46%] top-[40%] btn mt-2 bg-[#9696ea] btn-accent gap-2"
      >
        <BiHide className="text-xl " />
        Side Arena
        <div className="badge gap-2 text-red-500 ">
          -1
          <RiCoinLine className="" />
        </div>
      </label>
      <MainArenaModal />
      <SecondArenaModal />
    </motion.div>
  );
}
