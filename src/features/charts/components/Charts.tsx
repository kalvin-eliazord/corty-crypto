import { useCoinCharts } from "../hooks/useCoinCharts";
import { PriceChart } from "@/features/charts/components/PriceChart";
import { VolumeChart } from "@/features/charts/components/VolumeChart";
import { CoinType, CurrencyInfo } from "@/shared/types/coinTypes";

type ChartsProps = {
  coinId: string;
  currencyInfo: CurrencyInfo;
  coin: CoinType | undefined;
};

export const Charts: React.FC<ChartsProps> = ({
  coinId,
  currencyInfo,
  coin,
}) => {
  const { data, status, error } = useCoinCharts(coinId);
  return (
    <div className="flex gap-x-4 rounded-xl p-6 shadow-lg dark:bg-slate-800">
      <PriceChart
        data={data}
        status={status}
        error={error}
        coin={coin}
        currencyInfo={currencyInfo}
      />
      <VolumeChart
        data={data}
        status={status}
        error={error}
        currencyInfo={currencyInfo}
      />
    </div>
  );
};