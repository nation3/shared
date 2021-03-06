import { ErrorProvider } from "./ErrorProvider";
import { connectors, externalProvider } from "./connectors";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import { NftProvider } from "use-nft";
import { WagmiProvider } from "wagmi";

export const Nation3Provider = ({ children }: React.PropsWithChildren<{}>) => {
  let provider = externalProvider();

  useEffect(() => {
    const userProvider =
      window.ethereum || (window as unknown as any).web3?.currentProvider;
    if (userProvider && process.env.NEXT_PUBLIC_CHAIN !== "local") {
      provider = new ethers.providers.Web3Provider(
        userProvider,
        process.env.NEXT_PUBLIC_CHAIN
      );
    }
  }, []);

  return (
    <WagmiProvider
      connectors={connectors}
      provider={provider}
      autoConnect={true}
    >
      <NftProvider fetcher={["ethers", { provider: externalProvider() }]}>
        <ErrorProvider>{children}</ErrorProvider>
      </NftProvider>
    </WagmiProvider>
  );
};
