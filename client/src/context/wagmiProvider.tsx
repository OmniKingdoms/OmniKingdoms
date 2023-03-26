import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig, Chain } from "wagmi";
import { polygonMumbai, mainnet, polygon } from "wagmi/chains";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

export const scrollAlpha = {
  id: 534353,
  name: "ScrollAlpha",
  network: "ScrollAlpha",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://alpha-rpc.scroll.io/l2"] },
    default: { http: ["https://alpha-rpc.scroll.io/l2"] },
  },
  blockExplorers: {
    etherscan: { name: "blockscout", url: "https://blockscout.scroll.io/" },
    default: { name: "blockscout", url: "https://blockscout.scroll.io/" },
  },
} as const satisfies Chain;

const chains = [scrollAlpha, polygonMumbai, polygon, mainnet];

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
