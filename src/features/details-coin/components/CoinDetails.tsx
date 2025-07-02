import { Toaster, toast } from "sonner";
import { RootState } from "@/shared/store";
import { useSelector } from "react-redux";
import { formatAmount, formatAmountUnit } from "@/shared/utils/formatAmount";
import { formatHeadersData } from "../utils/formatHeadersData";
import { OneHourPercentage } from "@/shared/components/OneHourPercentage";
import LinkIcon from "@/assets/link.svg";
import CopyIcon from "@/assets/copy.svg";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Triangle24Hour } from "./Triangle24Hour";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ResponsiveContainer, XAxis, Area, AreaChart, YAxis } from "recharts";
import { formatHourlyPrices } from "../utils/formatHourlyPrices";
import { useEffect, useRef, useState } from "react";
import { AssetProgress } from "@/features/portfolio/components/AssetProgress";
import { CoinIcon } from "@/shared/components/CoinIcon";
import { CoinDetailsSkeleton } from "./CoinDetailsSkeleton";
import { AlertError } from "@/shared/components/AlertError";
import { useSmartQuery } from "@/shared/hooks/useSmartQuery";
import { Cryptocurrency } from "../types/selectedCoin";
import { fetchApiClient } from "@/shared/utils/fetchApiClient";

const headers = ["Market Cap", "Volume 24h", "Total Volume"];

