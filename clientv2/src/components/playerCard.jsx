import Image from "next/image";
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
import MintButton from "./mintButton";
import Link from "next/link";
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
      console.log(response);
      const players = await response.map((val) => val.toNumber());
      console.log(players);
      const player = await contract.getPlayer(players[index]);
      store.setPlayer(await player);
      store.setStatus(await player.status.toNumber());
      console.log(store.status);
      const gold = await contract.getGoldBalance(address);
      store.setGold(await gold.toNumber());
    };
    loadContract();
  }, [index, address]);
  if (store.player.status) {
    return (
      <>
        <div className="stats shadow absolute -left-32 -bottom-8 rounded-l-none rounded-br-none bg-[#E6E6FA] overflow-visible py-2 pr-5 gap-6 scale-[0.40] sm:absolute sm:scale-75 sm:bottom-1 sm:-left-12 lg:left-1 lg:scale-100">
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
                <div className=" font-bold text-sm">
                  {store.player.status.toNumber() === 0 ? (
                    <span className="text-success">ready</span>
                  ) : (
                    <span className="text-error">not ready</span>
                  )}
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
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip tooltip"
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
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip tooltip"
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
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip "
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
            <Link href={"/mint"}>
              <button
                whileTap={{ scale: 0.97 }}
                className=" items-center mb-2 btn-accent btn bg-[#9696ea] text-purple-800   border-0"
              >
                Mint
              </button>
            </Link>
            <div
              className=" flex  justify-center items-center text-3xl text-amber-500 tooltip tooltip-bottom"
              data-tip="gold"
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
