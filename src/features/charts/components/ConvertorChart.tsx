"use client";

import { CoinType, Currency } from "@/shared/types/coins";
import { Area, AreaChart, XAxis, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { RadioDurations } from "@/features/currency-convertor/components/RadioDurations";
import { useMemo, useState } from "react";
import { computePerfSpreadChart } from "@/features/charts/utils/computePerfSpreadChart";
import { useSmartQuery } from "@/shared/hooks/useSmartQuery";
import { MarketCharts } from "../types/charts";
import { fetchApiClient } from "@/shared/utils/fetchApiClient";
import { AlertError } from "@/shared/components/AlertError";
import { Skeleton } from "@/components/ui/skeleton";

type ConvertorChartProps = {
  selectedCoinId: string;
  currency: Currency;
  randomCoinId: string;
  allCoins: CoinType[];
};

export const ConvertorChart: React.FC<ConvertorChartProps> = ({
  selectedCoinId,
  currency,
  allCoins,
  randomCoinId,
}) => {
  const [days, setDays] = useState<string>("7");

  const urlRandomCoin =
    currency.code && randomCoinId && days
      ? `coins/${randomCoinId}/market_chart?vs_currency=${currency.code}&days=${days}&interval=daily`
      : "";

  const {
    data: randomCoinChart,
    isLoading: isLoadingRandomCoin,
    error: errorRandomCoin,
    isError: isErrorRandomCoin,
    refetch: refetchRandomCoin,
  } = useSmartQuery({
    queryKey: ["randomCoinChart", urlRandomCoin],
    queryFn: () => fetchApiClient<MarketCharts>(urlRandomCoin),
    enabled: !!urlRandomCoin,
  });

  const urlSelectedCoin =
    currency.code && selectedCoinId && days
      ? `coins/${selectedCoinId}/market_chart?vs_currency=${currency.code}&days=${days}&interval=daily`
      : "";

  const {
    data: selectedCoinChart,
    isLoading: isLoadingSelectCoin,
    error: errorSelectCoin,
    isError: isErrorSelectCoin,
    refetch: refetchSelectCoin,
  } = useSmartQuery({
    queryKey: ["selectedCoinChart", urlSelectedCoin],
    queryFn: () => fetchApiClient<MarketCharts>(urlSelectedCoin),
    enabled: !!urlSelectedCoin,
  });
  console.log("randomCoinChart: ", randomCoinChart);
  console.log("selectedCoinChart: ", selectedCoinChart);

  const randomCoin = useMemo(() => {
    return allCoins.find((c) => c.id === randomCoinId);
  }, [allCoins, randomCoinId]);

  const selectedCoin = useMemo(() => {
    return allCoins.find((c) => c.id === selectedCoinId);
  }, [allCoins, selectedCoinId]);

  const ratioChart = computePerfSpreadChart(
    selectedCoinChart?.prices ?? [],
    randomCoinChart?.prices ?? []
  );

  const chartConfig = {
    coinAmount: {
      label:
        selectedCoin?.name?.toUpperCase() +
          " VS " +
          randomCoin?.name?.toUpperCase() || "Coin",
      color: "#FF6B6B",
    },
    currencyAmount: {
      label: currency.code.toUpperCase(),
      color: "#6BCB77",
    },
  };

  if (isLoadingSelectCoin || isLoadingRandomCoin) {
    return (
      <div className="  dark:bg-[#1F1D2280] w-full rounded-3xl">
        <Skeleton className="h-80 w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="w-full z-20">
      <RadioDurations setDays={setDays} days={days} />

      <BackgroundGradient className=" rounded-3xl dark:bg-zinc-900 gap-6  ">
        <Card className="rounded-3xl">
          <CardHeader>
            <div className="flex gap-2 text-white">
              <CardTitle>Performance spread </CardTitle>
            </div>
            <CardDescription className="text-gray-300">
              {selectedCoin?.name?.toUpperCase()} vs{" "}
              {randomCoin && randomCoin.name.toUpperCase()} over {days} day
              {days !== "1" && "s"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ChartContainer config={chartConfig}>
              <div className="flex w-full justify-center text-xs h-[400px] ">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={ratioChart}
                    margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                  >
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
                          stopColor="#FF6B6B"
                          stopOpacity={0.5}
                        />
                        <stop
                          offset="100%"
                          stopColor="#1F1F38"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                    </defs>

                    {days === "7" ||
                      days === "1" ||
                      (days === "30" && (
                        <XAxis
                          dataKey="date"
                          stroke="#D0D0D1"
                          tickLine={false}
                          axisLine={false}
                          interval={0}
                          padding={{ left: 15, right: 15 }}
                          tickMargin={8}
                        />
                      ))}
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Area
                      type="monotone"
                      dataKey="spread"
                      stroke="#FF6B6B"
                      fill="url(#coinGradient)"
                      fillOpacity={1}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </CardContent>
        </Card>
      </BackgroundGradient>
      {isErrorRandomCoin && (
        <AlertError
          errorName={"Random coin chart"}
          networkError={errorRandomCoin}
          refetch={refetchRandomCoin}
        />
      )}
      {isErrorSelectCoin && (
        <AlertError
          errorName={"Selected coin chart"}
          networkError={errorSelectCoin}
          refetch={refetchSelectCoin}
        />
      )}
    </div>
  );
};
