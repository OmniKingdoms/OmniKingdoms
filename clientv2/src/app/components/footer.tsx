import { FaDiscord, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-[#eeecde] fixed bottom-0 min-w-full mx-auto">
      <footer className="flex flex-col items-center justify-center my-4">
        <div className="flex gap-4">
          <Link href={"https://twitter.com/ScrollKingdoms"} target={"_blank"}>
            <FaTwitter size={30} color="#2aa9e0" />
          </Link>
          <Link
            href={"https://discord.com/invite/NX3qZuAFvG"}
            target={"_blank"}
          >
            <FaDiscord size={30} color="#5865f2" />
          </Link>
        </div>
        <p className="text-sm mt-4">
          Copyright © 📜 Scroll Kingdoms {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
