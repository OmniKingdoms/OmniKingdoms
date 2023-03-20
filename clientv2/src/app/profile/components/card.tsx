"use client";
import { motion } from "framer-motion";
import Stats from "./stats";
import Equipament from "./equipament";
import { useEffect, useState } from "react";
import contractStore from "@/stores/contractStore";

import Image from "next/image";

export default function Card() {
  const tabs = ["Stats", "Equipament", "Soon"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const store = contractStore();
  const [player2, setPlayer2] = useState();
  console.log(player2);

  useEffect(() => {
    const loadContract = async () => {
      const response = await store.diamond.getPlayer(5);
      setPlayer2(response);
      console.log(player2);
    };
    loadContract();
  }, []);

  function renderSwitch(tab: string) {
    switch (tab) {
      case "Stats":
        return <Stats player={player} />;
      case "Equipament":
        return <Equipament />;
      case "Soon":
        return <h1>{tab}</h1>;
      default:
        return <Stats />;
    }
  }
  if (!player) {
    <>loading</>;
  }

  return (
    <>
      {/* <AiImage /> */}
      <div className="relative min-h-[85vh] w-3/5 flex flex-col items-center  rounded-t-lg justify-center font-bold text-white mx-auto ">
        <nav className="flex items-start justify-between  w-full bg-primary  border-b-2 border-gray-700">
          <ul className="flex items-center  px-6 py-4 rounded-t-lg justify-between bg-primary  w-1/2">
            {tabs.map((item) => (
              <li
                key={item}
                onClick={() => setSelectedTab(item)}
                className={
                  selectedTab === item
                    ? "selected hover:cursor-pointer px-6 py-1"
                    : "hover:cursor-pointer  px-6 py-1"
                }
              >
                {item}
                {selectedTab === item && (
                  <motion.div
                    className="bg-red-400 bottom-[-1px] left-0 right-0 h-[2px] "
                    layoutId="underline"
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
        <main className="w-full h-[40vh] flex bg-primary rounded-r-lg rounded-bl-lg">
          <motion.div
            key={selectedTab ? selectedTab : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className=" h-full w-2/3  p-4 gap-4 "
          >
            {/* <button onClick={() => (props.players = 4)}>changeee</button> */}
            {renderSwitch(selectedTab)}
          </motion.div>
          <div className=" flex relative bg-red-400  w-1/2">
            <Image src={player2?.uri} alt="avatar" fill className="absolute" />
            <div className="absolute right-[42%] bottom-4  mx-auto grid h-fit w-fit  max-w-4xl animate-rotate place-items-center rounded-lg bg-[linear-gradient(var(--rotate),var(--tw-gradient-from)_33%,rgb(37_99_235)_66%,var(--tw-gradient-to))] from-yellow-600 via-yellow-300 to-yellow-500 p-[0.15rem] shadow-xl ring-1 before:absolute before:inset-0 before:z-0 before:h-full before:w-full before:animate-rotate before:bg-[linear-gradient(var(--rotate),var(--tw-gradient-from)_33%,rgb(37_99_235)_66%,var(--tw-gradient-to))] before:from-yellow-500 before:via-yellow-300 before:to-yellow-600 before:blur-2xl before:transition-all before:hover:scale-110 before:hover:blur-3xl sm:mx-auto">
              <div className="z-10 grid h-full w-full place-items-center rounded-lg bg-primary bg-gradient-to-t from-neutral-800 py-2 px-4 text-white">
                Name : {player2?.name}
              </div>
            </div>
            <div className="absolute right-[10%] bottom-4  mx-auto grid h-fit w-fit  max-w-4xl animate-rotate place-items-center rounded-lg bg-[linear-gradient(var(--rotate),var(--tw-gradient-from)_33%,rgb(37_99_235)_66%,var(--tw-gradient-to))] from-yellow-600 via-yellow-300 to-yellow-500 p-[0.15rem] shadow-xl ring-1 before:absolute before:inset-0 before:z-0 before:h-full before:w-full before:animate-rotate before:bg-[linear-gradient(var(--rotate),var(--tw-gradient-from)_33%,rgb(37_99_235)_66%,var(--tw-gradient-to))] before:from-yellow-500 before:via-yellow-300 before:to-yellow-600 before:blur-2xl before:transition-all before:hover:scale-110 before:hover:blur-3xl sm:mx-auto">
              <div className="z-10 grid h-full w-full place-items-center rounded-lg bg-primary bg-gradient-to-t from-neutral-800 py-2 px-4 text-white"></div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
