import { BarChart, Bar, XAxis } from "recharts";
import { ChartProps } from "../types/coinTypes";
import { HeaderChart } from "./HeaderChart";
import { formatMarketChart } from "../utils/formatMarketChart";

export const VolumeChart: React.FC<ChartProps> = ({
  data,
  status,
  error,
  currencyInfo,
}) => {
  if (status === "rejected" && error) {
    return <>Error : {error}</>;
  }

  if (status === "pending") {
    return <> Volumes loading </>;
  }

  const total_volumes = data && formatMarketChart(data.total_volumes);

  return (
    <div>
      {total_volumes && (
        <HeaderChart
          name={"Volume 24h"}
          marketChart={total_volumes[total_volumes.length - 1]}
          currencyInfo={currencyInfo}
        />
      )}
      <BarChart width={790} height={420} data={total_volumes} barSize={10}>
        <XAxis dataKey="day" padding={{ left: 20, right: 20 }} />

        <Bar dataKey="amount" fill="lightblue" />
      </BarChart>
    </div>
  );
};

// useCoinChart.tsx -> useCoinCharts.ts

import { useState, useEffect } from "react";
import { fetchCoinData } from "../../../shared/services/fetchCoinData";
import { FetchStatus, MarketCharts } from "../types/coinTypes";
import getError from "@/shared/utils/getError";

export const useCoinChart = (coinId: string) => {
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