import { CoinType, Currency } from "@/shared/types/coins";

export type TimeAndAmount = [number, number];

export type MarketCharts = {
  prices: TimeAndAmount[];
  market_caps: TimeAndAmount[];
  total_volumes: TimeAndAmount[];
};

export type ChartProps = {
  selectedCoinData: MarketCharts | null;
  comparedCoinData?: MarketCharts | null;
  currency: Currency;
  selectedCoin?: CoinType | undefined;
  comparedCoin?: CoinType | null;
};

export type PricesChart = {
  day: string;
  amount: number | null;
};

export type PricesCharts = {
  day: string;
  coinAmount: number;
  currencyAmount: number;
};
