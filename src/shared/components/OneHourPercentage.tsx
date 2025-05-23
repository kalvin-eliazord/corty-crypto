import clsx from "clsx";
import Triangle from "@/assets/triangle.svg";

type OneHourPercentageProps = {
  percentage: number | undefined;
  color: string;
};

export const OneHourPercentage: React.FC<OneHourPercentageProps> = ({
  percentage,
  color,
}) => {
  if (!percentage || isNaN(percentage)) {
    return (
      <div className="flex items-center gap-2">
        <Triangle /> <span className="text-gray-500">0.00%</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Triangle
        className={`${percentage > 0 ? "" : "scale-y-[-1]"}`}
        style={{ color }}
      />
      <span
        className={clsx({
                    "text-[#FF5252]": color === "#FF5252",
                    "text-[#43FFC7]":  color === "#43FFC7",
                    "text-[#FF0061]":  color === "#FF0061",
                    "text-[#00F5E4]":  color === "#00F5E4"})}
      >
        {Math.abs(percentage).toFixed(2)}%
      </span>
    </div>
  );
};
