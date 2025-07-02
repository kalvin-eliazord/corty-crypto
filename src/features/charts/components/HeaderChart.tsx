import { format } from "date-fns";
import { formatAmountUnit } from "@/shared/utils/formatAmount";
import { CoinType, Currency } from "@/shared/types/coins";
import { CoinIcon } from "@/shared/components/CoinIcon";

type HeaderProps = {
  name: string | undefined;
  marketChart: number | undefined;
  currency: Currency;
  selectedCoin?: CoinType | undefined;
};

export const HeaderChart: React.FC<HeaderProps> = ({
  name,
  marketChart,
  currency,
  selectedCoin,
}) => {
  const todayDate = format(new Date(), "MMMM d, yyyy");
  const formattedMarketChart = formatAmountUnit(marketChart || 0);

  return (
    <div>
      {selectedCoin ? (
        <div className="flex gap-4 mb-6">
          <CoinIcon
            id={selectedCoin.id}
            image={selectedCoin.image}
            tailwindSize={"w-8 h-8"}
          />
          <h1 className="text-white/70 dark:text-[#B9B8BB] text-xl ">{name}</h1>
        </div>
      ) : (
        <h1 className="text-white/70 dark:text-[#B9B8BB] text-xl mb-7.5">
          {name}
        </h1>
      )}

      <h2 className="text-white font-medium text-2xl">{`${currency.symbol} 
      ${formattedMarketChart} `}</h2>
      <p className="text-white/70 dark:text-[#B9B8BB]">{todayDate}</p>
    </div>
  );
};
