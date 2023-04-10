import Play from "./play/index";
import { contractStore } from "@/store/contractStore";

export default function Home() {
  const store = contractStore();

  console.log(store);

  return <Play />;
}
