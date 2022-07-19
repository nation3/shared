import { useBalance } from "./use-wagmi";

export function usePoolTokenBalance(address: any) {
  return useBalance({
    addressOrName: address,
    token: process.env.NEXT_PUBLIC_BALANCER_NATION_ETH_POOL_TOKEN,
    watch: true,
    enabled: address,
  });
}
