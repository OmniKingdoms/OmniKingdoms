"use client";
import { ethers } from "ethers";
import contractStore from "@/stores/contractStore";
import { useAccount } from "wagmi";
import Diamond from "../../contracts/data/diamond.json";
import Card from "./components/card";
import { useEffect } from "react";

export default function Profile() {
  const store = contractStore();
  const { isConnected } = useAccount();
  useEffect(() => {
    const loadContract = async () => {
      const contract = await store.diamond;
      const response = await contract.getPlayers(
        "0x434d36F32AbeD3F7937fE0be88dc1B0eB9381244"
      );
      console.log(response);
      const players = await response.map((val: any) => val.toNumber());
      store.setPlayers(await players);
      console.log(players);
      const contras = async () => {
        const players = await store.players;
        console.log(players);
      };
      const response2 = await contract.getPlayer(players[2]);
      console.log(response2);
      store.setPlayer(response2);
      console.log(await store.player);
      contras();
    };
    loadContract();
  }, []);

  return (
    <>
      {/* {isConnected ? <Card /> : <button>connect</button>} */}
      {/* <Card player={}/> */}
    </>
  );
}
