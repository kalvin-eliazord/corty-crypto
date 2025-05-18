import { useMemo } from "react";
import { CoinType } from "../../../shared/types/coinTypes";
import { sortCoins } from "../utils/sortCoins";

export const useSortedCoins = (
  coins: CoinType[],
  sortType: string,
  reverse: boolean
) => {
  return useMemo(
    () => sortCoins(coins, sortType, reverse),
    [coins, sortType, reverse]
  );
};
