import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig, Chain } from "wagmi";
import { polygonMumbai, mainnet, polygon, scrollTestnet } from "wagmi/chains";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

const mantletestnet: Chain = {
  id: 5001,
  name: "Mantle Testnet",
  network: "Mantle Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BIT",
    symbol: "BIT",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.mantle.xyz"],
    },
    public: {
      http: ["https://rpc.testnet.mantle.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Mantle Testnet Explorer",
      url: "https://explorer.testnet.mantle.xyz",
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [scrollTestnet, mantletestnet],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Scroll Kingdoms",
  chains,
});

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
        <RainbowKitProvider chains={chains} initialChain={scrollTestnet}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
