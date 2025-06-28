import { formatAmount, formatAmountUnit } from "@/shared/utils/formatAmount";
import { Currency } from "@/shared/types/coins";
import { Cryptocurrency } from "../types/detailsCoins";

export const formatHeadersData = (
  data: Cryptocurrency | null,
  currency: Currency
): { [key: string]: string | null } => {
  if (!data) {
    console.warn("Cannot format data headers, data incorrect.");

    return {
      ["Market Cap"]: null,
      ["Fully Diluted Valuation"]: null,
      ["Volume 24h"]: null,
      ["Volume / Market"]: null,
      ["Total Volume"]: null,
      ["Circulating Supply"]: null,
      ["Max Supply"]: null,
    };
  }

  return {
    ["Market Cap"]: `${currency.symbol}${formatAmountUnit(
      data.market_data.market_cap[currency.code]
    )}`,
    ["Fully Diluted Valuation"]: data.market_data
      .price_change_percentage_1h_in_currency[currency.code]
      ? `${
          data.market_data.price_change_percentage_1h_in_currency[currency.code]
        }`
      : null,
    ["Volume 24h"]: data.market_data.fully_diluted_valuation[currency.code]
      ? `${currency.symbol}${formatAmountUnit(
          data.market_data.fully_diluted_valuation[currency.code]
        )}`
      : null,
    ["Volume / Market"]: data.market_data.high_24h[currency.code]
      ? `${data.market_data.high_24h[currency.code]}`
      : null,
    ["Total Volume"]: data.market_data.total_volume[currency.code]
      ? `${formatAmount(data.market_data.total_volume[currency.code])}`
      : null,
    ["Circulating Supply"]: data.market_data.circulating_supply
      ? `${data.market_data.circulating_supply}`
      : null,
    ["Max Supply"]: data.market_data.max_supply
      ? `${data.market_data.max_supply}`
      : null,
  };
};