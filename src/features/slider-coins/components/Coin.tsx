import { CoinIcon } from "@/shared/components/CoinIcon";
import { OneHourPercentage } from "@/shared/components/OneHourPercentage";
import { CoinType, Currency } from "@/shared/types/coins";
import { formatAmount } from "@/shared/utils/formatAmount";

type CoinProps = {
  coinId: string;
  coin: CoinType;
  setCoinId: (id: string) => void;
  currency: Currency | null;
  className: string;
};

export const Coin: React.FC<CoinProps> = ({
  coin,
  setCoinId,
  currency,
  className,
}) => {
  const color =
    coin.price_change_percentage_1h_in_currency > 0 ? "#00F5E4" : "#FF0061";

  return (
    <div className={className} onClick={() => setCoinId(coin.id)}>
      <div className="flex items-center gap-3">
        <CoinIcon id={coin.id} image={coin.image} tailwindSize={"w-8 h-8"} />
        <div className="flex-1">
          <span className="text-gray-200 font-medium">
            {coin.name} ({coin.symbol.toUpperCase()})
          </span>
          <div className="flex gap-2 dark:text-gray-400 text-gray-300">
            {formatAmount(coin.current_price)} {currency?.symbol}
            <OneHourPercentage
              percentage={coin.price_change_percentage_1h_in_currency}
              color={color}
            />
          </div>
        </div>

        <div className="flex items-center gap-1"></div>
      </div>
    </div>
  );
};