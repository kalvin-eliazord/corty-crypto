import { CoinType, Currency } from "@/shared/types/coins";

export type TimeAndAmount = [number, number];

export type MarketCharts = {
  prices: TimeAndAmount[];
  market_caps: TimeAndAmount[];
  total_volumes: TimeAndAmount[];
  currency: Currency;
};

export type ChartProps = {
  data: MarketCharts | undefined;
  currency: Currency;
  coin?: CoinType;
};

export type MarketChart = {
  day: string;
  amount: number;
};
