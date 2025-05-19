import React from "react";
import { XAxis, AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { HeaderChart } from "./HeaderChart";
import { formatMarketChart } from "../utils/formatMarketChart";
import { ChartProps } from "../types/charts";

export const PriceChart: React.FC<ChartProps> = ({
  data,
  status,
  error,
  currencyInfo,
  coin,
}) => {
  if (status === "rejected" && error) {
    return <>Error : {error}</>;
  }

  if (status === "pending") {
    return <>isLoading</>;
  }

  const prices = data && formatMarketChart(data.prices);
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {prices && (
        <HeaderChart
          name={coin?.symbol.toUpperCase()}
          marketChart={prices[prices.length - 1]}
          currencyInfo={currencyInfo}
          coin={coin}
        />
      )}

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={prices}
          margin={{ top: 40, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="amountGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#1F1F38" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            stroke="#8884d8"
          />
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
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
