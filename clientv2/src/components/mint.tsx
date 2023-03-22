import createImg from "@/utils/image";
import { useForm, SubmitHandler } from "react-hook-form";
import contractStore from "@/store/contractStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: { isSubmitting },
    register,
    handleSubmit,
    reset,
  } = useForm<Inputs>();
  const store = contractStore();

  async function handleImg() {
    const img = await createImg();
    console.log(img);
  }
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    reset();
    const contract = await store.diamond;
    console.log(contract);
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
      <form
        className="flex flex-col mb-4 gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="input bg-primary"
          placeholder="Player Name"
          type="text"
          {...register("name", { required: true })}
        />
        <select
          className="input select-primary bg-primary"
          {...register("gender", { required: true })}
        >
          <option>Male</option>
          <option>Female</option>
        </select>
        <button disabled={isLoading} className="btn btn-primary text-white">
          {" "}
          Mint Player
        </button>
      </form>
      {isLoading && (
        <div>
          <span className="relative inset-0 inline-flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-8 after:w-8 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
        </div>
      )}
    </>
  );
}
