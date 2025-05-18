import { CoinType } from "../../../shared/types/coinTypes";

export const getAllChunksCoins = (allCoins: CoinType[]): CoinType[][] => {
  if (!allCoins || allCoins.length < 1) return [];

  const chunkSize = 10;
  const allChunksCoins = [];

  for (let i = 0; i < allCoins.length; i += chunkSize) {
    allChunksCoins.push(allCoins.slice(i, i + chunkSize));
  }
  
  return allChunksCoins;
};
