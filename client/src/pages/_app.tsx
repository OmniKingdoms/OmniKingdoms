import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import NextHead from "next/head";
import WagmiProvider from "@/context/wagmiProvider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Poppins } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { contractStore } from "@/store/contractStore";
import { ethers } from "ethers";

import Diamond from "../../../deployment/artifacts/hardhat-diamond-abi/HardhatDiamondABI.sol/DIAMOND-1-HARDHAT.json";

const poppins = Poppins({
  weight: "400",
  variable: "--font-poppins",
  display: "swap",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const store = contractStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // set contract object in store
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_DIAMOND_ADDRESS as string,
      Diamond.abi,
      signer
    );
    store.setDiamond(contract);
    setMounted(true);
  }, []);

  return (
    <>
      <WagmiProvider>
        <NextHead>
          <title>Scroll Kingdom</title>
        </NextHead>
        <main className={`${poppins.variable} `}>
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.div key={router.pathname}>
              {mounted && <Component {...pageProps} />}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </WagmiProvider>
    </>
  );
}
