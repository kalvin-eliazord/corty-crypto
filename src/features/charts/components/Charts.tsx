import { Skeleton } from "@/components/ui/skeleton";
import { PriceChart } from "@/features/charts/components/PriceChart";
import { VolumeChart } from "@/features/charts/components/VolumeChart";
import { CoinType, Currency } from "@/shared/types/coins";
import { useSmartQuery } from "@/shared/hooks/useSmartQuery";
import { fetchApiClient } from "@/shared/utils/fetchApiClient";
import { MarketCharts } from "../types/charts";
import { AlertError } from "@/shared/components/AlertError";

type ChartsProps = {
  coinId: string;
  currency: Currency;
  selectedCoin: CoinType | undefined;
  setCoinId: (coinId: string) => void;
};

export const Charts: React.FC<ChartsProps> = ({
  coinId,
  currency,
  selectedCoin,
}) => {
  const url =
    currency.code && coinId
      ? `coins/${coinId}/market_chart?vs_currency=${currency.code}&days=180&interval=daily`
      : "";

  const { data, isError, isLoading, error, refetch } = useSmartQuery({
    queryKey: ["homeCoinChart", url],
    queryFn: () => fetchApiClient<MarketCharts>(url),
    enabled: !!url,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 md:flex-row gap-8  w-full">
        <div className="flex-1 dark:bg-[#1F1D2280] p-5 rounded-xl border-t border-l border-r  ">
          <Skeleton className="h-50 w-full rounded" />
        </div>

        <div className="flex-1 dark:bg-[#1F1D2280] p-5 rounded-xl border-t border-l border-r  ">
          <Skeleton className="h-50 w-full rounded" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <AlertError errorName={"Charts"} networkError={error} refetch={refetch} />
    );
  }

  return (
    <section
      className="flex flex-col  md:flex-row gap-8 w-full "
      aria-labelledby="chart-heading"
    >
      <h2 id="chart-heading" className="sr-only">
        Price and volume charts
      </h2>
      <div className=" dark:bg-[#1F1D2280] bg-white/15 p-5 rounded-xl border-t border-l border-r border-white/40 dark:border-white/10  w-full shadow-xl" >
        <PriceChart
          data={data}
          selectedCoin={selectedCoin}
          currency={currency}
        />
      </div>

      <div className=" dark:bg-[#1F1D2280] bg-white/15 rounded-xl p-5 border-t border-l border-r border-white/40 dark:border-white/10 shadow-xl w-full">
        <VolumeChart data={data} currency={currency} />
      </div>
    </section>
  );
};
