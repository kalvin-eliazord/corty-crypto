import { FetchStatus } from "@/features/coins/types/coinTypes";
import { fetchCoinData } from "@/shared/services/fetchCoinData";
import getError from "@/shared/utils/getError";
import { useState, useEffect } from "react";

export const useFetchCoinData = <T>(url: string) => {
  const [status, setStatus] = useState<FetchStatus>("pending");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const getCoinData = async () => {
      try {
        const { data } = await fetchCoinData(url);
        setData(data);
        setStatus("fulfilled");
      } catch (error) {
        const message = getError(error);
        console.error(message);
        setError(message);
        setStatus("rejected");
      }
    };

    getCoinData();
  }, [url]);

  return { data, status, error };
};
