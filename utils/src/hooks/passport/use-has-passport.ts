import PassportIssuer from "../../abis/PassportIssuer.json";
import { useContractRead } from "../use-wagmi";

const nftIssuerContractParams = {
  addressOrName: process.env.NEXT_PUBLIC_PASSPORT_NFT_ADDRESS,
  contractInterface: PassportIssuer.abi,
};

export function useHasPassport(address: any) {
  return useContractRead(
    nftIssuerContractParams,
    "passportStatus",
    {
      args: [address],
      watch: true,
      enable: address,
    },
    false
  );
}
