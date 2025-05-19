import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
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
          barSize={10}
          margin={{ top: 40, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="day" />

          <Bar dataKey="amount" fill="lightblue" radius={8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
