import { Line, XAxis, AreaChart, Area } from "recharts";
import { ChartProps } from "../types/coinTypes";
import { formatDataChart } from "../types/formatDataCharts";
import { HeaderChart } from "./HeaderChart";

export const PriceChart: React.FC<ChartProps> = ({ data, status, error }) => {
  if (status === "rejected" && error) {
    return <>Error : {error}</>;
  }

  if (status === "pending") {
    return <>isLoading</>;
  }

  const prices = data?.prices && formatDataChart(data.prices);

  return (
    <div>
      <HeaderChart name={"Price"} data={""}></HeaderChart>

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
          dataKey="mainData"
          stroke="green"
          activeDot={{ r: 8 }}
        />
        <defs>
          <linearGradient id="mainData" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="lightGreen" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="mainData"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#mainData)"
        />
        <XAxis dataKey="day" padding={{ left: 20, right: 20 }} />
      </AreaChart>
    </div>
  );
};
