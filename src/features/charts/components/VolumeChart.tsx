import { BarChart, Bar, XAxis } from "recharts";
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
    <div>
      {total_volumes && (
        <HeaderChart
          name={"Volume 24h"}
          marketChart={total_volumes[total_volumes.length - 1]}
          currencyInfo={currencyInfo}
        />
      )}
      <BarChart width={790} height={420} data={total_volumes} barSize={10}>
        <XAxis dataKey="day" padding={{ left: 20, right: 20 }} />

        <Bar dataKey="amount" fill="lightblue" />
      </BarChart>
    </div>
  );
};