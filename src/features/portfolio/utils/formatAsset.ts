import { PricePerDateAsset, FinalizedAsset } from "../types/portfolio";

export const formatAsset = (pricesPerDate: PricePerDateAsset[]) => {
  return pricesPerDate.reduce((acc, asset) => {
    if (!acc[asset.id]) {
      acc[asset.id] = {
        ...asset,
        totalCost: asset.totalCost ?? asset.amount,
      };
    } else {
      acc[asset.id].amount += asset.amount;
      acc[asset.id].totalCost += asset?.totalCost ?? acc[asset.id].amount;
    }
    return acc;
  }, {} as FinalizedAsset);
};
