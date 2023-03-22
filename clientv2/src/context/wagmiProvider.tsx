import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, mainnet, polygon } from "wagmi/chains";

const chains = [polygonMumbai, polygon, mainnet];

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function WagmiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
      <Web3Modal
        themeMode="dark"
        themeVariables={{
          "--w3m-font-family": "Roboto, sans-serif",
          "--w3m-accent-fill-color": "#261f35",
          "--w3m-accent-color": "#E6E6FA",
          "--w3m-background-color": "#0e051a",
          "--w3m-button-border-radius": "8px",
        }}
        projectId={projectId}
        enableNetworkView={true}
        ethereumClient={ethereumClient}
      />
    </>
  );
}
