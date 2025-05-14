"use client";
import { useEffect, useState } from "react";
import { CoinsSlider } from "@/features/coins/components/CoinsSlider";
import { TableCoins } from "@/features/coins/components/TableCoins";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinsMarket } from "@/features/coins/coinsSlice";
import { Charts } from "@/features/coins/components/Charts";

export default function Home() {
  const [coinId, setCoinId] = useState<string>("bitcoin");
  const dispatch = useDispatch<AppDispatch>();
  const { allCoins, status, error } = useSelector(
    (state: RootState) => state.coins
  );
  const { currency } = useSelector((state: RootState) => state.currency);

  useEffect(() => {
    dispatch(fetchCoinsMarket());
  }, [dispatch]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <CoinsSlider
          allCoins={allCoins}
          status={status}
          error={error}
          setCoinId={setCoinId}
          coinId={coinId}
          currency={currency}
        />

        <Charts coinId={coinId} currency={currency}></Charts>
        <TableCoins
          allCoins={allCoins}
          status={status}
          error={error}
          currency={currency}
        ></TableCoins>
      </main>
    </div>
  );
}
