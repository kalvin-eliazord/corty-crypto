import { cn } from "@/lib/utils";
import { CoinIcon } from "@/shared/components/CoinIcon";
import { CoinResult } from "../types/searchCoins";

type CoinResultProps = {
  coinResults: CoinResult[];
  handleCoinNameClick: (coinId: string) => void;
  status: string;
  showResults: boolean;
};

export const CoinsResult = ({
  coinResults,
  handleCoinNameClick,
  status,
  showResults,
}: CoinResultProps) => {
  return (
    <ul
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0  bg-white dark:bg-[#1E1E26] p-1.5 sm:p-2 rounded-lg shadow-lg mt-1 z-20 max-h-64 overflow-y-auto transition-all duration-300 ease-out transform",
        showResults
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
      )}
    >
      {coinResults.length > 0 ? (
        coinResults.map((coin) => (
          <li
            key={coin.id}
            className="cursor-pointer px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-md text-sm sm:text-base flex gap-3"
            onMouseDown={() => handleCoinNameClick(coin.id)}
          >
            <CoinIcon
              id={coin.id}
              image={coin.thumb}
              tailwindSize={"w-5 h-5"}
            />

            <span>{coin.name}</span>
          </li>
        ))
      ) : status === "error" ? (
        <li className="px-1.5 py-1 text-gray-400 text-sm sm:text-base">
          Fetching error.
        </li>
      ) : status == "pending" ? (
        <li className="px-1.5 py-1 text-gray-400 text-sm sm:text-base">
          Fetching coin...
        </li>
      ) : (
        <li className="px-1.5 py-1 text-gray-400 text-sm sm:text-base">
          No coins found
        </li>
      )}
    </ul>
  );
};