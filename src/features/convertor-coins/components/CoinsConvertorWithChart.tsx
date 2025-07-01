import { CoinType, Currency } from "@/shared/types/coins";
import { CoinsConvertor } from "./CoinsConvertor";
import { ConvertorChart } from "@/features/charts/components/ConvertorChart";
import { AlertError } from "@/shared/components/AlertError";
import { ErrorResponse } from "@/shared/types/error";

interface CoinsConvertorWithChartProps {
  selectedCoinId: string;
  setSelectedCoinId: (id: string) => void;
  currency: Currency;
  allCoins: CoinType[];
  randomCoinId: string;
  setRandomCoinId: (id: string) => void;
  errorResponse: ErrorResponse;
  isLoading: boolean;
  handleArrowsClick: () => void;
}

const CoinsConvertorWithChart: React.FC<CoinsConvertorWithChartProps> = ({
  selectedCoinId,
  setSelectedCoinId,
  currency,
  allCoins,
  randomCoinId,
  setRandomCoinId,
  errorResponse,
  isLoading,
  handleArrowsClick,
}) => {
  const { isError, refetch, error } = errorResponse;

  if (isError || !allCoins || allCoins.length === 0) {
    return (
      <AlertError
        errorName={"Coins Convert and Chart"}
        networkError={error}
        refetch={refetch}
      />
    );
  }

  return (
    <section className="flex flex-col gap-40 z-20">
      <CoinsConvertor
        selectedCoinId={selectedCoinId}
        setSelectedCoinId={setSelectedCoinId}
        currency={currency}
        allCoins={allCoins}
        randomCoinId={randomCoinId}
        setRandomCoinId={setRandomCoinId}
        isError={isError}
        isLoading={isLoading}
        handleArrowsClick={handleArrowsClick}
      />
      <ConvertorChart
        selectedCoinId={selectedCoinId}
        currency={currency}
        allCoins={allCoins}
        randomCoinId={randomCoinId}
      />
    </section>
  );
};

export default CoinsConvertorWithChart;
