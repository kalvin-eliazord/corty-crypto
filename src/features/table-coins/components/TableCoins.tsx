import Link from "next/link";
import Image from "next/image";
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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getSparklineStrokeColor } from "../utils/getSparklineStrokeColor";
import { Progress } from "@/components/ui/progress";
import { formatAmount, formatAmountUnit } from "@/shared/utils/formatAmount";
import { AllCoinsProps } from "@/shared/types/coins";
import { useSortedCoins } from "../hooks/useSortedCoins";
import { useChunks } from "../hooks/useChunk";
import { OneHourPercentage } from "@/shared/components/OneHourPercentage";
import { ValuesWithEllipses } from "@/shared/components/ValuesWithEllipses";

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
  currency,
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

  if (status === "rejected") {
    return (
      <div className="dark:bg-[#1F1D2280] p-5 rounded-xl border-t border-l border-r w-full text-center">
        {" "}
        Table Coins fetching rejected : {error}
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="dark:bg-[#1F1D2280] p-5 rounded-xl border-t border-l border-r w-full">
        <Skeleton className="h-full w-full rounded" />
      </div>
    );
  }

  console.log(
    "allcoinPrice: ",
    displayedCoins[0]?.sparkline_in_7d.price.slice(-7)
  );
  return (
    <div className="w-full rounded-xl overflow-hidden ">
      <InfiniteScroll
        dataLength={displayedCoins.length}
        next={loadNextChunk}
        hasMore={hasMore}
        loader={
          <Skeleton className="h-full w-full rounded text-center">
            {" "}
            Loading..{" "}
          </Skeleton>
        }
        scrollableTarget="scrollable-table"
      >
        <Table className=" overflow-hidden ">
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableHead
                  key={header}
                  className="text-[#B9B8BB]"
                  onClick={() => handleSort(header)}
                >
                  <span className="hover:cursor-pointer"> {header}</span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="dark:bg-[#1F1D2280] border-l border-r">
            {displayedCoins.map((coin, i) => (
              <TableRow key={coin.id}>
                <TableCell className="text-[#B9B8BB]">{i + 1}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Link
                    href={`/coin/${coin.id}`}
                    className="flex gap-2 font-medium  items-center"
                  >
                    <Image
                      src={coin.image}
                      width={20}
                      height={20}
                      alt={`${coin.id} logo`}
                    />
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </Link>
                </TableCell>
                <TableCell>
                  {currency?.symbol} {formatAmount(coin.current_price)}
                </TableCell>
                <TableCell>
                  <OneHourPercentage
                    percentage={coin.price_change_percentage_1h_in_currency}
                    color={
                      coin.price_change_percentage_1h_in_currency > 0
                        ? "#43FFC7"
                        : "#FF5252"
                    }
                  />
                </TableCell>
                <TableCell>
                  <OneHourPercentage
                    percentage={coin.price_change_percentage_24h_in_currency}
                    color={
                      coin.price_change_percentage_24h_in_currency > 0
                        ? "#43FFC7"
                        : "#FF5252"
                    }
                  />
                </TableCell>
                <TableCell>
                  <OneHourPercentage
                    percentage={coin.price_change_percentage_7d_in_currency}
                    color={
                      coin.price_change_percentage_7d_in_currency > 0
                        ? "#43FFC7"
                        : "#FF5252"
                    }
                  />
                </TableCell>
                <TableCell>
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
                      coin.market_cap_change_24h > 0 ? "#1CB385" : "#FF5252"
                    }
                    value={(coin.total_volume / coin.market_cap) * 100}
                  />
                </TableCell>

                <TableCell>
                  <ValuesWithEllipses
                    current={
                      currency?.symbol +
                      formatAmountUnit(coin.circulating_supply)
                    }
                    total={
                      currency?.symbol + formatAmountUnit(coin.total_supply)
                    }
                    color="#43FFC7"
                  />
                  <Progress
                    indicatorColor="#43FFC7"
                    value={(coin.circulating_supply / coin.total_supply) * 100}
                  />
                </TableCell>

                <TableCell>
                  <AspectRatio ratio={6 / 1}>
                    <ResponsiveContainer
                      width="100%"
                      height={30}
                      className="items-center"
                    >
                      <AreaChart
                        data={coin.sparkline_in_7d.price.map((price) => ({
                          price,
                        }))}
                      >
                        <defs>
                          <linearGradient
                            id={`pricesGradient${coin.id}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor={getSparklineStrokeColor(
                                coin.sparkline_in_7d.price
                              )}
                              stopOpacity={0.1}
                            />
                            <stop
                              offset="100%"
                              stopColor={getSparklineStrokeColor(
                                coin.sparkline_in_7d.price
                              )}
                              stopOpacity={0.05}
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
                  </AspectRatio>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </div>
  );
};