export const CoinDetails = ({ selectedCoinId }: { selectedCoinId: string }) => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(false);
  const [isReadMore, setIsReadMore] = useState<boolean>(false);

  const url = selectedCoinId
    ? `coins/${selectedCoinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`
    : "";

  const { data, isError, isLoading, error, refetch } = useSmartQuery({
    queryKey: ["coinDetails", url],
    queryFn: () => fetchApiClient<Cryptocurrency>(url),
    enabled: !!url,
  });

  const currency = useSelector((state: RootState) => state.currency);

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      const isOverflowing = el.scrollHeight >= el.clientHeight;
      setIsClamped(isOverflowing);
    }
  }, [data?.description.en, isReadMore]);

  if (isLoading || isError || !data) {
    return (
      <>
        <CoinDetailsSkeleton />
        {isError && (
          <AlertError
            errorName={"Coin details"}
            networkError={error}
            refetch={refetch}
          />
        )}
      </>
    );
  }

  const toggleReadMore = () => {
    setIsReadMore((prev) => !prev);
  };

  function handleClickLinkIcon(blockchainSite: string) {
    window.open(blockchainSite, "_blank", "noopener,noreferrer");
  }

  function handleClickCopyIcon(blockchainSite: string) {
    navigator.clipboard.writeText(blockchainSite);
    toast.success(`${blockchainSite} saved into clipboard!`);
  }

  const weeklyPrices = formatHourlyPrices(data?.market_data.sparkline_7d.price);

  const chartConfig = {
    coinAmount: {
      label: data?.symbol?.toUpperCase() || "Coin",
      color: "#FF6B6B",
    },
    currencyAmount: {
      label: currency.code.toUpperCase(),
      color: "#6BCB77",
    },
  };

  const headersData = data && formatHeadersData(data, currency);

  const formattedCurrentPrice = formatAmount(
    data?.market_data.current_price[currency.code] || 0
  );

  const priceChangePercentage =
    data?.market_data.price_change_percentage_1h_in_currency[currency.code];
  const color =
    priceChangePercentage && priceChangePercentage > 0 ? "#43FFC7" : "#FF5252";

  return (
    <div className=" w-full h-full flex sm:flex-col">
      <div className="flex flex-col sm:flex-row w-full ">
        <div className="flex-col flex md:gap-y-20 lg:gap-y-40 gap-y-20 ">
          <div className=" lg:flex-row gap-4 flex flex-col lg:mb-20 xl:mb-0  ">
            <div className="sm:flex-row gap-4 flex flex-col justify-between">
              <div className="flex flex-col gap-y-4 min-w-64 lg:mb-8">
                <BackgroundGradient className="flex flex-col gap-3 justify-center items-center dark:bg-[#1F1D2280] rounded-3xl text-center sm:h-48 p-5 sm:p-0">
                  <CoinIcon
                    id={data.id}
                    image={data.image.large}
                    tailwindSize={"w-10 h-10 sm:w-20 sm:h-20"}
                  />
                  <span className="font-medium text-white">
                    {data.name} ({data.symbol.toUpperCase()})
                  </span>
                </BackgroundGradient>

                <BackgroundGradient className="flex flex-col gap-3 justify-center items-center  dark:bg-[#1F1D2280] rounded-3xl text-center sm:h-7 text-white hover:text-white/60">
                  {data && (
                    <button
                      className="hover:cursor-pointer"
                      onClick={() =>
                        handleClickLinkIcon(data.links.homepage[0])
                      }
                    >
                      {data.links.homepage[0]}
                    </button>
                  )}
                </BackgroundGradient>
              </div>

              <div className="sm:w-64 ">
                <BackgroundGradient className=" rounded-3xl dark:bg-zinc-900 w-full sm:h-60 p-5 flex flex-col justify-between text-white">
                  <div className="border border-white/50 hover:border-gray-700 dark:hover:border-gray-500 rounded-3xl p-5">
                    <span className="dark:text-gray-400  text-gray-200">
                      {data && "Current Price"}
                    </span>
                    <div className="flex gap-4">
                      <span className="text-xl font-medium">
                        {currency.symbol}
                        {formattedCurrentPrice}
                      </span>
                      <OneHourPercentage
                        percentage={priceChangePercentage}
                        color={color}
                      />
                    </div>
                  </div>
                  <Triangle24Hour
                    cryptoData={data}
                    isHigh
                    currency={currency}
                  />
                  <Triangle24Hour
                    cryptoData={data}
                    isHigh={false}
                    currency={currency}
                  />
                </BackgroundGradient>
              </div>
            </div>

            <div className="w-full flex flex-col xl:flex-row gap-4 lg:ml-30 lg:h-60">
              <BackgroundGradient className=" dark:bg-zinc-900 p-5 rounded-3xl h-full">
                <ul className="flex-col flex justify-between h-full gap-1.5">
                  {headersData &&
                    headers.map(
                      (header) =>
                        headersData[header] && (
                          <li key={header} className="text-nowrap ">
                            <span className="text-gray-200 dark:text-gray-400 mr-2 lg:text-sm xl:text-base">
                              {header} :
                            </span>
                            <span className="text-white lg:text-sm xl:text-base">
                              {formatAmountUnit(Number(headersData[header])) ||
                                headersData[header]}
                            </span>
                          </li>
                        )
                    )}
                  <li className=":mt-4">
                    {headersData && (
                      <AssetProgress
                        dividend={Number(headersData["Circulating Supply"])}
                        divisor={Number(headersData["Total Supply"])}
                        label={"Circulating vs Total supply"}
                      />
                    )}
                  </li>
                </ul>
              </BackgroundGradient>

              <div className="w-full h-60">
                <BackgroundGradient className="text-white dark:bg-zinc-900 p-5 rounded-3xl h-50 xl:h-59.5">
                  <span className="lg:text-sm xl:text-base">
                    Average prices over last week in{" "}
                    {currency.code.toUpperCase()}
                  </span>
                  <ChartContainer config={chartConfig}>
                    <div className=" w-full justify-center text-xs h-35 xl:h-45">
                      {weeklyPrices && (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={weeklyPrices}>
                            <defs>
                              <linearGradient
                                id="coinGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#D946EF"
                                  stopOpacity={0.6}
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#3B0764"
                                  stopOpacity={0.2}
                                />
                              </linearGradient>
                            </defs>
                            <YAxis domain={["dataMin", "dataMax"]} hide />

                            <XAxis
                              interval={0}
                              padding={{ left: 15, right: 15 }}
                              tick={{ fontSize: 11 }}
                              dataKey="day"
                              stroke="#D0D0D1"
                              axisLine={false}
                              tickLine={false}
                            />
                            <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent indicator="dot" />}
                              formatter={(value: number) => {
                                return [
                                  `${currency.symbol}${formatAmountUnit(value)}
                                  `,
                                ];
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="amount"
                              stroke="#D946EF"
                              fill="url(#coinGradient)"
                              fillOpacity={1}
                              strokeWidth={3}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </ChartContainer>
                </BackgroundGradient>
              </div>
            </div>
          </div>
          <div className="lg:flex-row lg:gap-38 z-10 flex-col flex gap-10">
            <div className="flex flex-col gap-y-3 ">
              <span className="font-medium text-xl block text-white">
                Blockchain sites
              </span>

              <div className="grid lg:grid-cols-2 gap-4 text-center z-10 lg:w-130 lg:max-w-130 text-gray-300">
                {data?.links.blockchain_site
                  .filter((blockchainSite: string) => blockchainSite)
                  .map((blockchainSite: string) => (
                    <div
                      key={blockchainSite}
                      className="dark:bg-[#1F1D2280] flex items-center justify-between gap-2 p-2.5 rounded-3xl border-white/20 border-t border-l border-r w-full text-nowrap overflow-hidden"
                    >
                      <LinkIcon
                        className="hover:cursor-pointer transition-transform duration-300 hover:-rotate-36"
                        onClick={() => handleClickLinkIcon(blockchainSite)}
                      />
                      <span className="truncate text-ellipsis text-sm max-w-40">
                        {blockchainSite.slice(8)}
                      </span>
                      <CopyIcon
                        className="hover:cursor-pointer transition-transform duration-300 hover:-rotate-36"
                        onClick={() => handleClickCopyIcon(blockchainSite)}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="w-full leading-loose transition-all duration-500 z-10 ">
              <span className="font-medium text-xl text-white">
                Description
              </span>
              <div
                ref={descriptionRef}
                className={`${!isReadMore && "line-clamp-5 "} text-gray-300`}
              >
                {data?.description.en}
              </div>
              {isClamped && (
                <button
                  onClick={toggleReadMore}
                  className=" text-left dark:text-blue-500 text-black/80 hover:underline focus:outline-none hover:cursor-pointer"
                >
                  {isReadMore ? "Read less" : "Read more"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster theme="system" />
    </div>
  );
};
