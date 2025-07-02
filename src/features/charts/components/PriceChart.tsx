import React from "react";
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

export const PriceChart: React.FC<ChartProps> = ({
  data,
  currency,
  selectedCoin,
}) => {
  const prices = formatMarketChart(data?.prices);

  return (
    <div className=" dark:bg-[#1F1D2280] bg-white/15 p-5 rounded-xl border-t border-l border-r border-white/40 dark:border-white/10  w-full shadow-xl h-full">
      {prices && (
        <HeaderChart
          name={selectedCoin?.symbol.toUpperCase()}
          marketChart={prices[prices.length - 1]}
          currency={currency}
          selectedCoin={selectedCoin}
        />
      )}
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={prices}>
            <defs>
              <linearGradient id="amountGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B6B" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#1F1F38" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              stroke="#D0D0D1"
              axisLine={false}
              tickLine={false}
            />
            <YAxis domain={["dataMin", "dataMax"]} hide />

            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "transparent",
                border: "none",
                color: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#FF6B6B"
              fillOpacity={1}
              fill="url(#amountGradient)"
              strokeWidth={5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
