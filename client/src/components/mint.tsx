import { uploadToIPFS } from "@/Utils/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { contractStore } from "@/store/contractStore";
import { useState, useRef } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import { useNetwork } from "wagmi";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  name: string;
  gender: string;
};

type Player = {
  name?: string;
  gender?: boolean;
  image?: string;
};
export default function Mint() {
  const { chain } = useNetwork();
  console.log(chain);
  const diamond = contractStore((state) => state.diamond);
  const timeout: { current: NodeJS.Timeout | null } = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nameAvailable, setNameAvailable] = useState(false);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const handleNameValidate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.trim()) {
      setNameAvailable(false);
    }
    timeout.current && clearTimeout(timeout.current);
    e.preventDefault();
    timeout.current = setTimeout(async () => {
      if (!e.target.value.trim()) {
        setNameAvailable(false);
      } else {
        const name = await diamond?.nameAvailable(e.target.value.trim());
        setNameAvailable(!name as any);
      }
    }, 100);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    reset();

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // Get signer

    const player: Player = {};
    try {
      // const res = await fetch("/api/getimage");
      // setIsLoading(false);

      // const json = await res.json();

      // let imgblob = await fetch(json.img);
      // let imgn = await imgblob.blob();
      // let file = new File([imgn], "test.jpg", json.metadata);
      // player.image = await uploadToIPFS(file);
      player.name = data.name.trim();

      if (data.gender === "Male") {
        player.gender = true;
        player.image =
          "https://infura-ipfs.io/ipfs/QmVQPguk3yttbq9inEyFNrADpZpHUTxAmgBv44i1zyLor7";
      } else {
        player.gender = false;
        player.image =
          "https://infura-ipfs.io/ipfs/QmbcRntJWvu6XJM89YZcPMgvEPQmyv1yJtmaFihYrbrkJC";
      }

      const mint = await diamond?.mint(
        player.name,
        player.image as any,
        player.gender
      );
      setIsLoading(false);
      toast.promise(provider.waitForTransaction(mint?.hash as any), {
        pending: "Tx pending: " + mint?.hash,
        success: {
          render() {
            return "Success: " + mint?.hash;
          },
        },
        error: "Tx failed",
      });
    } catch (error: any) {
      reset();

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
      setIsLoading(false);
    }
  };
  if (chain?.id === 80001) {
    return (
      <>
        <form
          className="flex flex-col mb-4 gap-2"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <input
            className="input bg-primary select-primary text-white"
            placeholder="Player Name"
            type="text"
            {...register("name", {
              required: true,
              onChange: handleNameValidate,
            })}
          />
          {!nameAvailable && (
            <span className="text-xs text-red-500">
              empty name or name already taken
            </span>
          )}
          <select
            className="input select-primary text-white bg-primary"
            {...register("gender", { required: true })}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
          <button
            disabled={!nameAvailable || isLoading}
            className="btn btn-primary text-white"
          >
            {" "}
            Mint Player
          </button>
        </form>
        {isLoading && (
          <div>
            <span className="relative inset-0 inline-flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-8 after:w-8 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
          </div>
        )}
        <ToastContainer theme="dark" />
      </>
    );
  }
}
