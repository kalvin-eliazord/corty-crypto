import { CoinType } from "@/features/coins/types/coinTypes";
import { CurrencyInfo } from "@/features/convertor/types/currency";

export type TimeAndAmount = [number, number];

export type MarketCharts = {
  prices: TimeAndAmount[];
  market_caps: TimeAndAmount[];
  total_volumes: TimeAndAmount[];
  currencyInfo: CurrencyInfo;
};

export type ChartProps = {
  data: MarketCharts | undefined;
  status: string;
  error: string | null | undefined;
  currencyInfo: CurrencyInfo;
  coin?: CoinType;
};

export type MarketChart = {
  day: string;
  amount: number;
};
