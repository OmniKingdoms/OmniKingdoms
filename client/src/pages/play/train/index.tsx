import { motion } from "framer-motion";
import trainmap from "../../../../public/images/train.png";
import contractStore from "@/store/contractStore";
import { useAccount, useTransaction } from "wagmi";
import Diamond from "@/contracts/data/diamond.json";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PlayerCard from "@/components/playerCard";
import { ethers } from "ethers";
import Toast from "@/components/toast";
import Countdown from "react-countdown";
import { useRouter } from "next/router";

export default function Train() {
  const router = useRouter();

  const store = contractStore();
  const { address } = useAccount();
  const [quest, setQuest] = useState("");
  const [hash, setHash] = useState("");
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    async function getQuest() {
      console.log(store.status);
      if (store.status === 0) {
        setQuest("start");
      } else {
        setQuest("end");
      }
    }
    getQuest();
  }, []);
  async function handleCombatTrain() {
    console.log(store.status);

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // Get signer
    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      process.env.NEXT_PUBLIC_DIAMOND_ADDRESS as string,
      Diamond.abi,
      signer
    );
    if (store.status === 0) {
      const quest = await contract.startTrainingCombat(store.selectedPlayer);
      console.log(quest);

      setHash(quest.hash);
      setTimeout(() => {
        setQuest("end");
        setTimer(true);
        store.setStatus(1);
      }, 10000);
    } else {
      const quest = await contract.endTrainingCombat(store.selectedPlayer);
      await provider.getTransaction(quest.hash);
      setHash(quest.hash);
      setTimeout(() => {
        setQuest("start");
        setTimer(true);
        store.setStatus(0);
      }, 10000);
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
        src={trainmap}
        alt="game map"
        height={800}
        className="rounded-3xl shadow-inner  mix-blend-	"
      />
      <PlayerCard />
      {hash && <Toast hash={hash} />}
      <Link href={"/play"}>
        <span className=" absolute left-[10%] btn top-[5%] hover:cursor-pointer font-bold text-white rounded-lg bg-gray-600 py-1 px-2">
          Back
        </span>
      </Link>

      <button
        disabled={timer}
        className="absolute left-[46%] top-[30%] btn bg-gray-600 disabled:text-zinc-100 disabled:bg-opacity-90 disabled:text-opacity-100"
        onClick={() => {
          handleCombatTrain();
        }}
      >
        {timer ? (
          <Countdown
            date={Date.now() + 1000 * 60 * 2} // 1sec * seconds
            onComplete={() => router.reload()}
            renderer={(props) => (
              <>
                {props.minutes}:{props.seconds}
              </>
            )}
          />
        ) : (
          <>{quest} Combat Training</>
        )}
      </button>
    </motion.div>
  );
}
