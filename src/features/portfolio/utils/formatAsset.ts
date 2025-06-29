import { Asset, FinalizedAsset } from "../types/portfolio";

export const formatAsset = (pricesPerDate: Asset[]): FinalizedAsset => {
  return pricesPerDate.reduce((acc, asset) => {
    if (!acc[asset.id]) {
      acc[asset.id] = {
        amount: asset.amount,
        date: asset.date,
        totalCost: asset.totalCost ?? asset.amount,
      };
    } else {
      acc[asset.id].amount += asset.amount;
      acc[asset.id].totalCost += asset?.totalCost ?? acc[asset.id].amount;
    }
    return acc;
  }, {} as FinalizedAsset);
};