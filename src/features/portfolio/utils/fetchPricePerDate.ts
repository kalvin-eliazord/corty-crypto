import apiClient from "@/shared/utils/apiClient";
import { Asset, PortfolioType } from "../types/portfolio";
import { CoinType } from "@/shared/types/coins";
import axios from "axios";

export const fetchPricePerDate = async (
  portfolio: PortfolioType,
  currencyCode: string,
  allCoins: CoinType[] | undefined
): Promise<Asset[]> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return await Promise.all(
    portfolio.map(async (asset) => {
      try {
        const currentPrice =
          allCoins?.find((c) => c.id === asset.id)?.current_price ||
          Math.random() * 500000;

        const assetDate = new Date(asset.date.split("-").reverse().join("-"));
        if (assetDate >= today) {
          return {
            id: asset.id,
            amount: Number(asset.amount),
            date: asset.date,
            totalCost: asset.amount * currentPrice,
          };
        }
        const { data } = await apiClient.get(
          `coins/${asset.id}/history?date=${asset.date}`
        );
        const previousPrice =
          data?.market_data?.current_price?.[currencyCode.toLowerCase()] ??
          currentPrice;

        return {
          id: asset.id,
          amount: Number(asset.amount),
          date: asset.date,
          totalCost: asset.amount * previousPrice,
        };
      } catch (error) {
        console.warn(`Failed to fetch history for ${asset.id}`, error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 429) {
            const retryAfter = error.response.headers["retry-after"];
            throw { isRateLimit: true, retryAfter };
          } else if (error.response?.status === 404) {
            throw { isNotFound: true, message: "Resource not found" };
          }
        }
        throw error;
      }
    })
  );
};
