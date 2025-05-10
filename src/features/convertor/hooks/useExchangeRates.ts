import { FetchStatus } from "@/features/coins/types/coinTypes";
import { fetchCoinData } from "@/shared/services/fetchCoinData";
import getError from "@/shared/utils/getError";
import { useState, useEffect } from "react";
import { CurrencyInfo } from "../types/exchangeRate";

type Rates = {
    [key: string]: CurrencyInfo;
  };

export const useExchangeRates = () => {
  const [status, setStatus] = useState<FetchStatus>("pending");
  const [error, setError] = useState<string | null>(null);
  const [exchangeRates, setExchangeRates] = useState<Rates>({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const { data } = await fetchCoinData("/exchange_rates");
        console.log("data:",data)
        setExchangeRates(data.rates);
        setStatus("fulfilled");
      } catch (error) {
        const message = getError(error);
        console.error(message);
        setError(message);
        setStatus("rejected");
      }
    };

    fetchExchangeRates();
  }, []);

  return { exchangeRates, status, error };
};
