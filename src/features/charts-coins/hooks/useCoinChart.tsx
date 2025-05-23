import { useState, useEffect } from "react";
import { fetchCoinData } from "../../../shared/services/fetchCoinData";
import getError from "@/shared/utils/getError";
import { MarketCharts } from "../types/charts";
import { FetchStatus } from "@/features/coins/types/coinTypes";

export const useCoinCharts = (coinId: string) => {
  const [status, setStatus] = useState<FetchStatus>("pending");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MarketCharts>();

  useEffect(() => {
    const getCoinChart = async () => {
      try {
        const { data } = await fetchCoinData(
          "/coins/" +
            coinId +
            "/market_chart?vs_currency=btc&days=180&interval=daily"
        );
        setData(data);
        setStatus("fulfilled");
      } catch (error) {
        const message = getError(error);
        console.error(message);
        setError(message);
        setStatus("rejected");
      }
    };

    getCoinChart();
  }, [coinId]);

  return { data, status, error };
};