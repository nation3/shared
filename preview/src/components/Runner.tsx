import { useWriteAgreement } from "@nation3/agreements";
import { ethers, Contract, BigNumber } from "ethers";
import React, { useCallback, useEffect, useMemo } from "react";

export default function Runner() {
  const wallet = new ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    ethers.getDefaultProvider("http://localhost:8545")
  );
  const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

  const { createAgreement } = useWriteAgreement(contractAddress, wallet);

  const runAll = useCallback(async () => {
    console.log("ASDSAQD");
    const token = new Contract(
      "0x5fbdb2315678afecb367f032d93f642f64180aa3",
      [
        "function mint(address to, uint256 value) public",
        "function approve(address spender, uint256 amount) public returns (bool)",
      ],
      wallet
    );

    await token.mint(wallet.address, BigNumber.from(1000000));
    await token.approve(contractAddress, BigNumber.from(1000000));

    const positions = [
      ["0x70997970c51812dc3a010c7d01b50e0d17dc79c8", "1"],
      ["0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "1"],
      ["0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc", "1"],
    ] as [string, string][];

    const createTxn = await createAgreement("", "", positions);
    const agreementId = (await createTxn.wait()).events[0].args[0];
    console.log(agreementId);
  }, []);

  useEffect(() => {
    runAll();
  }, []);
  return <div>Runner</div>;
}
