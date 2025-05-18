"use client";
import { useEffect, useState } from "react";
import { CoinsSlider } from "@/features/slider-coins/components/CoinsSlider";
import { TableCoins } from "@/features/table-coins/components/TableCoins";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { Charts } from "@/features/charts/components/Charts";
import { fetchCoinsMarket } from "@/shared/coinsSlice";

export default function Home() {
  const [coinId, setCoinId] = useState<string>("bitcoin");
  const dispatch = useDispatch<AppDispatch>();
  const { allCoins, status, error } = useSelector(
    (state: RootState) => state.coins
  );
  const { currencyInfo } = useSelector((state: RootState) => state.currency);

  useEffect(() => {
    dispatch(fetchCoinsMarket());
  }, [dispatch]);

  const coin = allCoins.find((coin) => coin.id === coinId);

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <CoinsSlider
        allCoins={allCoins}
        status={status}
        error={error}
        setCoinId={setCoinId}
        coinId={coinId}
        currencyInfo={currencyInfo}
      />

      <Charts coinId={coinId} currencyInfo={currencyInfo} coin={coin}></Charts>
      <TableCoins
        allCoins={allCoins}
        status={status}
        error={error}
        currencyInfo={currencyInfo}
      ></TableCoins>
    </main>
  );
}
