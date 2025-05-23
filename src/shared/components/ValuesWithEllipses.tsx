import clsx from "clsx";
import Ellipse from "@/assets/ellipse.svg";

type ValuesWithEllipsesProps = {
  current: string;
  total: string;
  color: string;
};

export const ValuesWithEllipses: React.FC<ValuesWithEllipsesProps> = ({
  current,
  total,
  color,
}) => {
  return (
    <div className="flex w-full justify-between ">
      <div className="flex gap-1 items-center">
        <Ellipse
          className={clsx({
            "fill-[#1CB385]": color === "#1CB385",
            "fill-[#FF5252]": color === "#FF5252",
            "fill-[#43FFC7]": color === "#43FFC7",
          })}
        />
        <span className="text-sm leading-none">{current}</span>
      </div>

      <div className="flex gap-1 items-center">
        <Ellipse className="fill-gray-500" />
        <span>{total}</span>
      </div>
    </div>
  );
};
