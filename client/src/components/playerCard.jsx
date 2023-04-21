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
import { IoDiamondOutline } from "react-icons/io5";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";

import InventoryModal from "./inventoryModal";
export default function PlayerCard() {
  const { address } = useAccount();
  const store = contractStore();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (address) {
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
        store.setSelectedPlayer(players[index]);
        store.setPlayer(await player);
        store.setStatus(await player.status.toNumber());
        const gold = await contract.getGoldBalance(address);
        store.setGold(await gold.toNumber());
        const gem = await contract.getGemBalance(address);
        store.setGem(await gem.toNumber());
      };
      loadContract();
    }
  }, [index, address]);
  function statusSwitch(status) {
    switch (status) {
      case 0:
        return <span className="text-success">ready</span>;
      case 1:
        return <span className="text-error">training</span>;
      case 2:
        return <span className="text-error">questing</span>;
      case 3:
        return <span className="text-error">crafting</span>;
      case 4:
        return <span className="text-error">arena</span>;
      default:
        return <span className="text-success">ready</span>;
    }
  }
  if (store.player?.status) {
    return (
      <>
        <div className="stats flex md:flex-col 2xl:absolute shadow md:rounded-l-none  bg-[#E6E6FA] overflow-visible p-1 sm:p-2 gap-1 sm:gap-2 h-fit w-fit">
          <div className="w-full flex flex-col sm:flex-row md:flex-col items-center my-auto pl-1 sm:gap-4">
            <div className="avatar p-4 ">
              <div className="w-6 sm:w-16 rounded-full ">
                <Image
                  alt="player"
                  src={store.player?.uri}
                  fill
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-center">
              <div className="sm:stat-value text-purple-900 ">
                {store.player?.name}
              </div>
              <div className="flex gap-2 items-center justify-center">
                <button
                  onClick={() =>
                    index === 0
                      ? setIndex(store.players.length - 1)
                      : setIndex(index - 1)
                  }
                  className=" bg-[#9696ea] p-1 rounded-full h-fit text-white"
                >
                  {" "}
                  <HiArrowSmLeft />
                </button>
                <div>
                  <div className="text-xs sm:stat-title">
                    {" "}
                    {store.player?.male ? "Male" : "Female"}
                  </div>
                  <div className=" font-bold text-xs sm:text-sm">
                    {statusSwitch(store.player.status.toNumber())}
                  </div>
                </div>
                <button
                  onClick={() =>
                    index === store.players.length - 1
                      ? setIndex(0)
                      : setIndex(index + 1)
                  }
                  className=" bg-[#9696ea]  p-1 rounded-full h-fit text-white"
                >
                  <HiArrowSmRight className="" />
                </button>
              </div>
              {/* <div className="stat-desc text-purple-800 font-bold">
                level: {store.player?.level.toNumber()}
              </div> */}
              {/* <progress
                className="progress w-full progress-success"
                value="50"
                max="100"
              ></progress> */}
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-1  my-auto">
            <div
              className=" flex justify-center items-center sm:text-3xl text-purple-900  tooltip"
              data-tip="strength"
            >
              <TbSword />0{store.player?.strength.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center sm:text-3xl text-purple-900 tooltip"
              data-tip="health"
            >
              <AiOutlineHeart />
              {store.player?.health.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center sm:text-3xl text-purple-900 tooltip"
              data-tip="magic"
            >
              <SlEnergy />0{store.player?.magic.toNumber()}
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-1 my-auto ">
            <div
              className=" flex justify-center items-center sm:text-3xl text-purple-900 tooltip"
              data-tip="mana"
            >
              <GiPotionBall />0{store.player?.mana.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center sm:text-3xl text-purple-900 tooltip"
              data-tip="agility"
            >
              <TbBrandTailwind />0{store.player?.agility.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center sm:text-3xl text-purple-900 tooltip"
              data-tip="luck"
            >
              <TbClover />0{store.player?.luck.toNumber()}
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-1 my-auto ">
            <div
              className=" flex justify-center items-center sm:text-3xl text-purple-900 tooltip "
              data-tip="wisdom"
            >
              <GoLightBulb />0{store.player?.wisdom.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center sm:text-3xl text-purple-900 tooltip"
              data-tip="haki"
            >
              <SiGhost />0{store.player?.haki.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center sm:text-3xl text-purple-900 tooltip"
              data-tip="perception"
            >
              <TfiEye />0{store.player?.perception.toNumber()}
            </div>
          </div>

          <div className="flex md:flex-row flex-col items-center justify-between gap-1 my-auto ">
            <div
              className=" flex  justify-center items-center sm:text-3xl text-amber-500 tooltip "
              data-tip="gold"
            >
              <RiCoinLine className="pr-2" />0{store.gold}
            </div>
            <div
              className=" flex  justify-center items-center sm:text-3xl text-cyan-500 tooltip "
              data-tip="gem"
            >
              <IoDiamondOutline className="pr-2" />0{store.gem}
            </div>
            <label
              htmlFor="my-modal"
              className="bg-[#9696ea]  px-2 py-1 rounded-lg h-fit text-white"
            >
              inventory
            </label>
          </div>
        </div>
        <InventoryModal />
      </>
    );
  } else {
    return null;
  }
}
