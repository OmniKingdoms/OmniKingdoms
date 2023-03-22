import { create } from "zustand";
import Diamond from "@/contracts/data/diamond.json";
import { ethers } from "ethers";
import { persist, createJSONStorage } from "zustand/middleware";

type TcontractStore = {
  players: number[];
  setPlayers: (players: number[]) => void;
  player: any;
  setPlayer: (player: number) => void;
  gold: number;
  setGold: (gold: number) => void;
};

export const contractStore = persist<TcontractStore>(
  (set, get) => ({
    players: [],
    player: {},
    gold: 0,
    setPlayers: (players) => set(() => ({ players: players })),
    setPlayer: (player) => set(() => ({ player: player })),
    setGold: (gold) => set(() => ({ gold: gold })),
  }),
  {
    name: "player",
  }
);

export default create(contractStore);
