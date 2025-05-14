import { useEffect, useState, useRef } from "react";
import { CoinType } from "../../features/coins/types/coinTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchCoinsMarket } from "../../features/coins/coinsSlice";
import Link from "next/link";
import { Search } from "lucide-react";

export const SearchCoins = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allCoins, status } = useSelector((state: RootState) => state.coins);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dispatch(fetchCoinsMarket());
  }, [dispatch]);

  const [coinSearched, setCoinSearched] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCoinSearched(value);
  };

  const filteredCoins = allCoins.filter((coin) =>
    coin.name.toLowerCase().startsWith(coinSearched.toLowerCase())
  );

  if (status === "pending") {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="flex items-center gap-1.5 bg-gray-900/60 rounded-lg px-2 py-1.5 w-full">
        <Search className="text-gray-400 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
        <input
          ref={inputRef}
          className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm sm:text-base focus:ring-1 focus:ring-blue-500 rounded flex-grow min-w-0"
          value={coinSearched}
          onChange={handleInputChange}
          placeholder="Search coins..."
          aria-label="Search coins"
        />
      </div>

      {coinSearched.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-gray-800 p-1.5 sm:p-2 rounded-lg shadow-lg mt-1 z-10 max-h-64 overflow-y-auto">
          <ul>
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin: CoinType) => (
                <li
                  key={coin.id}
                  className="cursor-pointer hover:bg-gray-700 px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-md text-sm sm:text-base"
                >
                  <Link
                    href={`/coin/${coin.id}`}
                    className="block w-full text-white truncate"
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