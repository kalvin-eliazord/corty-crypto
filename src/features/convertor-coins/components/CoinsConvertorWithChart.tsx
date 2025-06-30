
import { CoinType, Currency } from "@/shared/types/coins";
import { CoinsConvertor } from "./CoinsConvertor";
import { ConvertorChart } from "@/features/charts/components/ConvertorChart";

interface CoinsConvertorWithChartProps {
  selectedCoinId: string;
  setSelectedCoinId: (id: string) => void;
  currency: Currency;
  allCoins: CoinType[];
  randomCoinId: string;
  setRandomCoinId: (id: string) => void;
  isError: boolean;
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
  isError,
  isLoading,
  handleArrowsClick,
}) => {
  return (
    <section >
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
