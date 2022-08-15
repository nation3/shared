import { useWriteAgreement } from "..";
import { renderHook } from "@testing-library/react";
import { BigNumber, Contract, ethers } from "ethers";

test("creating and joining a contract", async () => {
  const wallet = new ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    ethers.getDefaultProvider("http://localhost:8545")
  );
  const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

  const { result } = renderHook(() =>
    useWriteAgreement(contractAddress, wallet)
  );

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
    [
      "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
      BigNumber.from(1),
    ],
    [
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      BigNumber.from(1),
    ],
  ] as [string, BigNumber][];

  const createTxn = await result.current.createAgreement("", "", positions);
  const agreementId = (await createTxn.wait()).events[0].args[0];

  const joinTxn = await result.current.joinAgreement(agreementId, positions);
  console.log(await joinTxn.wait());
});
