import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { HeaderChart } from "./HeaderChart";
import { formatMarketChart } from "../utils/formatMarketChart";
import { ChartProps } from "../types/charts";
import { formatAmountUnit } from "@/shared/utils/formatAmount";
import { getLastPrice } from "../utils/getLastPrice";
import { useMemo } from "react";

export const VolumeChart: React.FC<ChartProps> = ({
  selectedCoinData,
  comparedCoinData,
  currency,
}) => {
  const coinsVolumes = useMemo(() => {
    return formatMarketChart(
      selectedCoinData?.total_volumes,
      comparedCoinData?.total_volumes
    );
  }, [selectedCoinData?.total_volumes, comparedCoinData?.total_volumes]);

  return (
    <div className=" dark:bg-[#1F1D2280] bg-white/15 rounded-xl p-5 border-t border-l border-r border-white/40 dark:border-white/10 shadow-xl w-full h-full ">
      <HeaderChart
        name={"Volume 24h"}
        selectedCoinMainValueChart={getLastPrice(
          selectedCoinData?.total_volumes
        )}
        comparedCoinDataMainValueChart={getLastPrice(
          comparedCoinData?.total_volumes
        )}
        currency={currency}
      />
      <div className="h-60 mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={coinsVolumes} maxBarSize={35}>
            <defs>
              <linearGradient
                id="firstAmountVolGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#71DDD8" stopOpacity={1} />
                <stop offset="100%" stopColor="#568AC7" stopOpacity={1} />
              </linearGradient>

              {comparedCoinData && (
                <linearGradient
                  id="comparedAmountVolGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#FF6B6B" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#1F1F38" stopOpacity={0.2} />
                </linearGradient>
              )}
            </defs>

            <XAxis
              dataKey="day"
              axisLine={false}
              stroke="#D0D0D1"
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "none",
                color: "white",
                borderRadius: "5px",
                backdropFilter: "blur(3px)",
              }}
              formatter={(value: number) => {
                return [
                  `${currency.symbol}${formatAmountUnit(value)}
                  `,
                  "Volume",
                ];
              }}
            />
            <Bar
              dataKey="firstAmount"
              fill="url(#firstAmountVolGradient)"
              radius={3}
            />

            {comparedCoinData && (
              <Bar
                dataKey="comparedAmount"
                fill="url(#comparedAmountVolGradient)"
                radius={3}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
