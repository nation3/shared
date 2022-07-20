import { config } from "../config";
import { useNetwork } from "./use-wagmi";
import { useEffect } from "react";
import { useState } from "react";

export function usePreferredNetwork() {
  const { activeChain } = useNetwork();
  const preferredNetwork = process.env.NEXT_PUBLIC_CHAIN ?? "mainnet";

  const [isPreferredNetwork, setIsPreferredNetwork] = useState(false);

  useEffect(() => {
    if (
      activeChain?.id &&
      activeChain?.id == config.networks[preferredNetwork]
    ) {
      setIsPreferredNetwork(true);
    } else {
      setIsPreferredNetwork(false);
    }
  }, [activeChain?.id]);

  return { isPreferredNetwork, preferredNetwork };
}
