import { motion } from "framer-motion";
import trainmap from "../../../../public/images/train.png";
import contractStore from "@/store/contractStore";
import Image from "next/image";
import Link from "next/link";
import { TbSword } from "react-icons/tb";
import CombatTrainingModal from "@/components/combatTrainingModal";
import { GiPotionBall } from "react-icons/gi";
import ManaTrainingModal from "@/components/manaTrainingModal";

export default function Train() {
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
        src={trainmap}
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
        htmlFor="combat-train"
        className="absolute left-[46%] top-[30%] btn mt-2 bg-[#9696ea] btn-accent gap-4"
      >
        Combat Training
        <div className="badge gap-2 text-amber-300 ">
          +1
          <TbSword />
        </div>
      </label>
      <label
        htmlFor="mana-train"
        className="absolute left-[46%] top-[40%] btn mt-2 bg-[#9696ea] btn-accent gap-4"
      >
        Mana Training
        <div className="badge gap-2 text-amber-300 ">
          +1
          <GiPotionBall />
        </div>
      </label>
      <CombatTrainingModal />
      <ManaTrainingModal />
    </motion.div>
  );
}
