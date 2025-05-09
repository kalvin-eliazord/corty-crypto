import Link from "next/link";
import Image from "next/image";
import { AllCoinsProps } from "../types/coinTypes";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useChunks } from "../hooks/useChunk";
import { useSortedCoins } from "../hooks/useSortedCoins";

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

export const TableCoins: React.FC<AllCoinsProps> = ({
  allCoins,
  status,
  error,
}) => {
  const [sortType, setSortType] = useState<string>("default");
  const [reverse, setReverse] = useState<boolean>(false);

  const { displayedCoins, hasMore, loadNextChunk } = useChunks(allCoins, 10);
  const sortedCoins = useSortedCoins(displayedCoins, sortType, reverse);

  const handleSort = (newSortType: string) => {
    if (newSortType === sortType) {
      setReverse(!reverse);
    } else {
      setSortType(newSortType);
      setReverse(false);
    }
  };

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
          next={loadNextChunk}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {sortedCoins.map((coin, i) => (
            <li
              key={coin.id}
              className="flex gap-x-4 rounded-xl p-6 shadow-lg dark:bg-slate-800"
            >
              {i + 1}
              <Image src={coin.image} width={40} height={40} alt="Coin logo" />
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
