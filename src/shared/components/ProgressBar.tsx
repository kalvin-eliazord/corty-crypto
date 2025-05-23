import clsx from "clsx";

type ProgressBarProps = {
  progressBarColor: string;
  data: string | number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progressBarColor,
  data,
}) => {
  return (
    <div className="flex items-center gap-1">
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
  );
};
