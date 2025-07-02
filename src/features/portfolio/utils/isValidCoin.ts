import { CoinType } from "@/shared/types/coins";

export const isValidCoin = (asset: Partial<CoinType>): asset is CoinType => {
  if (!asset) return false;

  return (
    typeof asset.name === "string" &&
    typeof asset.symbol === "string" &&
    typeof asset.current_price === "number"
  );
};
