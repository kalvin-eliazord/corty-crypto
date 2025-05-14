import { useCoinChart } from "../hooks/useCoinChart";
import { PriceChart } from "@/features/coins/components/PriceChart";
import { VolumeChart } from "@/features/coins/components/VolumeChart";
import { CurrencyInfo } from "@/features/convertor/types/currency";
import { CoinType } from "../types/coinTypes";

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
  const { data, status, error } = useCoinChart(coinId);
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
