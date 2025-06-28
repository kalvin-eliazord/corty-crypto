import { Skeleton } from "@/components/ui/skeleton";

export const CoinDetailsSkeleton = () => {
  return (
    <>
      <div className="w-full h-full gap-5 sm:flex mb-20">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-50 w-60 " />
          <Skeleton className="h-10 w-60" />
        </div>
        <div className="flex w-full">
          <Skeleton className="h-50 w-90 " />
          <Skeleton className="h-50 w-full ml-80" />
        </div>
      </div>
      <div className="w-full flex">
        <Skeleton className="h-50 w-220 " />
        <Skeleton className="h-50 w-full ml-80" />
      </div>
    </>
  );
};