import PassportNFT from "../../abis/Passport.json";
import { useContractRead, useContractWrite } from "../use-wagmi";

export function usePassportSigner(id: number) {
  console.log(id);
  return useContractRead(
    {
      addressOrName: process.env.nationPassportNFT,
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
      addressOrName: process.env.nationPassportNFT,
      contractInterface: PassportNFT.abi,
    },
    "setSigner",
    {
      args: [id, signerAddress],
    }
  );
}
