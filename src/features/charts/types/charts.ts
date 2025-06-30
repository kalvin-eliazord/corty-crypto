import { CoinType, Currency } from "@/shared/types/coins";

export type TimeAndAmount = [number, number];

export type MarketCharts = {
  prices: TimeAndAmount[];
  market_caps: TimeAndAmount[];
  total_volumes: TimeAndAmount[];
};

export type ChartProps = {
  data: MarketCharts | null;
  currency: Currency;
  selectedCoin?: CoinType | undefined;
};

export type PricesChart = {
  day: string;
  amount: number;
};

export type PricesCharts = {
  day: string;
  coinAmount: number;
  currencyAmount: number;
};
