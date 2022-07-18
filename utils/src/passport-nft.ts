import { useNft } from "use-nft";
import PassportIssuer from "../abis/PassportIssuer.json";
import { useContractRead, useContractWrite } from "./use-wagmi";
const [nationPassportNFT, nationPassportNFTIssuer] = [
  process.env.NEXT_PUBLIC_PASSPORT_NFT_ADDRESS,
  process.env.NEXT_PUBLIC_PASSPORT_NFT_ISSUER_ADDRESS,
];

const nftIssuerContractParams = {
  addressOrName: nationPassportNFTIssuer,
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

export function useClaimPassport() {
  return useContractWrite(
    {
      addressOrName: nationPassportNFTIssuer,
      contractInterface: PassportIssuer.abi,
    },
    "claim",
    {}
  );
}

export function usePassport(address: any) {
  const { data: id, isLoading: loadingID } = useContractRead(
    nftIssuerContractParams,
    "passportId",
    { args: [address], enable: address },
    false
  );
  const { loading, nft } = useNft(nationPassportNFT || "", id);
  return { data: { id, nft }, isLoading: loadingID || loading };
}
