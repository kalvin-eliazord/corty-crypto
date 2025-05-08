import { CoinType } from "../types/coinTypes";

export const getAllPartsCoins = (
  allCoins: CoinType[],
  maxParts: number
): CoinType[][] => {
  const allPartsCoins = [];
  const chunkSize = 10;

  for (let i = 0; i < maxParts; i += chunkSize) {
    allPartsCoins.push(allCoins.slice(i, i + chunkSize));
  }

  return allPartsCoins;
};