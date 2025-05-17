import { MarketInfo } from "../types/marketInfo";

export const selectMarketData = (
  data: MarketInfo | null,
  currencyCode: string
) => {
  if (!data || !data.data) {
    return {
      activeCryptos: 0,
      exchanges: 0,
      totalMarketCap: 0,
      totalVolume: 0,
      btcMarketCapPercentage: 0,
      ethMarketCapPercentage: 0,
    };
  }

  const activeCryptos = data.data.active_cryptocurrencies ?? 0;
  const exchanges = data.data.markets ?? 0;
  const totalMarketCap = data.data.total_market_cap[currencyCode] ?? 0;
  const totalVolume = data.data.total_volume?.[currencyCode] ?? 0;
  const btcMarketCapPercentage = data.data.market_cap_percentage?.["btc"] ?? 0;
  const ethMarketCapPercentage = data.data.market_cap_percentage?.["eth"] ?? 0;

  return {
    activeCryptos,
    exchanges,
    totalMarketCap,
    totalVolume,
    btcMarketCapPercentage,
    ethMarketCapPercentage,
  };
};