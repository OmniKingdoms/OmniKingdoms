import Play from "./play/index";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  router.push("/play");
  return <Play />;
}
