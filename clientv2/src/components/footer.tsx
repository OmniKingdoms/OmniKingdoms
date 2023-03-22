import { FaDiscord, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" relative items-center footer flex justify-center w-full p-4 text-neutral-content ">
      <div className="items-center grid-flow-col">
        <p> Scroll Kingdoms Copyright © 2023 - All right reserved</p>
      </div>
      <div className="grid-flow-col flex gap-4 md:place-self-center md:justify-self-end">
        <Link href={"https://twitter.com/ScrollKingdoms"} target={"_blank"}>
          <FaTwitter size={30} color="#2aa9e0" />
        </Link>
        <Link href={"https://discord.com/invite/NX3qZuAFvG"} target={"_blank"}>
          <FaDiscord size={30} color="#5865f2" />
        </Link>
      </div>
    </footer>
    // <div className="bg-[#0e051a] fixed bottom-0 min-w-full mx-auto footer">
    //   <footer className="flex flex-col items-center justify-center my-4">
    //     <div className="flex gap-4">

    //     </div>
    //     <p className="text-sm mt-4 text-white">
    //       Copyright © 📜 Scroll Kingdoms {new Date().getFullYear()}
    //     </p>
    //   </footer>
    // </div>
  );
}
