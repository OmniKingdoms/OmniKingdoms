import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, mainnet, polygon } from "wagmi/chains";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

const chains = [polygonMumbai, polygon, mainnet];

const { connectors } = getDefaultWallets({
  appName: "Scroll Kingdoms",
  chains,
});
const { provider } = configureChains(chains, [publicProvider()]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function WagmiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
