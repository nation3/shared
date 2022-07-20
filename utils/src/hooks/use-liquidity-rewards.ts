import LiquidityRewardsDistributor from "../abis/BoostedLiquidityDistributor.json";
import ERC20 from "../abis/ERC20.json";
import { NumberType, transformNumber } from "../numbers";
import { useStaticCall, useContractRead, useContractWrite } from "./use-wagmi";
import { BigNumber } from "ethers";
import { useState, useEffect } from "react";

const contractParams = {
  addressOrName: process.env.NEXT_PUBLIC_LP_REWARDS_CONTRACT_ADDRESS,
  contractInterface: LiquidityRewardsDistributor.abi,
};

export function useLiquidityRewards({ nationPrice, poolValue, address }: any) {
  const { data: totalRewards, loading: totalRewardsLoading } = useContractRead(
    contractParams,
    "totalRewards",
    {},
    false
  );
  const months = 6;

  const { data: unclaimedRewards, loading: unclaimedRewardsLoading } =
    useStaticCall({
      ...contractParams,
      methodName: "claimRewards",
      defaultData: transformNumber(0, NumberType.bignumber),
      throwOnRevert: false, // assumes a reverted transaction means no claimable rewards
      skip: !address,
    });

  const { data: userDeposit, loading: userDepositLoading } = useContractRead(
    contractParams,
    "userDeposit",
    {
      args: [address],
      watch: true,
      enabled: address,
    }
  );

  const { data: totalDeposit, loading: totalDepositLoading } = useContractRead(
    contractParams,
    "totalDeposit",
    {},
    false
  );

  const { data: lpTokensSupply, loading: lpTokensSupplyLoading } =
    useContractRead(
      {
        addressOrName: process.env.NEXT_PUBLIC_BALANCER_NATION_ETH_POOL_TOKEN,
        contractInterface: ERC20.abi,
      },
      "totalSupply",
      {},
      false
    );

  const { data: userBalance, loading: userBalanceLoading } = useContractRead(
    contractParams,
    "userBalance",
    {
      args: [address],
      watch: true,
      enabled: address,
    }
  );

  const [liquidityRewardsAPY, setLiquidityRewardsAPY] = useState<BigNumber>(
    transformNumber(0, NumberType.bignumber) as BigNumber
  );

  useEffect(() => {
    if (totalRewards && poolValue && totalDeposit && lpTokensSupply) {
      setLiquidityRewardsAPY(
        totalRewards
          .mul(transformNumber(12 / months, NumberType.bignumber))
          .mul(transformNumber(nationPrice, NumberType.bignumber, 2))
          .div(poolValue.mul(totalDeposit).div(lpTokensSupply))
      );
    }
  }, [
    poolValue,
    totalDeposit,
    lpTokensSupply,
    nationPrice,
    totalRewards,
    totalRewardsLoading,
    totalDepositLoading,
    lpTokensSupplyLoading,
  ]);

  return {
    liquidityRewardsAPY,
    unclaimedRewards,
    userDeposit,
    totalDeposit,
    userBalance,
    loading:
      totalRewardsLoading ||
      unclaimedRewardsLoading ||
      userDepositLoading ||
      totalDepositLoading ||
      userBalanceLoading,
  };
}

// Using Wagmi's contractWrite directly, getting a "no signer connected" error otherwise
export function useClaimRewards() {
  return useContractWrite(contractParams, "claimRewards", {
    overrides: { gasLimit: 300000 },
  });
}

export function useDeposit(amount: any) {
  return useContractWrite(contractParams, "deposit", {
    args: [amount],
    overrides: { gasLimit: 300000 },
  });
}

export function useWithdraw(amount: any) {
  return useContractWrite(contractParams, "withdraw", {
    args: [amount],
    overrides: { gasLimit: 300000 },
  });
}

export function useWithdrawAndClaim() {
  return useContractWrite(contractParams, "withdrawAndClaim", {
    overrides: { gasLimit: 300000 },
  });
}
