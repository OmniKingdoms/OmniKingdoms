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
  status: number | null;
  setStatus: (status: number) => void;
  selectedPlayer: number | null;
  setSelectedPlayer: (selectedPlayer: number) => void;
};

export const contractStore = persist<TcontractStore>(
  (set, get) => ({
    players: [],
    player: {},
    gold: 1,
    status: null,
    selectedPlayer: null,
    setPlayers: (players) => set(() => ({ players: players })),
    setPlayer: (player) => set(() => ({ player: player })),
    setGold: (gold) => set(() => ({ gold: gold })),
    setStatus: (status) => set(() => ({ status: status })),
    setSelectedPlayer: (selectedPlayer) =>
      set(() => ({ selectedPlayer: selectedPlayer })),
  }),
  {
    name: "player",
  }
);

export default create(contractStore);
