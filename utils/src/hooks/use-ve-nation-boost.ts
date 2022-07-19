import { NumberType, transformNumber } from "../numbers";
import { useEffect, useState } from "react";

// userDeposit = amount of LP tokens staked by user
// totalDeposit = amount of LP tokens in rewards contract
// userVotingPower = veNationBalance
// totalVotingPower = veNATION supply
export function useVeNationBoost({
  userDeposit,
  totalDeposit,
  userVeNation,
  totalVeNation,
  userBalance,
}: any) {
  const [boost, setBoost] = useState<any>({
    canBoost: false,
  });
  useEffect(() => {
    if (
      userDeposit &&
      totalDeposit &&
      userVeNation &&
      totalVeNation &&
      userBalance
    ) {
      const n = {
        userDeposit: parseFloat(
          transformNumber(userDeposit, NumberType.string) as string
        ),
        totalDeposit: parseFloat(
          transformNumber(totalDeposit, NumberType.string) as string
        ),
        userVeNation: parseFloat(
          transformNumber(userVeNation, NumberType.string) as string
        ),
        totalVeNation: parseFloat(
          transformNumber(totalVeNation, NumberType.string) as string
        ),
        userBalance: parseFloat(
          transformNumber(userBalance, NumberType.string) as string
        ),
      };

      const baseBalance = n.userDeposit * 0.4;

      let boostedBalance =
        baseBalance +
        ((n.totalDeposit * n.userVeNation) / n.totalVeNation) * (60 / 100);

      boostedBalance = Math.min(boostedBalance, n.userDeposit);

      const potentialBoost = boostedBalance / baseBalance;

      boostedBalance = Math.min(boostedBalance, n.userDeposit);

      const currentBoost = n.userBalance / baseBalance;

      setBoost({
        currentBoost: transformNumber(
          Math.max(currentBoost, 1),
          NumberType.bignumber
        ),
        potentialBoost: transformNumber(potentialBoost, NumberType.bignumber),
        canBoost:
          Math.trunc(potentialBoost * 10) > Math.trunc(currentBoost * 10),
      });
    }
  }, [userDeposit, totalDeposit, userVeNation, totalVeNation, userBalance]);

  return boost;
}
