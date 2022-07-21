import { config } from "./config";
import { ethers } from "ethers";
import { chain } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const chains = [chain.mainnet, chain.goerli, chain.hardhat];

export function externalProvider() {
  if (process.env.NEXT_PUBLIC_CHAIN === "local") {
    console.log("Provider: Connected to localhost provider");
    return new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:7545",
      config.networks[process.env.NEXT_PUBLIC_CHAIN ?? "mainnet"]
    );
  } else {
    console.log(
      `Provider: Connected to the external provider on chain ${process.env.NEXT_PUBLIC_CHAIN}`
    );
    return ethers.getDefaultProvider(process.env.NEXT_PUBLIC_CHAIN, {
      infura: process.env.NEXT_PUBLIC_INFURA_ID,
      alchemy: process.env.NEXT_PUBLIC_ALCHEMY_ID,
      etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_ID,
      quorum: 1,
    });
  }
}

export const connectors = [
  new InjectedConnector({
    chains,
    options: { shimDisconnect: true },
  }),
  new WalletConnectConnector({
    chains,
    options: {
      qrcode: true,
    },
  }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: "Nation3 app",
    },
  }),
];
