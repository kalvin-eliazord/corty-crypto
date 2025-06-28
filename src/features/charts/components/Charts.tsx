import { CurrencyInfo } from "@/features/convertor/types/currency";
import { useCoinCharts } from "../hooks/useCoinChart";
import { CoinType } from "@/features/coins/types/coinTypes";
import { PriceChart } from "./PriceChart";
import { VolumeChart } from "./VolumeChart";

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