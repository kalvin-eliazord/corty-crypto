import { useMemo } from "react";
import { CoinType } from "../types/coinTypes";
import { sortCoins } from "../types/sortCoins";

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
