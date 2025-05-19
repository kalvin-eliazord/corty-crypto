import clsx from "clsx";
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

      <span className={progressBarColor ? "value" : "mr-6 value"}>{data} </span>
      {progressBarColor && (
        <div className="relative flex items-center gap-1">
          <div className="mr-5 h-2 w-24 bg-gray-600 rounded-full overflow-hidden">
            <div
              className={clsx("h-full", {
                "bg-blue-400": progressBarColor === "blue",
                "bg-orange-400": progressBarColor === "orange",
                "bg-white": progressBarColor === "white",
              })}
              style={{ width: data }}
            />
          </div>
        </div>
      )}
      {isVerticalHeaderLine && <VerticalHeaderLine />}
    </div>
  );
};