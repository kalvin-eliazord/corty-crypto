
import { CoinsSliderProps, CoinType } from "../types/coinTypes";

export const CoinsSlider: React.FC<CoinsSliderProps> = ({
  allCoins,
  status,
  error,
  coinId,
  setCoinId,
}: CoinsSliderProps) => {
  if (status === "rejected") {
    return <>hasError : {error}</>;
  }

  if (status === "pending") {
    return <>isLoading</>;
  }

  return (
    <ul className="flex gap-x-4 rounded-xl p-6 shadow-lg dark:bg-slate-800">
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
            {coin.name}
          </li>
        ))}
    </ul>
  );
};
