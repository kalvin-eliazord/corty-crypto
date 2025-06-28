import { AllCoinsProps, CoinType } from "@/shared/types/coins";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Coin } from "./Coin";

type CoinsSliderProps = AllCoinsProps & {
  coinId: string;
  setCoinId(coinId: string): void;
};

export const CoinsSlider: React.FC<CoinsSliderProps> = ({
  allCoins,
  coinId,
  setCoinId,
  currency,
  isLoading,
}: CoinsSliderProps) => {
  if (isLoading) {
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
                {coinId === coin.id ? (
                  <BackgroundGradient rounded="lg" isBlurred={false}>
                    <Coin
                      coinId={coinId}
                      setCoinId={setCoinId}
                      coin={coin}
                      className="flex items-center gap-3 px-4 py-[7px] dark:bg-[#1E1D23] dark:border-t rounded-lg hover:cursor-pointer "
                      currency={currency}
                    />
                  </BackgroundGradient>
                ) : (
                  <Coin
                    coinId={coinId}
                    coin={coin}
                    setCoinId={setCoinId}
                    className="flex items-center gap-3 px-4 py-2 dark:bg-[#1F1D2280] bg-gray-700 rounded-lg hover:cursor-pointer"
                    currency={currency}
                  />
                )}
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
