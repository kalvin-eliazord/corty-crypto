import { ProgressBar } from "@/shared/components/ProgressBar";
import { MarketItemProps } from "../types/marketInfo";
import VerticalHeaderLine from "@/assets/vertical-header-line.svg";

export const MarketItem = ({
  data,
  name,
  Icon,
  progressBarColor,
  isVerticalHeaderLine,
}: MarketItemProps) => {
  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon className="icon" />}
      {name && <span className="label text-gray-200">{name}</span>}

      <span className={progressBarColor ? "value" : "mr-6 value text-nowrap"}>
        {data}
      </span>
      {progressBarColor && (
          <div className="mr-5 h-2 w-24 bg-gray-600 rounded-full overflow-hidden">
          {progressBarColor && <ProgressBar progressBarColor={progressBarColor} data={data} />}
        </div>
      )}
      {isVerticalHeaderLine && <VerticalHeaderLine />}
    </div>
  );
};
