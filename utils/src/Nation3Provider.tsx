import { ErrorProvider } from "./ErrorProvider";
import React from "react";
import { WagmiProvider } from "wagmi";

export const Nation3Provider = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <WagmiProvider>
      <ErrorProvider>{children}</ErrorProvider>
    </WagmiProvider>
  );
};
