import Image from "next/image";
import Link from "next/link";
import preview from "../../public/images/nft-preview.gif";
import { motion } from "framer-motion";
import contractStore from "@/store/contractStore";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Diamond from "@/contracts/data/diamond.json";
import { ethers } from "ethers";

import { AiOutlineHeart } from "react-icons/ai";
import { TbSword, TbBrandTailwind, TbClover } from "react-icons/tb";
import { SlEnergy } from "react-icons/sl";
import { GiPotionBall } from "react-icons/gi";
import { GoLightBulb } from "react-icons/go";
import { SiGhost } from "react-icons/si";
import { TfiEye } from "react-icons/tfi";
import { RiCoinLine } from "react-icons/ri";
export default function PlayerCard() {
  const { address, isConnected, isReconnecting } = useAccount();
  const store = contractStore();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadContract = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Get signer
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_DIAMOND_ADDRESS,
        Diamond.abi,
        signer
      );
      const response = await contract.getPlayers(address);
      const players = await response.map((val) => val.toNumber());
      const player = await contract.getPlayer(players[index]);
      store.setPlayer(await player);
      const gold = await contract.getGoldBalance(address);
      store.setGold(await gold.toNumber());
    };
    loadContract();
  }, [index, address]);
  if (store.player.status) {
    return (
      <>
        <div className="stats shadow absolute -left-32 -bottom-8 bg-[#E6E6FA] hover:bg-white py-2 pr-5 gap-6 scale-[0.40] sm:absolute sm:scale-75 sm:bottom-1 sm:-left-12 lg:left-1 lg:scale-100">
          <div className="w-full flex items-center my-auto pl-1 gap-4">
            <div className="avatar p-4">
              <div className="w-16 rounded-full">
                <Image
                  alt="player"
                  src={store.player?.uri}
                  fill
                  className="rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="stat-value text-purple-900">
                {store.player?.name}
              </div>
              <div>
                <div className="stat-title">
                  {" "}
                  {store.player?.male ? "Male" : "Female"}
                </div>
                <div className="text-success font-bold text-sm">
                  {store.player.status.toNumber() === 0 ? "ready" : "not ready"}
                </div>
              </div>
              <div className="stat-desc text-purple-800 font-bold">
                level: {store.player?.level.toNumber()}
              </div>
              <progress
                className="progress w-full progress-success"
                value="50"
                max="100"
              ></progress>
            </div>
          </div>
          <div className=" my-auto">
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip tooltip-bottom"
              data-tip="strength"
            >
              <TbSword />0{store.player?.strength.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip"
              data-tip="health"
            >
              <AiOutlineHeart />
              {store.player?.health.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip"
              data-tip="magic"
            >
              <SlEnergy />0{store.player?.magic.toNumber()}
            </div>
          </div>
          <div className=" my-auto ">
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip tooltip-bottom"
              data-tip="mana"
            >
              <GiPotionBall />0{store.player?.mana.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip"
              data-tip="agility"
            >
              <TbBrandTailwind />0{store.player?.agility.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip"
              data-tip="perception"
            >
              <TbClover />0{store.player?.luck.toNumber()}
            </div>
          </div>
          <div className=" my-auto ">
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip tooltip-bottom"
              data-tip="wisdom"
            >
              <GoLightBulb />0{store.player?.wisdom.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip"
              data-tip="haki"
            >
              <SiGhost />0{store.player?.haki.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip"
              data-tip="perception"
            >
              <TfiEye />0{store.player?.perception.toNumber()}
            </div>
          </div>
          <div className=" my-auto ">
            <div
              className=" flex justify-center items-center text-3xl text-amber-500 tooltip tooltip-bottom"
              data-tip="wisdom"
            >
              <RiCoinLine className="pr-2" />0{store.gold}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}
