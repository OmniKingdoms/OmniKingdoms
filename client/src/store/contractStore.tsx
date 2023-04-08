import { create } from "zustand";
import Diamond from "@/contracts/data/diamond.json";
import { ethers } from "ethers";
import { persist, createJSONStorage } from "zustand/middleware";

type TplayerStore = {
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

const playerStore = persist<TplayerStore>(
  (set, get) => ({
    players: [],
    player: {},
    gold: 1,
    status: null,
    selectedPlayer: null,
    diamond: null,
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

type Tcontract = {
  diamond: any;
  setDiamond: (diamond: any) => void;
};

export const contractStore = create<Tcontract>((set) => ({
  diamond: null,
  setDiamond: (diamond) => set(() => ({ diamond: diamond })),
}));

export default create(playerStore);
