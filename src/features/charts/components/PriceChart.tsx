import { Line, XAxis, AreaChart, Area } from "recharts";
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
    <div>
      {prices && (
        <HeaderChart
          name={coin?.symbol.toUpperCase()}
          marketChart={prices[prices.length - 1]}
          currencyInfo={currencyInfo}
          coin={coin}
        ></HeaderChart>
      )}

      <AreaChart
        width={790}
        height={420}
        data={prices}
        margin={{
          top: 150,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Line
          type="monotone"
          dataKey="amount"
          stroke="green"
          activeDot={{ r: 8 }}
        />
        <defs>
          <linearGradient id="amount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="lightGreen" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#amount)"
        />
        <XAxis dataKey="day" padding={{ left: 20, right: 20 }} />
      </AreaChart>
    </div>
  );
};