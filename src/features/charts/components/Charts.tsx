import { Skeleton } from "@/components/ui/skeleton";
import { useCoinCharts } from "../hooks/useCoinCharts";
import { PriceChart } from "@/features/charts/components/PriceChart";
import { VolumeChart } from "@/features/charts/components/VolumeChart";
import { CoinType, Currency } from "@/shared/types/coins";

type ChartsProps = {
  coinId: string;
  currency: Currency;
  coin: CoinType | undefined;
};

export const Charts: React.FC<ChartsProps> = ({ coinId, currency, coin }) => {
  const { data, status, error } = useCoinCharts(coinId, currency.code);

  if (status === "rejected") {
    return (
      <div className=" w-full text-center rounded-xl border-t border-l border-r">
        <div className="flex-1 dark:bg-[#1F1D2280] p-5   ">
          Charts fetching rejected : {error}. Click to retry.
        </div>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 md:flex-row gap-8  w-full">
        <div className="flex-1 dark:bg-[#1F1D2280] p-5 rounded-xl border-t border-l border-r  ">
          <Skeleton className="h-16 w-full rounded" />
        </div>

        <div className="flex-1 dark:bg-[#1F1D2280] p-5 rounded-xl border-t border-l border-r  ">
          <Skeleton className="h-16 w-full rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 md:flex-row gap-8  w-full">
      <div className="flex-1 dark:bg-[#1F1D2280] p-5 rounded-xl border-t border-l border-r  ">
        <PriceChart data={data} coin={coin} currency={currency} />
      </div>

      <div className="flex-1 dark:bg-[#1F1D2280] rounded-xl p-5 border-t border-l border-r ">
        <VolumeChart data={data} currency={currency} />
      </div>
    </div>
  );
};
