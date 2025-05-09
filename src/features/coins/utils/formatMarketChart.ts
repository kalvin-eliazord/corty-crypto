import { format } from "date-fns";
import { MarketChart, TimeAndAmount } from "../types/coinTypes";

export const formatMarketChart = (
  allTimeAndAmounts: TimeAndAmount[]
): MarketChart[] => {
  if (!allTimeAndAmounts) return [];

  return allTimeAndAmounts.slice(90).map(([timestamp, amount]) => ({
    day: format(new Date(timestamp), "dd"),
    amount,
  }));
};
