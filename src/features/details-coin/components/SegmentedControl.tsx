import { cn } from "@/lib/utils";

type SegmentedControlProps = {
  actions: string[];
  setSelectedAction: React.Dispatch<React.SetStateAction<string>>;
  selectedAction: string;
};

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  actions,
  setSelectedAction,
  selectedAction,
}) => {
  return (
    <div className="relative flex border-white/20 border rounded-lg text-white mr-6 w-45 p-5 mb-8 sm:mt-0 mt-5">
      <div
        className={`absolute top-2 bottom-2 
               rounded-lg bg-[#1E1D23] border-white/20 border-t border-l border-r
             transition-all duration-300 ease-in-out
          ${
            selectedAction === actions[0]
              ? "left-1 w-[calc(40%)]"
              : "left-20 w-[calc(49%)]"
          }`}
      />

      <div className="flex justify-between w-full text-sm font-medium ">
        {actions.map((action) => (
          <div
            key={action}
            onClick={() =>
              setSelectedAction(
                selectedAction === actions[0] ? actions[1] : actions[0]
              )
            }
            className={cn(
              "z-10 transition-colors hover:text-white/80 hover:cursor-pointer "
            )}
          >
            {action}
          </div>
        ))}
      </div>
    </div>
  );
};
