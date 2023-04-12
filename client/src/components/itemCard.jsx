import Diamond from "@/contracts/data/diamond.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Image from "next/image";
import bodyarmor from "../../public/images/bodyarmor.jpeg";
import sword from "../../public/images/sword.jpeg";
import contractStore from "@/store/contractStore";

export default function ItemCard({ itemId }) {
  const [item, setItem] = useState(null);
  const store = contractStore();

  useEffect(() => {
    const loadContract = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Get signer
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_DIAMOND_ADDRESS,
        Diamond.abi,
        signer
      );
      const response = await contract.getItem(itemId);
      console.log(response);
      setItem(await response);
    };
    loadContract();
  }, []);
  if (!item) return null;

  async function handleEquip() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Get signer
    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      process.env.NEXT_PUBLIC_DIAMOND_ADDRESS,
      Diamond.abi,
      signer
    );
    if (item.slot.toNumber() === 1) {
      const equip = await contract.equipBody(store.selectedPlayer, itemId);
      console.log(equip);
    }
    if (item.slot.toNumber() === 2 || item.slot.toNumber() === 3) {
      const equip = await contract.equipRightHand(store.selectedPlayer, itemId);
      console.log(equip);
    }
  }
  async function handleUnequip() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Get signer
    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      process.env.NEXT_PUBLIC_DIAMOND_ADDRESS,
      Diamond.abi,
      signer
    );
    if (item.slot.toNumber() === 1) {
      const equip = await contract.unequipBody(store.selectedPlayer, itemId);
      console.log(equip);
    }
    if (item.slot.toNumber() === 2 || item.slot.toNumber() === 3) {
      const equip = await contract.unequipRightHand(
        store.selectedPlayer,
        itemId
      );
      console.log(equip);
    }
  }

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
      <ul
        tabIndex={itemId}
        className=" dropdown-content menu p-2 shadow bg-base-100 rounded-box flex items-center  "
      >
        <li className="">
          {item.stat.toNumber() === 0 && "strength: " + item.value.toNumber()}
          {item.stat.toNumber() === 1 && "health: " + item.value.toNumber()}
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
    </div>
  );
}
