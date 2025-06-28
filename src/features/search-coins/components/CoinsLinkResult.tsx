import { cn } from "@/lib/utils";
import Link from "next/link";
import { CoinIcon } from "@/shared/components/CoinIcon";
import { CoinResult } from "@/shared/types/coins";

type CoinLinkResultProps = {
  coinResults: CoinResult[];
  status: string;
  showResults: boolean;
};

export const CoinLinkResult = ({
  coinResults,
  status,
  showResults,
}: CoinLinkResultProps) => {
  return (
    <ul
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 bg-white dark:bg-[#1E1E26] p-1.5 sm:p-2 rounded-lg shadow-lg mt-1 z-20 max-h-64 overflow-y-auto transition-all duration-300 ease-out transform",
        showResults
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
      )}
    >
      {coinResults.length > 0 ? (
        coinResults.map((coin) => (
          <li
            key={coin.id}
            className="cursor-pointer hover:bg-gray-300 dark:hover:bg-white/20 px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-md text-sm w-[200px] max-w-[200px] sm:text-base"
          >
            <Link
              href={`/coin/${coin.id}`}
              className="block w-full text-black dark:text-white truncate text-sm flex gap-2"
              title={coin.name}
            >
              <CoinIcon
                id={coin.id}
                image={coin.thumb}
                tailwindSize="w-5 h-5"
              />
              <span>{coin.name}</span>
            </Link>
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
