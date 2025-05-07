import { useState, useEffect } from "react";
import { fetchCoinData } from "../services/fetchCoinData";
import { FetchStatus, MarketCharts } from "../types/coinTypes";
import getError from "@/shared/utils/getError";

export const useCoinMarket = (coinId: string) => {
  const [status, setStatus] = useState<FetchStatus>("pending");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MarketCharts>();

  useEffect(() => {
    const getCoinMarket = async () => {
      try {
        const { data } = await fetchCoinData(
          "/coins/" +
            coinId +
            "/market_chart?vs_currency=usd&days=180&interval=daily"
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

    getCoinMarket();
  }, []);

  return { data, status, error };
};
