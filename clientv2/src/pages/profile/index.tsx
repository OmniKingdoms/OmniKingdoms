import { ethers } from "ethers";
import contractStore from "@/store/contractStore";
import { useAccount } from "wagmi";
import Diamond from "../../contracts/data/diamond.json";
import Card from "@/components/card";
import { useEffect, useState } from "react";
import Mint from "@/components/mint";

export default function Profile() {
  const store = contractStore();
  const { address, isConnected } = useAccount();
  const [players, setPlayers] = useState([]);

  const loadContract = async () => {
    const contract = await store.diamond;
    const response = await contract.getPlayers(address);
    console.log(response);
    const players = await response.map((val: any) => val.toNumber());
    store.setPlayers(await players);
    setPlayers(players);
  };
  useEffect(() => {
    loadContract();
  }, [address]);
  if (!address) {
  }
  console.log(players);
  if (players.length === 0) {
    return (
      <div className="relative min-h-[85vh] min-w-full flex flex-col items-center justify-center">
        <Mint />
      </div>
    );
  }

  return (
    <>
      <Card />
    </>
  );
}
