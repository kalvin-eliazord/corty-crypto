import { TimeAndAmount } from "@/features/charts/types/charts";
import { format } from "date-fns";

type PerfSpreadChart = {
  date: string;
  spread: number;
};

export const computePerfSpreadChart = (
  coinA: TimeAndAmount[],
  coinB: TimeAndAmount[]
): PerfSpreadChart[] => {
  if (
    !coinA ||
    !coinB ||
    coinA.length === 0 ||
    coinB.length === 0 ||
    coinA.length !== coinB.length
  ) {
    return [];
  }

  const baseA = coinA[0][1];
  const baseB = coinB[0][1];

  return coinA.map(([timestamp, priceA], i) => {
    const priceB = coinB[i][1];
    const relA = priceA / baseA;
    const relB = priceB / baseB;

    return {
      date: format(new Date(timestamp), "dd/MM"),
      spread: relA - relB,
    };
  });
};
