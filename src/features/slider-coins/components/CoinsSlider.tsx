import { AllCoinsProps, CoinType } from "@/shared/types/coins";
//import { formatAmount } from "@/shared/utils/formatAmount";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { OneHourPercentage } from "@/shared/components/OneHourPercentage";
import { formatAmount } from "@/shared/utils/formatAmount";
import { Skeleton } from "@/components/ui/skeleton";

type CoinsSliderProps = AllCoinsProps & {
  coinId: string;
  setCoinId(coinId: string): void;
};

export const CoinsSlider: React.FC<CoinsSliderProps> = ({
  allCoins,
  status,
  error,
  coinId,
  setCoinId,
  currency,
}: CoinsSliderProps) => {
  if (status === "rejected") {
    return (
      <div className="flex-1 dark:bg-[#1F1D2280] p-5 rounded-xl border-t border-l border-r w-full text-center">
        {" "}
        Coins Slider fetching rejected : {error}
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="w-full flex gap-x-8 p-3">
        {Array.from({ length: 10 }, (_, i) => (
          <Skeleton className="h-12 w-full rounded mr-8" key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {allCoins &&
            allCoins.map((coin: CoinType) => (
              <CarouselItem key={coin.id} className="basis-auto">
                <div
                  className={
                    coinId === coin.id
                      ? "flex items-center gap-3 px-4 py-2 bg-[#1E1D23] border-t rounded-lg hover:cursor-pointer"
                      : "flex items-center gap-3 px-4 py-2 bg-[#1F1D2280] rounded-lg hover:cursor-pointer"
                  }
                  onClick={() => setCoinId(coin.id)}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={coin.image}
                      alt={`${coin.name} logo`}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <span className="text-gray-200 font-medium">
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </span>
                      <div className="flex gap-2 text-gray-400">
                        {formatAmount(coin.current_price)} {currency?.symbol}
                        <OneHourPercentage
                          percentage={
                            coin.price_change_percentage_1h_in_currency
                          }
                          color={
                            coin.price_change_percentage_1h_in_currency > 0
                              ? "#00F5E4"
                              : "#FF0061"
                          }
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-1"></div>
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
