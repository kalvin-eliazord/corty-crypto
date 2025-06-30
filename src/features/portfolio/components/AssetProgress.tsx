import { Progress } from "@/components/ui/progress";

type AssetProgressProps = {
  dividend: number;
  divisor: number;
  label: string;
};

export const AssetProgress = ({
  dividend,
  divisor,
  label,
}: AssetProgressProps) => {
  const percentage = divisor !== 0 ? (dividend / divisor) * 100 : 0;
  const percentageFormatted = parseFloat(percentage.toFixed(2)).toString();

  const percentageColor = percentage > 0 ? "bg-[#43FFC7]" : "bg-[#FF5252]";

  return (
    <div className="w-full flex flex-col border rounded-xl p-2.5 hover:border-gray-700 dark:hover:border-gray-500">
      <div className="flex gap-4 items-center w-full">
        <span
          className="text-lg font-medium"
          style={{ color: percentageColor }}
        >
          {percentageFormatted}%
        </span>

        <Progress color={percentageColor} value={percentage} />
      </div>

      <span className="dark:text-gray-400 text-gray-200 text-sm max-w-full">
        {label}
      </span>
    </div>
  );
};
