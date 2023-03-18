"use client";

import Image from "next/image";
import Link from "next/link";
import preview from "../../../public/images/nft-preview.gif";
import { motion } from "framer-motion";

export default function PlayerCard() {
  return (
    <div className=" inset-4 absolute  w-1/3 h-1/3 mx-0">
      <div className="mask  relative z-10 max-h-fit w-full animate-float rounded-br-2xl bg-primary/20 p-2 md:p-7 backdrop-blur-2xl after:absolute after:inset-0 after:rounded-br-2xl after:bg-gradient-to-br after:from-white/60 after:via-white/10 after:to-secondary/80 after:p-px">
        <div className="flex justify-around items-center">
          <h4 className="text-white text-xl text-center">Hero #4</h4>
          <button className="z-20 btn btn-ghost normal-case text-xl bg-primary bg-gradient-to-t from-neutral-800 hover:bg-secondary text-white">
            {" "}
            Equip
          </button>
          <Link href={"/profile"} className="z-20">
            <button className="z-30 btn btn-ghost normal-case text-xl bg-primary bg-gradient-to-t from-neutral-800 hover:bg-secondary text-white">
              {" "}
              Profile
            </button>
          </Link>
        </div>
        <div className=" flex  items-center justify-between lg:gap-10 flex-row">
          <Image
            src={preview}
            width={120}
            className=" rounded-xl"
            alt="preview image"
          />
          <div className="text-white">
            <ul>
              <li>Status: X</li>
              <li>Attack: Y</li>
            </ul>
          </div>
        </div>

        <div className="mt-7 flex justify-between">
          <span className="font-mono text-base text-white opacity-75">
            HP: 3/10
          </span>
          <span className="font-mono text-base text-white">Wins: 40/50</span>
        </div>
      </div>
    </div>
  );
}
