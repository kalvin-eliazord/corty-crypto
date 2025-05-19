import GreenTriangle from "@/assets/green-triangle.svg";
import RedTriangle from "@/assets/red-triangle.svg";

type OneHourPercentageProps = {
  percentage: number | undefined;
};

export const OneHourPercentage: React.FC<OneHourPercentageProps> = ({
  percentage,
}) => {
  if (!percentage || isNaN(percentage)) {
    return (
      <div className="flex items-center gap-2">
        <RedTriangle /> <span className="text-gray-500">0.00%</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {percentage > 0 ? <GreenTriangle /> : <RedTriangle />}
      <span className={percentage > 0 ? "text-green-500" : "text-red-500"}>
        {Math.abs(percentage).toFixed(2)}%
      </span>
    </div>
  );
};