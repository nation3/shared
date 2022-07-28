import PassportNFT from "../../abis/Passport.json";
import { useContractRead, useContractWrite } from "../use-wagmi";

export function usePassportSigner(id: number) {
  return useContractRead(
    {
      addressOrName: process.env.NEXT_PUBLIC_PASSPORT_NFT_ADDRESS,
      contractInterface: PassportNFT.abi,
    },
    "signerOf",
    {
      args: [id],
      watch: true,
      enable: id,
    }
  );
}

export function useSetPassportSigner(id: number, signerAddress: string) {
  return useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_PASSPORT_NFT_ADDRESS,
      contractInterface: PassportNFT.abi,
    },
    "setSigner",
    {
      args: [id, signerAddress],
    }
  );
}
