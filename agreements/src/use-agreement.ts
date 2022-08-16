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

  const initialHashListToken = (address: string, balance: string) => {
    return ethers.utils.hexlify(
      Buffer.from(
        keccak256(
          ethers.utils.defaultAbiCoder.encode(
            ["address", "uint256"],
            [address, balance]
          )
        ).toString("hex"),
        "hex"
      )
    );
  };

  const createAgreement = async (
    terms: string,
    metadataURI: string,
    positions: [string, string][]
  ) => {
    const Leaves = positions.map(([address, balance]) =>
      initialHashListToken(address, balance)
    );
    const Tree = new MerkleTree(Leaves, keccak256, { sortPairs: true });
    const root = Tree.getHexRoot();

    const txn = await contract.createAgreement({
      termsHash: ethers.utils.hexlify(
        Buffer.from(
          keccak256(
            ethers.utils.defaultAbiCoder.encode(["string"], [terms])
          ).toString("hex"),
          "hex"
        )
      ),
      criteria: root,
      metadataURI,
    });
    return txn;
  };

  const joinAgreement = async (
    agreementId: string,
    positions: [string, string][],
    balance: string
  ) => {
    const address = await signer.getAddress();
    const Leaves = positions.map(([address, balance]) =>
      initialHashListToken(address, balance)
    );
    const Tree = new MerkleTree(Leaves, keccak256, { sortPairs: true });

    const leaf = initialHashListToken(address, balance);

    const proof = Tree.getProof(leaf).map((proof) =>
      ethers.utils.hexlify(proof.data)
    );

    const txn = await contract.joinAgreement(
      agreementId,
      {
        account: address,
        balance,
        proof,
      },
      {
        gasLimit: BigNumber.from(1000000),
      }
    );

    return txn;
  };

  return { createAgreement, joinAgreement };
}
