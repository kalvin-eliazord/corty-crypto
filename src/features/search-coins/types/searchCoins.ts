export type CoinResult = {
  id: string;
  api_symbol: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

export type SearchResults = {
  coins: CoinResult[];
};
