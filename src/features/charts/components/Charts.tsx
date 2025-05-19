import { useCoinCharts } from "../hooks/useCoinCharts";
import { PriceChart } from "@/features/charts/components/PriceChart";
import { VolumeChart } from "@/features/charts/components/VolumeChart";
import { CurrencyInfo } from "@/features/currency-selector/types/currencyInfo";
import { CoinType } from "@/shared/types/coinTypes";

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
    <div className="flex flex-col flex-1 md:flex-row gap-8  w-full">
      <div className="flex-1 dark:bg-[#1F1D2280] p-5 rounded-xl border border-[#584C55] ">
        <PriceChart
          data={data}
          status={status}
          error={error}
          coin={coin}
          currencyInfo={currencyInfo}
        />
      </div>

      <div className="flex-1 dark:bg-[#1F1D2280] rounded-xl p-5 border border-[#584C55] ">
        <VolumeChart
          data={data}
          status={status}
          error={error}
          currencyInfo={currencyInfo}
        />
      </div>
    </div>
  );
};
