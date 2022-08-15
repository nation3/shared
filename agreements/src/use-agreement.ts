import abiJson from "./abi.json";
import SHA256 from "crypto-js/sha256";
import { Contract, providers, BigNumber, Signer } from "ethers";
import MerkleTree from "merkletreejs";
import { useMemo, useState } from "react";

export default function useWriteAgreement(
  contractAddress: string,
  signer: Signer
) {
  const contract = useMemo(
    () => new Contract(contractAddress, abiJson.abi, signer),
    [contractAddress, signer]
  );

  const findRoot = (positions: [string, BigNumber][]) => {
    const leaves = positions.flat().map((x) => SHA256(x.toString()));
    const tree = new MerkleTree(leaves, SHA256);
    return tree.getRoot().toString("hex");
  };

  const createAgreement = async (
    terms: string,
    metadataURI: string,
    positions: [string, BigNumber][]
  ) => {
    const root = findRoot(positions);
    const txn = await contract.createAgreement({
      termsHash: "0x" + SHA256(terms).toString(),
      criteria: "0x" + root,
      metadataURI,
    });
    return txn;
  };

  const joinAgreement = async () => {};

  return { createAgreement };
}
