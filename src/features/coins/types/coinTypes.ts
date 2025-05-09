export type FetchStatus = "pending" | "fulfilled" | "rejected";

export type CoinsState = {
  allCoins: CoinType[];
  status: FetchStatus;
  error: string | undefined | null;
};

export type CoinType = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  sparkline_in_7d: {
    price: number[];
  };
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
};

export type CoinsSliderProps = {
  coinId: string;
  setCoinId(coinId: string): void;
  allCoins: CoinType[];
  status: FetchStatus;
  error: string | null | undefined;
};

export type TimeAndAmount = [number, number];

export type MarketCharts = {
  prices: TimeAndAmount[];
  market_caps: TimeAndAmount[];
  total_volumes: TimeAndAmount[];
};

export type ChartProps = {
  data: MarketCharts | undefined;
  status: string;
  error: string | null | undefined;
};

export type HeaderProps = {
  name: string;
  marketChart: MarketChart;
};

export type MarketChart = {
  day: string;
  amount: number;
};
