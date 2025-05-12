import { useEffect, useState, useRef } from "react";
import { CoinType } from "../../features/coins/types/coinTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchCoinsMarket } from "../../features/coins/coinsSlice";
import Link from "next/link";
import { Search } from "lucide-react";

export const SearchCoins = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allCoins, status, error } = useSelector(
    (state: RootState) => state.coins
  );

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

  if (status === "rejected" && error) {
    return <>Error: {error}</>;
  }

  if (status === "pending") {
    return <>isLoading</>;
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center gap-2 bg-gray-900/60 rounded-lg px-3 py-2">
        <Search className="text-gray-400" />
        <input
          ref={inputRef}
          className="bg-transparent flex-1 outline-none text-white placeholder-gray-400"
          value={coinSearched}
          onChange={handleInputChange}
          placeholder="Search for a coin..."
        />
      </div>

      {coinSearched.length > 0 && (
        <div className="absolute top-full left-0 w-full max-w-md bg-gray-800 p-2 rounded-lg shadow-lg mt-2 z-10">
          <ul>
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin: CoinType) => (
                <li
                  key={coin.id}
                  className="cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-md"
                >
                  <Link
                    href={`/coin/${coin.id}`}
                    className="block w-full"
                    onClick={() => setCoinSearched("")}
                  >
                    {coin.name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-2 py-1 text-gray-400">No coins found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
