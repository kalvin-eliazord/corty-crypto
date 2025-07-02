import React, { useMemo } from "react";
import {
  XAxis,
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { HeaderChart } from "./HeaderChart";
import { formatMarketChart } from "../utils/formatMarketChart";
import { ChartProps } from "../types/charts";
import { formatAmountUnit } from "@/shared/utils/formatAmount";
import { getLastPrice } from "../utils/getLastPrice";

export const PriceChart: React.FC<ChartProps> = ({
  selectedCoinData,
  comparedCoinData,
  currency,
  selectedCoin,
  comparedCoin,
}) => {
  const coinsPrices = useMemo(() => {
    return formatMarketChart(
      selectedCoinData?.prices,
      comparedCoinData?.prices
    );
  }, [selectedCoinData?.prices, comparedCoinData?.prices]);

  return (
    <div className=" dark:bg-[#1F1D2280] bg-white/15 p-5 rounded-xl border-t border-l border-r border-white/40 dark:border-white/10 w-full shadow-xl h-full">
      <HeaderChart
        selectedCoinMainValueChart={getLastPrice(selectedCoinData?.prices)}
        comparedCoinDataMainValueChart={getLastPrice(comparedCoinData?.prices)}
        currency={currency}
        selectedCoin={selectedCoin}
        comparedCoin={comparedCoin}
      />

      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={coinsPrices}>
            <defs>
              <linearGradient
                id="firstAmountGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#FF6B6B" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#1F1F38" stopOpacity={0.2} />
              </linearGradient>

              {comparedCoinData && (
                <linearGradient
                  id="comparedAmountGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#71DDD8" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#568AC7" stopOpacity={0.2} />
                </linearGradient>
              )}
            </defs>

            <XAxis
              dataKey="day"
              stroke="#D0D0D1"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              yAxisId="left"
              domain={["dataMin", "dataMax"]}
              stroke="#FF6B6B"
              hide
            />

            {comparedCoinData && (
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={["dataMin", "dataMax"]}
                stroke="#568AC7"
                hide
              />
            )}
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                border: "none",
                color: "white",
                borderRadius: "5px",
                backdropFilter: "blur(3px)",
              }}
              formatter={(value: number) => {
                return [
                  `${currency.symbol}${formatAmountUnit(value)}
    `,
                  "Price",
                ];
              }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="firstAmount"
              stroke="#FF6B6B"
              fillOpacity={1}
              fill="url(#firstAmountGradient)"
              strokeWidth={5}
            />

            {comparedCoinData && (
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="comparedAmount"
                stroke="#568AC7"
                fillOpacity={1}
                fill="url(#comparedAmountGradient)"
                strokeWidth={5}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
