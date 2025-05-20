import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { HeaderChart } from "./HeaderChart";
import { formatMarketChart } from "../utils/formatMarketChart";
import { ChartProps } from "../types/charts";

export const VolumeChart: React.FC<ChartProps> = ({
  data,
  status,
  error,
  currencyInfo,
}) => {
  if (status === "rejected" && error) {
    return <>Error : {error}</>;
  }

  if (status === "pending") {
    return <> Volumes loading </>;
  }

  const total_volumes = data && formatMarketChart(data.total_volumes);
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {total_volumes && (
        <HeaderChart
          name={"Volume 24h"}
          marketChart={total_volumes[total_volumes.length - 1]}
          currencyInfo={currencyInfo}
        />
      )}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={total_volumes}
          barSize={20}
          margin={{ top: 40, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id="amountVolumeGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#71DDD8" stopOpacity={1} />
              <stop offset="100%" stopColor="#568AC7" stopOpacity={1} />
            </linearGradient>
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
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
            }}
          />
          <Bar dataKey="amount" fill="url(#amountVolumeGradient)" radius={3} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
