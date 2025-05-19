import { useEffect, useState } from "react";
import { CoinType } from "../../coins/types/coinTypes";

export const useChunks = (allCoins: CoinType[], chunkSize: number) => {
  const [chunks, setChunks] = useState<CoinType[][]>([]);
  const [partIndex, setPartIndex] = useState(0);

  useEffect(() => {
    const newChunks: CoinType[][] = [];
    for (let i = 0; i < allCoins.length; i += chunkSize) {
      newChunks.push(allCoins.slice(i, i + chunkSize));
    }
    setChunks(newChunks);
  }, [allCoins, chunkSize]);

  const loadNextChunk = () => {
    setPartIndex((prev) => (prev < chunks.length - 1 ? prev + 1 : prev));
  };

  return {
    displayedCoins: chunks.slice(0, partIndex + 1).flat(),
    hasMore: partIndex < chunks.length - 1,
    loadNextChunk,
  };
};
