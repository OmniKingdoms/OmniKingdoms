import Image from "next/image";
import playerStore, { contractStore } from "@/store/contractStore";
import bodyarmor from "../../public/images/bodyarmor.jpeg";
import wizardhat from "../../public/images/wizardhat.jpeg";
import sword from "../../public/images/sword.jpeg";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ItemCard from "./itemCard";

export default function InventoryModal() {
  const { address } = useAccount();
  const [itens, setItens] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const player = playerStore((state) => state.player);
  const diamond = contractStore((state) => state.diamond);
  const itemsPerPage = 10;

  const handlePrevious = () => {
    setCurrentPage(Math.max(0, currentPage - 1));
  };

  const handleNext = () => {
    setCurrentPage(
      Math.min(Math.ceil(itens.length / itemsPerPage) - 1, currentPage + 1)
    );
  };

  useEffect(() => {
    const loadContract = async () => {
      const response = await diamond?.getItems(address as any);
      const itensarr = await response?.map((val: any) => val.toNumber());
      setItens((await itensarr) as any);
    };
    loadContract();
  }, [address]);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, itens.length);
  const displayedItems = itens.slice(startIndex, endIndex);
  console.log(player?.slot.head.toNumber());

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal bg-red">
        <div className="w-fit max-w-full bg-[#e6e6fa]  relative card p-2 card-side overflow-visible">
          <div className=" w-fit relative hidden sm:block">
            <Image
              alt="player"
              src={player?.uri as any}
              width={400}
              height={400}
              className="rounded-xl "
            />

            <div
              className="w-12 h-12 left-5 top-9 rounded-md ring-2  bg-gray-300  bg-opacity-25 opacity-90 absolute tooltip tooltip-left"
              data-tip="head"
            >
              {player?.slot.head.toNumber() === 0 ? null : (
                <Image
                  src={wizardhat}
                  width={1000}
                  alt="wizard hat"
                  className="rounded-md"
                />
              )}
            </div>
            <div
              className="w-12 h-12 left-5 top-44 rounded-md ring-2  bg-gray-300 bg-opacity-25 opacity-90 absolute tooltip tooltip-left "
              data-tip="body"
            >
              {player?.slot.body.toNumber() === 0 ? null : (
                <Image
                  src={bodyarmor}
                  width={1000}
                  alt="body armor"
                  className="rounded-md"
                />
              )}
            </div>
            <div
              className="w-12 h-12 left-5 top-80 rounded-md ring-2  bg-gray-300 bg-opacity-25 opacity-90 absolute tooltip tooltip-left "
              data-tip="feet"
            >
              {player?.slot.feet.toNumber() === 0 ? null : <></>}
            </div>

            <div
              className="w-12 h-12 left-80 top-9 rounded-md ring-2  bg-gray-300 bg-opacity-25 opacity-90 absolute tooltip tooltip-left "
              data-tip="Right hand"
            >
              {player?.slot.rightHand.toNumber() === 0 ? null : (
                <Image
                  src={sword}
                  width={1000}
                  alt="body armor"
                  className="rounded-md"
                />
              )}
            </div>
            <div
              className="w-12 h-12 left-80 top-44 rounded-md ring-2  bg-gray-300  bg-opacity-25 opacity-90 absolute tooltip tooltip-left "
              data-tip="Left hand"
            >
              {player?.slot.leftHand.toNumber() === 0 ? null : <></>}
            </div>
            <div
              className="w-12 h-12 left-80 top-80 rounded-md ring-2  bg-gray-300 bg-opacity-25 opacity-90 absolute tooltip tooltip-left "
              data-tip="Pants"
            >
              {player?.slot.pants.toNumber() === 0 ? null : <></>}
            </div>
          </div>
          <div className=" w-fit m-2 flex flex-col items-center">
            <div className="flex items-center">
              <label
                htmlFor="my-modal"
                className="btn btn-sm btn-circle absolute right-2 "
              >
                ✕
              </label>
            </div>

            <div className=" grid px-6 py-5 grid-cols-2 gap-4 w-fit h-full ">
              {itens.length != 0 &&
                displayedItems.map((itemId) => <ItemCard itemId={itemId} />)}
            </div>
            <div className="">
              <button
                className={`bg-[#9696ea]  p-1 h-fit  rounded-l-lg ${
                  currentPage === 0 ? "text-black" : "text-white"
                } `}
                onClick={handlePrevious}
                disabled={currentPage === 0}
              >
                «
              </button>
              <button className="bg-[#9696ea] p-1 h-fit text-white">
                {currentPage}
              </button>
              <button
                className={`bg-[#9696ea]   p-1 h-fit  rounded-r-lg ${
                  currentPage === Math.ceil(itens.length / itemsPerPage) - 1
                    ? "text-black"
                    : "text-white"
                } `}
                onClick={handleNext}
                disabled={
                  currentPage === Math.ceil(itens.length / itemsPerPage) - 1
                }
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
