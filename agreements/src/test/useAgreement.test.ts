import { useWriteAgreement } from "..";
import { renderHook } from "@testing-library/react";
import { BigNumber, ethers } from "ethers";

test("creating and joining a contract", async () => {
  const { result } = renderHook(() =>
    useWriteAgreement(
      "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
      new ethers.Wallet(
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        ethers.getDefaultProvider("http://localhost:8545")
      )
    )
  );

  await result.current.createAgreement("", "", [
    [
      "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
      BigNumber.from(1),
    ],
    [
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      BigNumber.from(1),
    ],
  ]);
});
