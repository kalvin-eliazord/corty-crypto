type AssetPercentageProps = {
  percentage: number;
  label: string;
}

export const AssetPercentage = ({ percentage, label }: AssetPercentageProps) => {
  const color = percentage > 0 ? "#43FFC7" : "#FF5252";

  return (
    <div className="flex flex-col w-full border hover:border-gray-500 rounded-xl p-2.5">
      <span
        className="text-lg font-medium"
        style={{ color }}
      >
        {percentage.toFixed(2)}%
      </span>
      <span className="dark:text-gray-400 text-gray-200 text-sm">{label}</span>
    </div>
  );
};