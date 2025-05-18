import { CoinType, CurrencyInfo } from "@/shared/types/coinTypes";

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
