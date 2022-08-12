import { Contract, providers, BigNumber, Signer } from "ethers";
import { useMemo, useState } from "react";

export default function useWriteAgreement({
  contractAddress,
  signer,
}: {
  contractAddress: string;
  signer: Signer;
}) {
  const contract = useMemo(
    () => new Contract(contractAddress, [], signer),
    [contractAddress, signer]
  );

  const createAgreement = async (
    terms: string,
    metadataURI: string,
    positions: [string, BigNumber]
  ) => {};

  const joinAgreement = async () => {};

  return { createAgreement };
}
