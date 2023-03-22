import { motion } from "framer-motion";
import quest from "../../../public/images/quest2.png";

import Image from "next/image";
import Link from "next/link";

export default function Quest() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-fit mb-auto min-h-fit flex flex-col sm:flex-row items-center justify-center mx-auto "
    >
      <Image
        src={quest}
        alt="game map"
        height={800}
        className="rounded-3xl shadow-inner  mix-blend-	"
      />

      <Link href={"/play"}>
        <span className=" absolute left-[10%] top-[10%] hover:cursor-pointer font-bold text-2xl text-white rounded-lg bg-gray-600 py-1 px-2">
          Back
        </span>
      </Link>
    </motion.div>
  );
}
