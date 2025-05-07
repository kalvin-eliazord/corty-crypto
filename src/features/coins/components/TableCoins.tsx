import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { fetchCoinsMarket } from "../coinsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { tableHeaders } from "../types/tableCoins";

export const TableCoins = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allCoins, status, error } = useSelector(
    (state: RootState) => state.coins
  );

  useEffect(() => {
    dispatch(fetchCoinsMarket());
  }, [dispatch]);

  if (status === "rejected" && error) {
    return <>Error : {error}</>;
  }

  if (status === "pending") {
    return <>isLoading</>;
  }

  return (
    <div>
      <ul>
        <div className="flex gap-x-4 rounded-xl p-6 shadow-lg dark:bg-slate-800">
          {tableHeaders.map((header) => (
            <li key={header}> {header}</li>
          ))}
        </div>

        {allCoins.map((coin, i) => (
          <li
            key={coin.id}
            className="flex gap-x-4 rounded-xl p-6 shadow-lg dark:bg-slate-800"
          >
            {i + 1}
            <Link href={`coin/${coin.id}`}> {coin.name}</Link>
            <Image
              src={coin.image}
              width={40}
              height={40}
              alt="Coin logo"
            ></Image>
          </li>
        ))}
      </ul>
    </div>
  );
};
