"use client";
import { useEffect, useState } from "react";
import { CoinsSlider } from "@/features/slider-coins/components/CoinsSlider";
import { TableCoins } from "@/features/table-coins/components/TableCoins";
import { AppDispatch, RootState } from "@/shared/store";
import { useDispatch, useSelector } from "react-redux";
import { Charts } from "@/features/charts/components/Charts";
import { fetchCoinsMarket } from "@/shared/store/coinsSlice";

export const useFetchCoinsMarket = (currencyCode: string) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCoinsMarket(currencyCode));
  }, [dispatch, currencyCode]);
};

export default function Home() {
  const [coinId, setCoinId] = useState<string>("bitcoin");
  const dispatch = useDispatch<AppDispatch>();
  const { allCoins, status, error } = useSelector(
    (state: RootState) => state.coins
  );
  const currency = useSelector((state: RootState) => state.currency);

  useEffect(() => {
    dispatch(fetchCoinsMarket(currency.code));
  }, [dispatch, currency.code]);

  const coin = allCoins.find((coin) => coin.id === coinId);

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <CoinsSlider
        allCoins={allCoins}
        status={status}
        error={error}
        setCoinId={setCoinId}
        coinId={coinId}
        currency={currency}
      />

      <Charts coinId={coinId} currency={currency} coin={coin} />
      <TableCoins
        allCoins={allCoins}
        status={status}
        error={error}
        currency={currency}
      />
    </main>
  );
}
