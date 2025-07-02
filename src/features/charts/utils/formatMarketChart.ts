import { format } from "date-fns";
import { TimeAndAmount } from "../types/charts";

export const formatMarketChart = (
  firstCoinSet: TimeAndAmount[] = [],
  comparedCoinSet?: TimeAndAmount[]
) => {
  if (!firstCoinSet || firstCoinSet.length === 0) return [];

  return firstCoinSet.slice(-30).map(([timestamp, amount], i) => {
    const day = format(new Date(timestamp), "dd");
    const firstAmount = parseFloat(amount.toFixed(2));
    const comparedAmount = comparedCoinSet?.[i]?.[1];

    return {
      day,
      firstAmount,
      comparedAmount: comparedAmount
        ? parseFloat(comparedAmount.toFixed(2))
        : 0,
    };
  });
};
