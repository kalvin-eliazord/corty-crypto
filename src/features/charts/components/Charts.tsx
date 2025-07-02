import { PriceChart } from "@/features/charts/components/PriceChart";
import { VolumeChart } from "@/features/charts/components/VolumeChart";
import { CoinType, Currency } from "@/shared/types/coins";
import { useSmartQuery } from "@/shared/hooks/useSmartQuery";
import { fetchApiClient } from "@/shared/utils/fetchApiClient";
import { MarketCharts } from "../types/charts";
import { AlertError } from "@/shared/components/AlertError";
import { ChartsSkeleton } from "./ChartsSkeleton";

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

  if (
    isLoadingSelected ||
    (comparedCoin && isLoadingCompared) ||
    isErrorSelected ||
    !selectedCoinData
  ) {
    return (
      <>
        <ChartsSkeleton />
        {isErrorSelected && (
          <AlertError
            errorName={"Charts (selected coin)"}
            networkError={errorSelected}
            refetch={refetchSelected}
          />
        )}

        {comparedCoin &&
          (!isErrorCompared ||
            (!comparedCoinData && (
              <AlertError
                errorName={"Charts (compared coin)"}
                networkError={errorCompared}
                refetch={refetchCompared}
              />
            )))}
      </>
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
