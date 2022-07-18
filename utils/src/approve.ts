import { useContractRead } from "./use-wagmi";
import { useContractWrite } from "./use-wagmi";
import ERC20 from "../abis/ERC20.json";

export function useTokenAllowance({ token, address, spender }: any) {
  return useContractRead(
    {
      addressOrName: token,
      contractInterface: ERC20.abi,
    },
    "allowance",
    {
      args: [address, spender],
      watch: true,
      enabled: token && address && spender,
    }
  );
}

export function useTokenApproval({ amountNeeded, token, spender }: any) {
  return useContractWrite(
    {
      addressOrName: token,
      contractInterface: ERC20.abi,
    },
    "approve",
    { args: [spender, amountNeeded] }
  );
}
