import clsx from "clsx";
import Ellipse from "@/assets/ellipse.svg";

type ValuesWithEllipsesProps = {
  current: string;
  total: string;
  color: string;
};

export const  ValuesWithEllipses: React.FC<ValuesWithEllipsesProps> = ({
  current,
  total,
  color,
}) => {
  return (
    <div className="flex w-full justify-between text-xs max-w-[200px] mb-1 text-white">
      <div className="flex gap-1 items-center min-w-0 ">
        <Ellipse
          className={clsx({
            "fill-[#1CB385]": color === "#1CB385",
            "fill-[#FF5252]": color === "#FF5252",
            "fill-[#43FFC7]": color === "#43FFC7",
          })}
        />
        <span className=" leading-none truncate max-w-[100px] ">{current}</span>
      </div>

      <div className="flex gap-1 items-center min-w-0 ">
        <Ellipse className="fill-gray-500" />
        <span className="truncate max-w-[100px]">{total}</span>
      </div>
    </div>
  );
};
