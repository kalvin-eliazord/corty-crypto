import { convertAmount } from "@/features/convertor/utils/convertAmount";
import { CoinsSliderProps, CoinType } from "../types/coinTypes";
import { formatAmount } from "@/features/convertor/utils/formatAmount";
import Image from "next/image";

export const CoinsSlider: React.FC<CoinsSliderProps> = ({
  allCoins,
  status,
  error,
  coinId,
  setCoinId,
  currencyInfo,
}: CoinsSliderProps) => {
  if (status === "rejected") {
    return <>hasError : {error}</>;
  }

  if (status === "pending") {
    return <>isLoading</>;
  }

  return (
    <ul className="flex gap-x-20 rounded-xl p-6 shadow-lg dark:bg-slate-800">
      {allCoins &&
        allCoins.slice(0, 10).map((coin: CoinType) => (
          <li
            key={coin.id}
            className={
              coinId === coin.id
                ? "font-bold hover:cursor-pointer"
                : "hover:cursor-pointer"
            }
            onClick={() => setCoinId(coin.id)}
          >
            <div className="flex  rounded-xl  dark:bg-slate-800">
              <Image
                src={coin.image}
                alt={"coin logo"}
                width={96}
                height={96}
              />
              <div className="flex gap-x-4 rounded-xl p-6 shadow-lg dark:bg-slate-800">
                {coin.name}({coin.symbol.toUpperCase()})
              </div>
              <div className="flex gap-x-4 rounded-xl p-6 shadow-lg dark:bg-slate-800">
                {formatAmount(
                  convertAmount(coin.current_price, currencyInfo?.value)
                )}
                {currencyInfo?.unit}
                {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};