"use client";

import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { TableCoins } from "@/features/table-coins/components/TableCoins";
import { RootState } from "@/shared/store";
import { useSelector } from "react-redux";
import { CoinType } from "@/shared/types/coins";
import { useSmartQuery } from "@/shared/hooks/useSmartQuery";
import { AlertError } from "@/shared/components/AlertError";
import { fetchApiClient } from "@/shared/utils/fetchApiClient";
import { SelectedCoinPanel } from "@/features/charts/components/SelectedCoinPanel";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [coinId, setCoinId] = useState<string>("bitcoin");
  const [allCoinsStacked, setAllCoinsStacked] = useState<CoinType[]>([]);
  const [page, setPage] = useState<number>(1);
  const tempPage = useRef<number>(page);
  const currency = useSelector((state: RootState) => state.currency);

  const url = currency.code
    ? `coins/markets?vs_currency=${currency.code}&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    : "";

  const {
    data: allCoins,
    isError,
    error,
    refetch,
  } = useSmartQuery({
    queryKey: ["allCoinsMarket", url],
    queryFn: () => fetchApiClient<CoinType[]>(url),
    enabled: !!url,
  });

  useEffect(() => {
    if (!tempPage.current) {
      tempPage.current = page;
    }

    if (!allCoins || allCoins.length === 0) return;

    if (tempPage.current + 1 === page) {
      tempPage.current = page;

      setAllCoinsStacked((prev) => [...prev, ...allCoins]);
    } else if (page === 1) {
      setAllCoinsStacked(allCoins);
    }
  }, [allCoins, page]);

  const debounceRef = useRef(false);

  const handleNextPage = () => {
    if (debounceRef.current) return;
    debounceRef.current = true;

    setTimeout(() => {
      setPage((p) => p + 1);
      debounceRef.current = false;
    }, 250);
  };

  return (
    <>
      <Head>
        <title>Corty Crypto — Real-Time Crypto Dashboard</title>
        <meta
          name="description"
          content="Track top cryptocurrencies, charts, and market data in real-time."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <SelectedCoinPanel
          coinId={coinId}
          currency={currency}
          allCoins={allCoinsStacked}
          setCoinId={setCoinId}
        />

        <div className="w-full">
          <InfiniteScroll
            className="w-full"
            dataLength={allCoinsStacked.length}
            next={handleNextPage}
            hasMore={allCoins ? allCoins.length === 50 : false}
            loader={
              <Skeleton className="h-10 w-full rounded-xl text-center dark:text-white text-gray-700">
                Loading..
              </Skeleton>
            }
            scrollableTarget="scrollable-table"
          >
            <TableCoins allCoins={allCoinsStacked} currency={currency} />
          </InfiniteScroll>
        </div>

        {isError && (
          <AlertError
            errorName={"All coins market"}
            networkError={error}
            refetch={refetch}
          />
        )}
      </main>
    </>
  );
}
