import { Skeleton } from "@/components/ui/skeleton";
import { PriceChart } from "@/features/charts/components/PriceChart";
import { VolumeChart } from "@/features/charts/components/VolumeChart";
import { CoinType, Currency } from "@/shared/types/coins";
import { useSmartQuery } from "@/shared/hooks/useSmartQuery";
import { fetchApiClient } from "@/shared/utils/fetchApiClient";
import { MarketCharts } from "../types/charts";
import { AlertError } from "@/shared/components/AlertError";

type ChartsProps = {
  currency: Currency;
  selectedCoin: CoinType | undefined;
  comparedCoin?: CoinType | undefined | null;
};

export const Charts: React.FC<ChartsProps> = ({
  currency,
  selectedCoin,
  comparedCoin,
}) => {

  const selectedCoinUrl =
    currency.code && selectedCoin
      ? `coins/${selectedCoin.id}/market_chart?vs_currency=${currency.code}&days=180&interval=daily`
      : "";

  const comparedCoinUrl =
    currency.code && comparedCoin
      ? `coins/${comparedCoin.id}/market_chart?vs_currency=${currency.code}&days=180&interval=daily`
      : "";

  const {
    data: selectedCoinData,
    isError: isErrorSelected,
    isLoading: isLoadingSelected,
    error: errorSelected,
    refetch: refetchSelected,
  } = useSmartQuery({
    queryKey: ["chartData", selectedCoinUrl],
    queryFn: () => fetchApiClient<MarketCharts>(selectedCoinUrl),
    enabled: !!selectedCoinUrl,
  });

  const {
    data: comparedCoinData,
    isError: isErrorCompared,
    isLoading: isLoadingCompared,
    error: errorCompared,
    refetch: refetchCompared,
  } = useSmartQuery({
    queryKey: ["chartData", comparedCoinUrl],
    queryFn: () => fetchApiClient<MarketCharts>(comparedCoinUrl),
    enabled: !!comparedCoinUrl,
  });

  if (isLoadingSelected || (comparedCoin && isLoadingCompared)) {
    return (
      <div className="flex flex-col flex-1 md:flex-row gap-8 w-full">
        <div className="flex-1 dark:bg-[#1F1D2280] p-5 rounded-xl border-t border-l border-r">
          <Skeleton className="h-50 w-full rounded" />
        </div>
        <div className="flex-1 dark:bg-[#1F1D2280] p-5 rounded-xl border-t border-l border-r">
          <Skeleton className="h-50 w-full rounded" />
        </div>
      </div>
    );
  }

  if (isErrorSelected || !selectedCoinData) {
    return (
      <AlertError
        errorName={"Charts (selected coin)"}
        networkError={errorSelected}
        refetch={refetchSelected}
      />
    );
  }

  if (comparedCoin && (isErrorCompared || !comparedCoinData)) {
    return (
      <AlertError
        errorName={"Charts (compared coin)"}
        networkError={errorCompared}
        refetch={refetchCompared}
      />
    );
  }

  return (
    <section
      className="flex flex-col lg:flex-row gap-8 w-full"
      aria-labelledby="chart-heading"
    >
      <h2 id="chart-heading" className="sr-only">
        Price and volume charts
      </h2>
      <PriceChart
        selectedCoinData={selectedCoinData}
        selectedCoin={selectedCoin}
        comparedCoinData={comparedCoinData}
        comparedCoin={comparedCoin}
        currency={currency}
      />
      <VolumeChart
        selectedCoinData={selectedCoinData}
        comparedCoinData={comparedCoinData}
        currency={currency}
      />
    </section>
  );
};
