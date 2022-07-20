import { config } from "../config";
import { useNetwork } from "./use-wagmi";
import { useEffect } from "react";
import { useState } from "react";

export function usePreferredNetwork() {
  const { data } = useNetwork();
  const preferredNetwork = process.env.NEXT_PUBLIC_CHAIN ?? "mainnet";

  const [isPreferredNetwork, setIsPreferredNetwork] = useState(false);

  useEffect(() => {
    if (data.chain?.id && data.chain?.id == config.networks[preferredNetwork]) {
      setIsPreferredNetwork(true);
    } else {
      setIsPreferredNetwork(false);
    }
  }, [data.chain?.id]);

  return { isPreferredNetwork, preferredNetwork };
}
