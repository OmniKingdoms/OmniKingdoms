import Diamond from "@/contracts/data/diamond.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Image from "next/image";
import bodyarmor from "../../public/images/bodyarmor.jpeg";
import sword from "../../public/images/sword.jpeg";
import { motion } from "framer-motion";
import contractStore from "@/store/contractStore";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
export default function ItemCard({ itemId }) {
  const [item, setItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className={`overflow-visible w-12 h-12 left-96 top-96 rounded-md ring-2  bg-gray-100 flex flex-col items-center gap-2 ${
        item.isEquiped ? "ring-green-400" : ""
      }`}
    >
      {item?.name === "Armor" && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image src={bodyarmor} className="rounded-md" alt={item?.name} />
        </motion.button>
      )}
      {item?.name === "Sword" && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image src={sword} className="rounded-md" alt={item?.name} />
        </motion.button>
      )}
      <motion.ul
        className="flex flex-col bg-[#9696ea] w-40 grid-cols-2 items-center justify-center p-2 m-0  rounded-xl "
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.li className="" variants={itemVariants}>
          {item.stat.toNumber() === 0 && "strength: " + item.value.toNumber()}
          {item.stat.toNumber() === 1 && "health: " + item.value.toNumber()}
        </motion.li>
        <motion.li className="font-bold" variants={itemVariants}>
          {item.isEquiped ? (
            <button onClick={handleUnequip}>Unequip</button>
          ) : (
            <button onClick={handleEquip}>Equip</button>
          )}
        </motion.li>
      </motion.ul>
    </motion.div>
  );
}
