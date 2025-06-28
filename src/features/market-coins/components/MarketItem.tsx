import { ProgressBar } from "@/shared/components/ProgressBar";
import VerticalHeaderLine from "@/assets/vertical-header-line.svg";

type MarketItemProps = {
  data: number | string;
  name?: string | null;
  Icon?: React.ElementType;
  progressBarColor?: string;
  isVerticalHeaderLine: boolean;
};

export const MarketItem = ({
  data,
  name,
  Icon,
  progressBarColor,
  isVerticalHeaderLine,
}: MarketItemProps) => {
  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon className="icon transition-transform duration-300 hover:-rotate-36" />}
      {name && (
        <span className="label dark:text-gray-200 text-white">{name}</span>
      )}

      <span
        className={`dark:text-white text-gray-700 ${
          progressBarColor ? "value" : "mr-6 value text-nowrap"
        }`}
      >
        {data}
      </span>
      {progressBarColor && (
        <div className="mr-5 h-2 w-24 bg-gray-600 rounded-full overflow-hidden">
          {progressBarColor && (
            <ProgressBar progressBarColor={progressBarColor} data={data} />
          )}
        </div>
      )}
      {isVerticalHeaderLine && <VerticalHeaderLine />}
    </div>
  );
};