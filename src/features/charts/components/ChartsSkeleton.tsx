import { Skeleton } from "@/components/ui/skeleton";

export const ChartsSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 md:flex-row gap-8 w-full">
      <div className="flex-1 dark:bg-[#1F1D2280] p-5 rounded-xl border-t border-l border-r border-white/40 dark:border-white/10">
        <Skeleton className="h-80 w-full rounded" />
      </div>
      <div className="flex-1 dark:bg-[#1F1D2280] p-5 rounded-xl border-t border-l border-r border-white/40 dark:border-white/10">
        <Skeleton className="h-80 w-full rounded" />
      </div>
    </div>
  );
};
