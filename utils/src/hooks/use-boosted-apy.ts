import { NumberType, transformNumber } from "../numbers";
import { useState, useEffect } from "react";

export function useBoostedAPY({ defaultAPY, boostMultiplier }: any) {
  const [apy, setAPY] = useState(
    parseFloat(transformNumber(defaultAPY, NumberType.string) as string)
  );
  useEffect(() => {
    let defaultAPYasNumber = transformNumber(
      defaultAPY,
      NumberType.number
    ) as number;
    let boostMultiplierAsNumber = transformNumber(
      boostMultiplier,
      NumberType.number
    ) as number;

    if (defaultAPYasNumber != 0 && boostMultiplierAsNumber != 0) {
      setAPY(defaultAPYasNumber * boostMultiplierAsNumber);
    }
  }, [defaultAPY, boostMultiplier]);
  return apy;
}
