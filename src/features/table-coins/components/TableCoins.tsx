import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { getSparklineStrokeColor } from "../utils/getSparklineStrokeColor";
import { Progress } from "@/components/ui/progress";
import { formatAmount, formatAmountUnit } from "@/shared/utils/formatAmount";
import { AllCoinsProps } from "@/shared/types/coins";
import { useSortedCoins } from "../hooks/useSortedCoins";
import { useChunks } from "../hooks/useChunk";
import { OneHourPercentage } from "@/shared/components/OneHourPercentage";
import { ValuesWithEllipses } from "@/shared/components/ValuesWithEllipses";
import { CoinIcon } from "@/shared/components/CoinIcon";

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

const responsiveTableStyles = [
  "",
  "",
  "",
  "hidden md:table-cell",
  "hidden md:table-cell",
  "hidden lg:table-cell",
  "hidden lg:table-cell",
  "hidden xl:table-cell",
  "hidden 2xl:table-cell",
];

export const TableCoins: React.FC<AllCoinsProps> = ({
  allCoins,
  currency,
  isLoading,
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

  if (isLoading) {
    return (
      <div className="h-full dark:bg-[#1F1D2280]  p-5 rounded-xl border-t border-l border-r w-full">
        <Skeleton className="h-full w-full rounded" />
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl overflow-hidden ">
      <InfiniteScroll
        dataLength={displayedCoins.length}
        next={loadNextChunk}
        hasMore={hasMore}
        loader={
          <Skeleton className="h-full w-full rounded text-center">
            Loading..
          </Skeleton>
        }
        scrollableTarget="scrollable-table"
      >
        <Table className=" overflow-hidden ">
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header, i) => (
                <TableHead
                  key={header}
                  className={`border-b dark:border-white/10 border-[#1F1D2280] text-gray-300 dark:text-[#B9B8BB] ${responsiveTableStyles[i]} p-5`}
                  onClick={() => handleSort(header)}
                >
                  <span className="hover:cursor-pointer"> {header}</span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="dark:bg-[#1F1D2280] dark:border-white/10 border-[#1F1D2280] border-l border-r">
            {displayedCoins.map((coin, i) => (
              <TableRow
                key={coin.id}
                className="dark:border-white/10 border-[#1F1D2280]"
              >
                <TableCell className="text-gray-300 dark:text-[#B9B8BB] p-5">
                  {i + 1}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/coin/${coin.id}`}
                    className="flex gap-2 font-medium  items-center"
                  >
                    <CoinIcon
                      id={coin.id}
                      image={coin.image}
                      tailwindSize={"w-8 h-8"}
                    />
                    <span className="text-xs text-wrap sm:text-nowrap sm:text-base text-white">
                      {coin.name}
                    </span>
                    <span className="hidden 2xl:block text-white">
                      ({coin.symbol.toUpperCase()})
                    </span>
                  </Link>
                </TableCell>
                <TableCell className="text-white">
                  {currency?.symbol} {formatAmount(coin.current_price)}
                </TableCell>
                <TableCell className={responsiveTableStyles[3]}>
                  <OneHourPercentage
                    percentage={coin.price_change_percentage_1h_in_currency}
                    color={
                      coin.price_change_percentage_1h_in_currency > 0
                        ? "#43FFC7"
                        : "#FF5252"
                    }
                  />
                </TableCell>
                <TableCell className={responsiveTableStyles[4]}>
                  <OneHourPercentage
                    percentage={coin.price_change_percentage_24h_in_currency}
                    color={
                      coin.price_change_percentage_24h_in_currency > 0
                        ? "#43FFC7"
                        : "#FF5252"
                    }
                  />
                </TableCell>
                <TableCell className={responsiveTableStyles[5]}>
                  <OneHourPercentage
                    percentage={coin.price_change_percentage_7d_in_currency}
                    color={
                      coin.price_change_percentage_7d_in_currency > 0
                        ? "#43FFC7"
                        : "#FF5252"
                    }
                  />
                </TableCell>
                <TableCell className={responsiveTableStyles[6]}>
                  <ValuesWithEllipses
                    current={
                      currency?.symbol + formatAmountUnit(coin.total_volume)
                    }
                    total={currency?.symbol + formatAmountUnit(coin.market_cap)}
                    color={
                      coin.market_cap_change_24h > 0 ? "#1CB385" : "#FF5252"
                    }
                  />
                  <Progress
                    indicatorColor={
                      coin.market_cap_change_24h > 0 ? "green" : "red"
                    }
                    value={(coin.total_volume / coin.market_cap) * 100}
                    className="sm:max-w-[200px]"
                  />
                </TableCell>

                <TableCell className={responsiveTableStyles[7]}>
                  <ValuesWithEllipses
                    current={
                      currency?.symbol +
                      formatAmountUnit(coin.circulating_supply)
                    }
                    total={
                      currency?.symbol + formatAmountUnit(coin.total_supply)
                    }
                    color={"#43FFC7"}
                  />
                  <Progress
                    indicatorColor="green2"
                    value={(coin.circulating_supply / coin.total_supply) * 100}
                    className="sm:max-w-[200px]"
                  />
                </TableCell>

                <TableCell
                  className={responsiveTableStyles[8] + " w-40  max-h-[25px]"}
                >
                  <ResponsiveContainer
                    width="100%"
                    height={50}
                    className=" max-h-[70px]"
                  >
                    <AreaChart
                      data={coin.sparkline_in_7d.price.map((price) => ({
                        price,
                      }))}
                    >
                      <defs>
                        <linearGradient
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                          id={`pricesGradient${coin.id}`}
                        >
                          <stop
                            offset="0%"
                            stopColor={getSparklineStrokeColor(
                              coin.sparkline_in_7d.price
                            )}
                            stopOpacity={0.5}
                          />
                          <stop
                            offset="100%"
                            stopColor={getSparklineStrokeColor(
                              coin.sparkline_in_7d.price
                            )}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={getSparklineStrokeColor(
                          coin.sparkline_in_7d.price
                        )}
                        fillOpacity={1}
                        fill={`url(#pricesGradient${coin.id})`}
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </div>
  );
};
