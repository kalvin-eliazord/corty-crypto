import { BarChart, Bar, XAxis } from "recharts";
import { ChartProps } from "../types/coinTypes";
import { formatDataChart } from "../types/formatDataCharts";

export const VolumeChart: React.FC<ChartProps> = ({ data, status, error }) => {
  if (status === "rejected" && error) {
    return <>Error : {error}</>;
  }

  if (status === "pending") {
    return <> Volumes loading </>;
  }

  const total_volumes =
    data?.total_volumes && formatDataChart(data.total_volumes);

  return (
    <div>
      <BarChart width={790} height={420} data={total_volumes} barSize={10}>
        <XAxis dataKey="day" padding={{ left: 20, right: 20 }} />

        <Bar dataKey="mainData" fill="lightblue" />
      </BarChart>
    </div>
  );
};
