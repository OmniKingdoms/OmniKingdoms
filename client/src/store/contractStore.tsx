import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DIAMOND1HARDHAT,
  PlayerStructOutput,
} from "../../../types/ethers-contracts/DIAMOND1HARDHAT";

type TplayerStore = {
  players: number[];
  setPlayers: (players: number[]) => void;
  player: PlayerStructOutput | undefined;
  setPlayer: (player: PlayerStructOutput | undefined) => void;
  gold: number | undefined;
  setGold: (gold: number | undefined) => void;
  status: number;
  setStatus: (status: number) => void;
  selectedPlayer: number;
  setSelectedPlayer: (selectedPlayer: number) => void;
};

const playerStore = persist<TplayerStore>(
  (set, get) => ({
    players: [],
    player: undefined,
    gold: 1,
    status: 0,
    selectedPlayer: 0,
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
  diamond: DIAMOND1HARDHAT | null;
  setDiamond: (diamond: DIAMOND1HARDHAT) => void;
};

export const contractStore = create<Tcontract>((set) => ({
  diamond: null,
  setDiamond: (diamond: DIAMOND1HARDHAT) => set(() => ({ diamond: diamond })),
}));

export default create(playerStore);
