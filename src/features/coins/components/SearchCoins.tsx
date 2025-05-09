import { useEffect, useState } from "react";
import { CoinType } from "../types/coinTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchCoinsMarket } from "../coinsSlice";
import Link from "next/link";

export const SearchCoins = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allCoins, status, error } = useSelector(
    (state: RootState) => state.coins
  );

  useEffect(() => {
    dispatch(fetchCoinsMarket());
  }, [dispatch]);

  const [coinSearched, setCoinSearched] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoinSearched(e.target.value.trim());
  };

  if (status === "rejected" && error) {
    return <>Error : {error}</>;
  }

  if (status === "pending") {
    return <>isLoading</>;
  }

  const filteredCoins = allCoins.filter((coin) =>
    coin.name.toLowerCase().startsWith(coinSearched.toLowerCase())
  );
  return (
    <div>
      <input
        className="rounded-xl p-2 shadow-lg dark:bg-slate-800"
        value={coinSearched}
        onChange={(e) => handleInput(e)}
        placeholder="Search..."
      ></input>
      <ul>
        {coinSearched && filteredCoins.length > 0
          ? filteredCoins.map((coin: CoinType) => (
              <Link key={coin.id} href={`coin/${coin.id}`}>
                {coin.name}
              </Link>
            ))
          : coinSearched && <li>No coins found</li>}
      </ul>
    </div>
  );
};
