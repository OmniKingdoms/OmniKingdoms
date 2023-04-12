import { motion } from "framer-motion";
import craftmap from "../../../../public/images/craft1.png";
import contractStore from "@/store/contractStore";
import Diamond from "@/contracts/data/diamond.json";
import Image from "next/image";
import Link from "next/link";
import { ethers } from "ethers";
import { RiCoinLine } from "react-icons/ri";
import { TbSword } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Craft() {
  const store = contractStore();

  async function handleCraftSword() {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // Get signer
    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      process.env.NEXT_PUBLIC_DIAMOND_ADDRESS as string,
      Diamond.abi,
      signer
    );
    try {
      const craft = await contract.craftSword(store.selectedPlayer);
      toast.promise(provider.waitForTransaction(craft.hash), {
        pending: "Tx pending: " + craft.hash,
        success: {
          render() {
            return "Success: " + craft.hash;
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
  async function handleCraftArmor() {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // Get signer
    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      process.env.NEXT_PUBLIC_DIAMOND_ADDRESS as string,
      Diamond.abi,
      signer
    );

    try {
      const craft = await contract.craftArmor(store.selectedPlayer);
      toast.promise(provider.waitForTransaction(craft.hash), {
        pending: "Tx pending: " + craft.hash,
        success: {
          render() {
            return "Success: " + craft.hash;
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

  if (store.players.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-fit mb-auto min-h-fit flex flex-col sm:flex-row items-center justify-center mx-auto  h-[78vh]"
      >
        {" "}
        <div>
          <Link href={"/play"}>
            <span className="  hover:cursor-pointer font-bold text-2xl text-white rounded-lg bg-gray-600 py-1 px-2">
              Back to map
            </span>
          </Link>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-fit mb-auto min-h-fit flex flex-col sm:flex-row items-center justify-center mx-auto "
    >
      <Image
        src={craftmap}
        alt="game map"
        height={800}
        className="rounded-3xl shadow-inner  mix-blend-	"
      />
      <Link href={"/play"}>
        <span className=" absolute left-[10%] btn top-[5%] hover:cursor-pointer font-bold text-white rounded-lg bg-gray-600 py-1 px-2  ">
          Back
        </span>
      </Link>

      <button
        disabled={store.status !== 0}
        className="absolute left-[40%] top-[55%] flex-col disabled:text-zinc-100 disabled:bg-opacity-90 disabled:text-opacity-100 btn mt-2 bg-[#9696ea] btn-accent gap-1"
        onClick={() => {
          handleCraftSword();
        }}
      >
        <div>Craft Sword</div>
        <div className="badge gap-4 text-amber-300 ">
          <div className="flex items-center gap-1">
            <span className="text-red-500">-5</span>
            <RiCoinLine className="text-red-500" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-amber-300">+1</span>
            <TbSword className="text-amber-300" />
          </div>
        </div>
      </button>
      <button
        disabled={store.status !== 0}
        className="absolute left-[55%] top-[60%] flex-col disabled:text-zinc-100 disabled:bg-opacity-90 disabled:text-opacity-100 btn mt-2 bg-[#9696ea] btn-accent gap-1"
        onClick={() => {
          handleCraftArmor();
        }}
      >
        <div>Craft Armor</div>
        <div className="badge gap-4 text-amber-300 ">
          <div className="flex items-center gap-1">
            <span className="text-red-500">-3</span>
            <RiCoinLine className="text-red-500" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-amber-300">+1</span>
            <AiOutlineHeart className="text-amber-300 " />
          </div>
        </div>
      </button>
      <ToastContainer theme="dark" />
    </motion.div>
  );
}
