import { useBalance } from "./use-wagmi";

export function useNationBalance(address: any) {
  return useBalance({
    addressOrName: address,
    token: process.env.NEXT_PUBLIC_NATION_ADDRESS,
    watch: true,
    enabled: address,
  });
}
