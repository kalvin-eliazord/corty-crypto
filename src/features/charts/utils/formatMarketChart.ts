import { format } from "date-fns";
import { TimeAndAmount } from "../types/charts";

export const formatMarketChart = (allTimeAndAmounts: TimeAndAmount[] = []) => {
  if (allTimeAndAmounts.length === 0) return [];

  return allTimeAndAmounts.slice(-30).map(([timestamp, amount]) => ({
    day: format(new Date(timestamp), "dd"),
    amount: parseFloat(amount.toFixed(2)),
  }));
};
