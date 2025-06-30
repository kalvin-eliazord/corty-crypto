import VerticalHeaderLine from "@/assets/vertical-header-line.svg";
import VerticalHeaderLineBlack from "@/assets/vertical-header-line-black.svg";

import { Progress } from "@/components/ui/progress";

type MarketItemProps = {
  data: number | string;
  name?: string | null;
  Icon?: React.ElementType;
  progressBarColor?: string;
  isVerticalHeaderLine: boolean;
  isThemeDark: boolean;
};

export const MarketItem = ({
  data,
  name,
  Icon,
  progressBarColor,
  isVerticalHeaderLine,
  isThemeDark,
}: MarketItemProps) => {
  const valueCasted = typeof data === "string" ? parseFloat(data) : data;

  return (
    <div className="flex items-center gap-2">
      {Icon && (
        <Icon className="icon transition-transform duration-300 hover:-rotate-36" />
      )}
      {name && (
        <span className="label dark:text-gray-200 text-white">{name}</span>
      )}

      <span
        className={`dark:text-white text-black/50 ${
          progressBarColor ? "value" : "mr-6 value text-nowrap"
        }`}
      >
        {data}
      </span>
      {progressBarColor && (
        <div className="mr-5 h-2 w-24 bg-gray-600 rounded-full overflow-hidden">
          {progressBarColor && (
            <Progress indicatorColor={progressBarColor} value={valueCasted} />
          )}
        </div>
      )}
      {isVerticalHeaderLine &&
        (isThemeDark ? <VerticalHeaderLine /> : <VerticalHeaderLineBlack />)}
    </div>
  );
};
