import { config } from "../../config";
import { useSignTypedData } from "../use-wagmi";

const nationPassportNFTIssuer =
  process.env.NEXT_PUBLIC_PASSPORT_NFT_ISSUER_ADDRESS;

export const domain = {
  name: "PassportIssuer",
  version: "1",
  chainId: config.networks[process.env.NEXT_PUBLIC_CHAIN ?? "mainnet"],
  verifyingContract: nationPassportNFTIssuer,
};

export const types = {
  Agreement: [
    { name: "statement", type: "string" },
    { name: "termsURI", type: "string" },
  ],
};

export const value = {
  statement: `${process.env.NEXT_PUBLIC_AGREEMENT_STATEMENT}`,
  termsURI: `${process.env.NEXT_PUBLIC_AGREEMENT_URL}`,
};

export function useSignAgreement({ onSuccess }: { onSuccess: Function }) {
  return useSignTypedData({
    domain,
    types,
    value,
    onSuccess,
  });
}

export async function storeSignature(signature: string, tx: string) {
  const response = await fetch("/api/store-signature", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ signature, tx }),
  });
  return response.json();
}
