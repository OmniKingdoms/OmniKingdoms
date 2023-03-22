import { create } from "zustand";
import Diamond from "@/contracts/data/diamond.json";
import { ethers } from "ethers";

const setDiamond = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  // Get signer
  const signer = provider.getSigner();
  return loadDiamond(signer);
};

const loadDiamond = async (signer: any) => {
  const diamond = await new ethers.Contract(
    process.env.NEXT_PUBLIC_DIAMOND_ADDRESS as string,
    Diamond.abi,
    signer
  );
  return diamond;
};

type TcontractStore = {
  diamond: any;
  setDiamond: (diamond: any) => void;
  players: number[];
  setPlayers: (players: number[]) => void;
  player: any;
  setPlayer: (player: number) => void;
};

export const contractStore = create<TcontractStore>((set, get) => ({
  diamond: setDiamond(),
  players: [],
  player: {},
  setDiamond: (diamond) => set(() => ({ diamond })),
  setPlayers: (players) => set(() => ({ players: players })),
  setPlayer: (player) => set(() => ({ player: player })),
}));

export default contractStore;
