"use client";

import { useState } from "react";
import { CoinsSlider } from "@/features/slider-coins/components/CoinsSlider";
import { TableCoins } from "@/features/table-coins/components/TableCoins";
import { Charts } from "@/features/charts/components/Charts";
import { RootState } from "@/shared/store";
import { useSelector } from "react-redux";
import { CoinType } from "@/shared/types/coins";
import { useSmartQuery } from "@/shared/hooks/useSmartQuery";
import { AlertError } from "@/shared/components/AlertError";
import { fetchApiClient } from "@/shared/utils/fetchApiClient";

export default function Home() {
  const [coinId, setCoinId] = useState<string>("bitcoin");
  const currency = useSelector((state: RootState) => state.currency);

  const url = currency.code
    ? `coins/markets?vs_currency=${currency.code}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    : "";

  const {
    data: allCoins,
    isError,
    isLoading,
    error,
    refetch
  } = useSmartQuery({
    queryKey: ["allCoinsMarket", url],
    queryFn: () => fetchApiClient<CoinType[]>(url),
    enabled: !!url,
  });

  const selectedCoin =
    allCoins && allCoins.find((c: CoinType) => c.id === coinId);

  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      {allCoins && (
        <CoinsSlider
          allCoins={allCoins}
          isLoading={isLoading}
          setCoinId={setCoinId}
          coinId={coinId}
          currency={currency}
        />
      )}

      <Charts coinId={coinId} currency={currency} coin={selectedCoin} />

      {allCoins && (
        <TableCoins
          allCoins={allCoins}
          isLoading={isLoading}
          currency={currency}
        />
      )}

      {isError && (
        <AlertError errorName={"All coins market"} networkError={error} refetch={refetch} />
      )}
    </div>
  );
}