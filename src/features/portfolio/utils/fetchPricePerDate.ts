import apiClient from "@/shared/utils/apiClient";
import { PricePerDateAsset, PortfolioType } from "../types/portfolio";
import { CoinType } from "@/shared/types/coins";

export const fetchPricePerDate = async (
  portfolio: PortfolioType,
  currencyCode: string,
  allCoins: CoinType[] | undefined
): Promise<PricePerDateAsset[]> => {
  if (!allCoins) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return await Promise.all(
    portfolio.map(async (asset) => {
      try {
        const coinData = allCoins.find((c) => c.id === asset.id);

        const assetDate = new Date(asset.date.split("-").reverse().join("-"));
        if (assetDate >= today) {
          return {
            id: asset.id,
            amount: Number(asset.amount),
            date: asset.date,
            totalCost: asset.amount * (coinData?.current_price ?? 0),
            ...coinData,
          };
        }

        const { data } = await apiClient.get(
          `coins/${asset.id}/history?date=${asset.date}`
        );
        const previousPrice =
          data?.market_data?.current_price?.[currencyCode.toLowerCase()] ??
          coinData?.current_price ??
          0;

        return {
          id: asset.id,
          amount: Number(asset.amount),
          date: asset.date,
          totalCost: asset.amount * previousPrice,
          ...coinData,
        };
      } catch (error) {
        console.warn(`Failed to fetch history for ${asset.id}`, error);

        throw error;
      }
    })
  );
};
