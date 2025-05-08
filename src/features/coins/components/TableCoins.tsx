import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { sortCoins } from "../types/sortCoins";
import { getAllChunksCoins } from "../utils/getAllChunksCoins";
import { CoinType, FetchStatus } from "../types/coinTypes";
import InfiniteScroll from "react-infinite-scroll-component";

export const tableHeaders = [
  "#",
  "Name",
  "Price",
  "1h",
  "24h",
  "7d",
  "24h Vol / Market Cap",
  "Circulating / Total Sup",
  "Last 7d",
];

export type TableCoinsProps = {
  allCoins: CoinType[];
  status: FetchStatus;
  error: string | null | undefined;
};

export const TableCoins: React.FC<TableCoinsProps> = ({
  allCoins,
  status,
  error,
}) => {
  const [displayedCoins, setDisplayedCoins] = useState<CoinType[]>([]);

  const [sortType, setSortType] = useState<string>("default");
  const [reverse, setReverse] = useState<boolean>(false);
  const [partIndex, setPartIndex] = useState<number>(0);
  const allChunksCoins = useMemo(() => getAllChunksCoins(allCoins), [allCoins]);
  const maxChunk = allChunksCoins.length;

  const handleSort = (newSortType: string) => {
    if (newSortType === sortType) {
      setReverse(!reverse);
    } else {
      setSortType(newSortType);
      setReverse(false);
    }
  };

  const loadMoreCoins = () => {
    setPartIndex((prev) => (prev < maxChunk ? prev + 1 : prev));
  };

  const sortedCoins = useMemo(() => {
    return sortCoins(displayedCoins, sortType, reverse);
  }, [displayedCoins, sortType, reverse]);

  useEffect(() => {
    if (allChunksCoins[partIndex]) {
      setDisplayedCoins((prev) => [...prev, ...allChunksCoins[partIndex]]);
    }
  }, [partIndex, allCoins, allChunksCoins]);

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
          {tableHeaders.map((header, i) => (
            <li
              key={header}
              className={i > 0 && i < 6 ? "font-bold hover:cursor-pointer" : ""}
              onClick={() => handleSort(header)}
            >
              {header}
            </li>
          ))}
        </div>

        <InfiniteScroll
          dataLength={sortedCoins.length}
          next={loadMoreCoins}
          hasMore={partIndex < maxChunk}
          loader={<h4>Loading...</h4>}
        >
          {sortedCoins.map((coin, i) => (
            <li
              key={coin.id}
              className="flex gap-x-4 rounded-xl p-6 shadow-lg dark:bg-slate-800"
            >
              {i + 1}
              <Image
                src={coin.image}
                width={40}
                height={40}
                alt="Coin logo"
              ></Image>
              <Link href={`coin/${coin.id}`}> {coin.name}</Link>
              {coin.current_price}
              {coin.price_change_percentage_1h_in_currency}
              {coin.price_change_percentage_24h_in_currency}
              {coin.price_change_percentage_7d_in_currency}
              {coin.market_cap}
              {coin.circulating_supply}
              {coin.total_supply}
            </li>
          ))}
        </InfiniteScroll>
      </ul>
    </div>
  );
};
