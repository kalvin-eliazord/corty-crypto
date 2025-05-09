import { useCoinChart } from "../hooks/useCoinChart";
import { PriceChart } from "@/features/coins/components/PriceChart";
import { VolumeChart } from "@/features/coins/components/VolumeChart";

export const Charts = ({ coinId }: { coinId: string }) => {
  const { data, status, error } = useCoinChart(coinId);
  return (
    <div className="flex gap-x-4 rounded-xl p-6 shadow-lg dark:bg-slate-800">
      <PriceChart data={data} status={status} error={error}></PriceChart>
      <VolumeChart data={data} status={status} error={error}></VolumeChart>
    </div>
  );
};
