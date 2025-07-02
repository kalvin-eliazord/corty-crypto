import { format } from "date-fns";
import { formatAmountUnit } from "@/shared/utils/formatAmount";
import { CoinType, Currency } from "@/shared/types/coins";
import { CoinLabel } from "./CoinLabel";

type HeaderProps = {
  name?: string | undefined;
  selectedCoinMainValueChart: number | null;
  comparedCoinDataMainValueChart: number | null;
  currency: Currency;
  selectedCoin?: CoinType;
  comparedCoin?: CoinType | null;
};

export const HeaderChart: React.FC<HeaderProps> = ({
  name,
  selectedCoinMainValueChart,
  comparedCoinDataMainValueChart,
  currency,
  selectedCoin,
  comparedCoin,
}) => {
  const todayDate = format(new Date(), "MMMM d, yyyy");

  const mainCoinMarketChart = formatAmountUnit(selectedCoinMainValueChart || 0);
  const secondCoinMarketChart = comparedCoinDataMainValueChart
    ? formatAmountUnit(comparedCoinDataMainValueChart)
    : null;

  return (
    <div>
      <div className="flex gap-4 mb-6 items-center">
        {selectedCoin && <CoinLabel coin={selectedCoin} />}

        {comparedCoin && <CoinLabel coin={comparedCoin} />}

        {!selectedCoin && name && (
          <h1 className="text-white/70 dark:text-[#B9B8BB] text-xl">{name}</h1>
        )}
      </div>

      <h2 className="text-white font-medium text-2xl">
        {currency.symbol} {mainCoinMarketChart}
        {secondCoinMarketChart && ` - ${secondCoinMarketChart}`}
      </h2>

      <p className="text-white/70 dark:text-[#B9B8BB]">{todayDate}</p>
    </div>
  );
};
