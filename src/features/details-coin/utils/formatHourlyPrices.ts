import { PricesChart } from "@/features/charts/types/charts";
import { subDays } from "date-fns";
import { format } from "date-fns/format";

export const formatHourlyPrices = (
  hourlyPrices: number[] | undefined
): PricesChart[] | null => {
  if (!hourlyPrices || hourlyPrices.length !== 168) return null;

  const dailyAverages = [];

  for (let day = 0; day < 7; day++) {
    const start = day * 24;
    const end = start + 24;

    const daySlice = hourlyPrices.slice(start, end);
    const sum = daySlice.reduce((acc, curr) => acc + curr, 0);
    const average = sum / 24;

    const date = subDays(new Date(), 6 - day);

    dailyAverages.push({
      day: format(date, "dd/MM"),
      amount: average,
    });
  }

  return dailyAverages;
};
