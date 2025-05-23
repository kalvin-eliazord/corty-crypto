import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import Link from "next/link";
import { Search } from "lucide-react";
import { CoinType } from "../../../shared/types/coins";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export const SearchCoins = () => {
  const { allCoins, status } = useSelector((state: RootState) => state.coins);
  const [coinSearched, setCoinSearched] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCoinSearched(value);
  };

  const filteredCoins = allCoins.filter((coin) =>
    coin.name.toLowerCase().startsWith(coinSearched.toLowerCase())
  );

  const handleOnBlurInput = () => {
    setTimeout(() => setCoinSearched(""), 100);
  };

  if (status === "pending") {
    return <Skeleton className="h-10 w-full rounded" />;
  }

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 w-full">
        <Search className="text-white h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
        <Input
          ref={inputRef}
          onBlur={handleOnBlurInput}
          type="text"
          placeholder="Search coins"
          value={coinSearched}
          onChange={handleInputChange}
        />
      </div>

      {coinSearched.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-[#1E1E26] p-1.5 sm:p-2 rounded-lg shadow-lg mt-1 z-10 max-h-64 overflow-y-auto">
          <ul>
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin: CoinType) => (
                <li
                  key={coin.id}
                  className="cursor-pointer hover:bg-[#262626] px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-md text-sm sm:text-base"
                >
                  <Link
                    href={`/coin/${coin.id}`}
                    className="block w-full text-white truncate text-sm"
                    onClick={() => setCoinSearched("")}
                    title={coin.name}
                  >
                    {coin.name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-1.5 py-1 text-gray-400 text-sm sm:text-base">
                No coins found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
