import PassportIssuer from "../../abis/PassportIssuer.json";
import { useContractRead } from "../use-wagmi";
import { useNft } from "use-nft";

const [nationPassportNFT, nationPassportNFTIssuer] = [
  process.env.NEXT_PUBLIC_PASSPORT_NFT_ADDRESS,
  process.env.NEXT_PUBLIC_PASSPORT_NFT_ISSUER_ADDRESS,
];

const nftIssuerContractParams = {
  addressOrName: nationPassportNFTIssuer,
  contractInterface: PassportIssuer.abi,
};

export function usePassport(address: string) {
  const { data: id, loading: loadingID } = useContractRead(
    nftIssuerContractParams,
    "passportId",
    { args: [address], enable: address },
    false
  );
  const { loading, nft } = useNft(
    nationPassportNFT || "",
    id?.toString() ?? ""
  );
  return { data: { id, nft }, isLoading: loadingID || loading };
}
