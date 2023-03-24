import createImg from "@/Utils/image";
import { useForm, SubmitHandler } from "react-hook-form";
import contractStore from "@/store/contractStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ethers } from "ethers";
import { motion, Variants } from "framer-motion";
import Diamond from "@/contracts/data/diamond.json";
import Toast from "./toast";

type Inputs = {
  name: string;
  gender: string;
};

type Player = {
  name?: string;
  gender?: boolean;
  image?: string;
};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
export default function MintButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    formState: { isSubmitting },
    register,
    handleSubmit,
    reset,
  } = useForm<Inputs>();
  const store = contractStore();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    reset();
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // Get signer
    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      process.env.NEXT_PUBLIC_DIAMOND_ADDRESS as string,
      Diamond.abi,
      signer
    );
    const player: Player = {};
    player.image = await createImg();
    player.name = data.name;

    if (data.gender === "Male") {
      player.gender = true;
    } else {
      player.gender = false;
    }
    const response = await contract.mint(
      player.name,
      player.image,
      player.gender
    );
    setIsLoading(false);
    router.push("/play");
  };
  return (
    <>
      <motion.form
        autoComplete="off"
        className="flex flex-row mb-4 gap-6 absolute top-[10%] left-[82%]  fill-purple-800 "
        data-tip="mint new player"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
          className=" flex justify-center items-center gap-2 btn-accent btn bg-[#9696ea] text-purple-800  w-fit border-0"
        >
          Mint
          <motion.div
            className=" max-w-fit"
            variants={{
              open: { rotate: 90 },
              closed: { rotate: 270 },
            }}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.55 }}
          >
            <svg width="15" height="15" viewBox="0 0 20 20">
              <path d="M0 7 L 20 7 L 10 16" />
            </svg>
          </motion.div>
        </motion.button>

        <motion.ul
          className="flex items-center justify-center p-2 m-0 bg-accent rounded-xl"
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
          <motion.li
            className="block p-1 m-0 rounded-lg"
            variants={itemVariants}
          >
            <input
              className="input bg-accent select-accent placeholder:text-purple-800 text-purple-800 w-full focus:border-accent  border-b-2 border-0 border-[#c1c1ec] rounded-none"
              placeholder="Name"
              type="text"
              {...register("name", { required: true })}
            />
            <select
              className="input select-primary bg-accent text-purple-800  border-0"
              {...register("gender", { required: true })}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </motion.li>
          <motion.li className=" " variants={itemVariants}>
            <button
              disabled={isLoading}
              className="btn btn-accent text-purple-800 focus:border-success border-1 mb-2"
            >
              {" "}
              {!isLoading ? (
                "Mint Player"
              ) : (
                <div>
                  <span className="relative inset-0 inline-flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-8 after:w-8 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
                </div>
              )}
            </button>
          </motion.li>
        </motion.ul>
      </motion.form>
    </>
  );
}
