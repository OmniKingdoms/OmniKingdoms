import { create } from "zustand";
import Diamond from "@/contracts/data/diamond.json";
import { ethers } from "ethers";

type TcontractStore = {
  players: number[];
  setPlayers: (players: number[]) => void;
  player: any;
  setPlayer: (player: number) => void;
};

export const contractStore = create<TcontractStore>((set, get) => ({
  players: [],
  player: {},
  setPlayers: (players) => set(() => ({ players: players })),
  setPlayer: (player) => set(() => ({ player: player })),
}));

export default contractStore;
