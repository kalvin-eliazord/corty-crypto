import { format } from "date-fns";
import { PricesChart, PricesCharts, TimeAndAmount } from "../types/charts";

export const formatMarketChart = (
  allTimeAndAmounts: TimeAndAmount[] = []
): PricesChart[] => {
  if (allTimeAndAmounts.length === 0) return [];

  return allTimeAndAmounts.slice(-30).map(([timestamp, amount]) => ({
    day: format(new Date(timestamp), "dd"),
    amount,
  }));
};

export const formatMarketCharts = (
  coinTimeAmounts: TimeAndAmount[] | undefined,
  currencyTimeAmounts: TimeAndAmount[] | undefined
): PricesCharts[] => {
  if (
    !coinTimeAmounts ||
    coinTimeAmounts.length === 0 ||
    !currencyTimeAmounts ||
    currencyTimeAmounts.length === 0
  )
    return [];

  return coinTimeAmounts.map(([timestamp, coinAmount], i) => ({
    day: format(new Date(timestamp), "dd"),
    coinAmount,
    currencyAmount: currencyTimeAmounts[i][1],
  }));
};
