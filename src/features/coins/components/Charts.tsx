import { useCoinChart } from "../hooks/useCoinChart";
import { PriceChart } from "@/features/coins/components/PriceChart";
import { VolumeChart } from "@/features/coins/components/VolumeChart";
import { CurrencyInfo } from "@/features/convertor/types/currency";

type ChartsProps = {
  coinId: string;
  currency: CurrencyInfo;
};

export const Charts: React.FC<ChartsProps> = ({ coinId, currency }) => {
  const { data, status, error } = useCoinChart(coinId);
  return (
    <div className="flex gap-x-4 rounded-xl p-6 shadow-lg dark:bg-slate-800">
      <PriceChart
        data={data}
        status={status}
        error={error}
        currency={currency}
      />
      <VolumeChart
        data={data}
        status={status}
        error={error}
        currency={currency}
      />
    </div>
  );
};
