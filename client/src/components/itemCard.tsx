import Diamond from "@/contracts/data/diamond.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Image from "next/image";
import bodyarmor from "../../public/images/bodyarmor.jpeg";
import wizardhat from "../../public/images/wizardhat.jpeg";

import sword from "../../public/images/sword.jpeg";
import playerStore, { contractStore } from "@/store/contractStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ItemStructOutput } from "../../../types/ethers-contracts/DIAMOND1HARDHAT";

export default function ItemCard({ itemId }: any) {
  const [item, setItem] = useState<ItemStructOutput | undefined>();
  const player = playerStore((state) => state.player);
  const selectedPlayer = playerStore((state) => state.selectedPlayer);
  const diamond = contractStore((state) => state.diamond);

  useEffect(() => {
    const loadContract = async () => {
      const response = await diamond?.getItem(itemId);

      setItem(await response);
    };
    loadContract();
  }, []);
  if (!item) return null;

  async function handleEquip() {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);

    if (item?.slot.toNumber() === 1) {
      try {
        const equip = await diamond?.equipBody(selectedPlayer, itemId);
        toast.promise(provider.waitForTransaction(equip?.hash as any), {
          pending: "Tx pending: " + equip?.hash,
          success: {
            render() {
              return "Success: " + equip?.hash;
            },
          },
          error: "Tx failed",
        });
      } catch (error: any) {
        if (error.data) {
          toast.error(error.data.message as string, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error(error.reason as string, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    }
    if (item?.slot.toNumber() === 0) {
      try {
        const equip = await diamond?.equipHead(selectedPlayer, itemId);
        toast.promise(provider.waitForTransaction(equip?.hash as any), {
          pending: "Tx pending: " + equip?.hash,
          success: {
            render() {
              return "Success: " + equip?.hash;
            },
          },
          error: "Tx failed",
        });
      } catch (error: any) {
        if (error.data) {
          toast.error(error.data.message as string, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error(error.reason as string, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    }
    if (item?.slot.toNumber() === 2 || item?.slot.toNumber() === 3) {
      try {
        const equip = await diamond?.equipRightHand(selectedPlayer, itemId);
        toast.promise(provider.waitForTransaction(equip?.hash as any), {
          pending: "Tx pending: " + equip?.hash,
          success: {
            render() {
              return "Success: " + equip?.hash;
            },
          },
          error: "Tx failed",
        });
      } catch (error: any) {
        if (error.data) {
          toast.error(error.data.message as string, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error(error.reason as string, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    }
  }
  async function handleUnequip() {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // Get signer

    if (item?.slot.toNumber() === 1) {
      try {
        const equip = await diamond?.unequipBody(selectedPlayer, itemId);
        toast.promise(provider.waitForTransaction(equip?.hash as any), {
          pending: "Tx pending: " + equip?.hash,
          success: {
            render() {
              return "Success: " + equip?.hash;
            },
          },
          error: "Tx failed",
        });
      } catch (error: any) {
        if (error.data) {
          toast.error(error.data.message as string, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error(error.reason as string, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    }
    if (item?.slot.toNumber() === 0) {
      try {
        const equip = await diamond?.unequipHead(selectedPlayer, itemId);
        toast.promise(provider.waitForTransaction(equip?.hash as any), {
          pending: "Tx pending: " + equip?.hash,
          success: {
            render() {
              return "Success: " + equip?.hash;
            },
          },
          error: "Tx failed",
        });
      } catch (error: any) {
        if (error.data) {
          toast.error(error.data.message as string, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error(error.reason as string, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    }
    if (item?.slot.toNumber() === 2 || item?.slot.toNumber() === 3) {
      try {
        const equip = await diamond?.unequipRightHand(selectedPlayer, itemId);
        toast.promise(provider.waitForTransaction(equip?.hash as any), {
          pending: "Tx pending: " + equip?.hash,
          success: {
            render() {
              return "Success: " + equip?.hash;
            },
          },
          error: "Tx failed",
        });
      } catch (error: any) {
        if (error.data) {
          toast.error(error.data.message as string, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error(error.reason as string, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    }
  }
  console.log(itemId);

  return (
    <div
      className={`overflow-visible dropdown w-12 h-12 rounded-md ring-2 bg-gray-100  items-center gap-2 ${
        item.isEquiped ? "ring-green-400" : ""
      }`}
    >
      {item?.name === "Armor" && (
        <label tabIndex={itemId}>
          <Image src={bodyarmor} className="rounded-md " alt={item?.name} />
        </label>
      )}
      {item?.name === "Sword" && (
        <div tabIndex={itemId}>
          <Image src={sword} className="rounded-md" alt={item?.name} />
        </div>
      )}
      {item?.name === "WizHat" && (
        <div tabIndex={itemId}>
          <Image src={wizardhat} className="rounded-md" alt={item?.name} />
        </div>
      )}
      <ul
        tabIndex={itemId}
        className=" dropdown-content menu p-2 shadow bg-base-100 rounded-box flex items-center  "
      >
        <li className="">
          {item.stat.toNumber() === 0 && "strength: " + item.value.toNumber()}
          {item.stat.toNumber() === 1 && "health: " + item.value.toNumber()}
          {item.stat.toNumber() === 3 && "magic: " + item.value.toNumber()}
        </li>
        <li>
          {item.isEquiped ? (
            <button
              className="font-bold btn btn-accent"
              onClick={handleUnequip}
            >
              Unequip
            </button>
          ) : (
            <button className="font-bold btn btn-accent" onClick={handleEquip}>
              Equip
            </button>
          )}
        </li>
      </ul>
      <ToastContainer theme="dark" />
    </div>
  );
}
