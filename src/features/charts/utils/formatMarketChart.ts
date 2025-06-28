import { format } from "date-fns";
import { PricesChart, PricesCharts, TimeAndAmount } from "../types/charts";

export const formatMarketChart = (
  allTimeAndAmounts: TimeAndAmount[] = []
): PricesChart[] | null => {
  if (allTimeAndAmounts.length === 0) return null;

  return allTimeAndAmounts.slice(-30).map(([timestamp, amount]) => ({
    day: format(new Date(timestamp), "dd"),
    amount,
  }));
};

export const formatMarketCharts = (
  coinTimeAmounts: TimeAndAmount[] | undefined ,
  currencyTimeAmounts: TimeAndAmount[] | undefined
): PricesCharts[] | null => {
  if (!coinTimeAmounts || coinTimeAmounts.length === 0 || !currencyTimeAmounts || currencyTimeAmounts.length === 0)
    return null;

  return coinTimeAmounts.map(([timestamp, coinAmount], i) => ({
    day: format(new Date(timestamp), "dd"),
    coinAmount,
    currencyAmount: currencyTimeAmounts[i][1],
  }));
};

