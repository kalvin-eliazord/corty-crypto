import { TimeAndAmount } from "@/features/charts/types/charts";

export const getLastPrice = (
  dataList?: TimeAndAmount[] | null
): number | null => {
  if (!dataList || dataList.length === 0) return null;

  const lastEntry = dataList[dataList.length - 1];
  return lastEntry?.[1];
};
