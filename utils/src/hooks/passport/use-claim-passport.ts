import PassportIssuer from "../../abis/PassportIssuer.json";
import { useContractWrite } from "../use-wagmi";

export function useClaimPassport() {
  return useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_PASSPORT_NFT_ISSUER_ADDRESS,
      contractInterface: PassportIssuer.abi,
    },
    "claim",
    {}
  );
}
