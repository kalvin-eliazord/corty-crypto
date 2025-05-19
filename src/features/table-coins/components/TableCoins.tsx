import Link from "next/link";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { convertAmount } from "@/shared/utils/convertAmount";
import { formatAmount } from "@/shared/utils/formatAmount";
import { AllCoinsProps } from "@/shared/types/coinTypes";
import { useSortedCoins } from "../hooks/useSortedCoins";
import { useChunks } from "../hooks/useChunk";
import { OneHourPercentage } from "@/shared/components/OneHourPercentage";

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
  currencyInfo,
}) => {
  const [sortType, setSortType] = useState<string>("default");
  const [reverse, setReverse] = useState<boolean>(false);

  const sortedCoins = useSortedCoins(allCoins, sortType, reverse);
  const { displayedCoins, hasMore, loadNextChunk } = useChunks(sortedCoins, 10);

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
    <ul className=" w-full">
      <div className="flex gap-x-4 p-3 text-gray-300">
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
        dataLength={displayedCoins.length}
        next={loadNextChunk}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {displayedCoins.map((coin, i) => (
          <li
            key={coin.id}
            className={
              i === 0
                ? "flex gap-4 rounded-t-xl border-t p-4 dark:bg-[#1E1E26] mb-[2px]"
                : "flex gap-4 rounded p-4 dark:bg-[#1E1E26] mb-[2px] "
            }
          >
            <p className="text-gray-500 font-medium pr-2">{i + 1}</p>
            <Image
              src={coin.image}
              width={32}
              height={32}
              alt={`${coin.id} logo`}
            />
            <Link href={`/coin/${coin.id}`}>
              {coin.name} ({coin.symbol.toUpperCase()})
            </Link>
            {currencyInfo?.unit}
            {formatAmount(
              convertAmount(coin.current_price, currencyInfo?.value)
            )}
            <OneHourPercentage
              percentage={coin.price_change_percentage_1h_in_currency}
            />
            <OneHourPercentage
              percentage={coin.price_change_percentage_24h_in_currency}
            />
            <OneHourPercentage
              percentage={coin.price_change_percentage_7d_in_currency}
            />
            {coin.market_cap_change_24h}
            {coin.market_cap}
            {coin.circulating_supply}
            {coin.total_supply}
          </li>
        ))}
      </InfiniteScroll>
    </ul>
  );
};
