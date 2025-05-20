import { AllCoinsProps, CoinType } from "@/shared/types/coinTypes";
import { convertAmount } from "@/shared/utils/convertAmount";
import { formatAmount } from "@/shared/utils/formatAmount";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { OneHourPercentage } from "@/shared/components/OneHourPercentage";

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
  currencyInfo,
}: CoinsSliderProps) => {
  if (status === "rejected") {
    return <>hasError : {error}</>;
  }

  if (status === "pending") {
    return <>isLoading</>;
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
                      ? "flex items-center gap-3 px-4 py-2 bg-[#1E1D23] rounded-lg hover:cursor-pointer"
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
                        {formatAmount(
                          convertAmount(coin.current_price, currencyInfo?.value)
                        )}{" "}
                        {currencyInfo?.unit}
                        <OneHourPercentage
                          percentage={
                            coin.price_change_percentage_1h_in_currency
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
