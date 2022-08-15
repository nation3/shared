import abiJson from "./abi.json";
import { Contract, providers, BigNumber, Signer, ethers } from "ethers";
import keccak256 from "keccak256";
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

  const createMerkleTree = (positions: [string, BigNumber][]) => {
    const leaves = positions.map((x) =>
      keccak256(ethers.utils.solidityPack(["address", "uint256"], [x[0], x[1]]))
    );
    return new MerkleTree(leaves, keccak256);
  };

  const findRoot = (positions: [string, BigNumber][]) => {
    return createMerkleTree(positions).getHexRoot();
  };

  const findUserLeaf = async (positions: [string, BigNumber][]) => {
    return await positions.find(
      async (x) => x[0] == (await signer.getAddress())
    );
  };

  const findProof = async (
    positions: [string, BigNumber][],
    leaf: [string, BigNumber]
  ) => {
    return createMerkleTree(positions).getProof(
      keccak256(
        ethers.utils.solidityPack(["address", "uint256"], [leaf[0], leaf[1]])
      )
    );
  };

  const createAgreement = async (
    terms: string,
    metadataURI: string,
    positions: [string, BigNumber][]
  ) => {
    const root = findRoot(positions);
    const txn = await contract.createAgreement({
      termsHash: "0x" + keccak256(terms).toString("hex"),
      criteria: root,
      metadataURI,
    });
    return txn;
  };

  const joinAgreement = async (
    agreementId: string,
    positions: [string, BigNumber][]
  ) => {
    const criteria = (await contract.agreement(agreementId))[1];

    const leafPosition = await findUserLeaf(positions);
    if (leafPosition == undefined) {
      throw new Error("User is not a participant in the contract");
    }
    const proof = await findProof(positions, leafPosition);

    const txn = await contract.joinAgreement(
      agreementId,
      {
        account: await signer.getAddress(),
        balance: leafPosition[1],
        proof: proof.map((x) => "0x" + x.data.toString("hex")),
      },
      {
        gasLimit: BigNumber.from(1000000),
      }
    );

    return txn;
  };

  return { createAgreement, joinAgreement };
}
