import { CoinType, Currency } from "@/shared/types/coins";
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
import { useSmartQuery } from "@/shared/hooks/useSmartQuery";
import { fetchApiClient } from "@/shared/utils/fetchApiClient";
import { AlertError } from "@/shared/components/AlertError";

type CoinsSliderProps = {
  coinId: string;
  setCoinId(coinId: string): void;
  currency: Currency;
};

export const CoinsSlider: React.FC<CoinsSliderProps> = ({
  coinId,
  setCoinId,
  currency,
}: CoinsSliderProps) => {
  const url = currency.code
    ? `coins/markets?vs_currency=${currency.code}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    : "";

  const {
    data: allCoins,
    isError,
    isLoading,
    error,
    refetch,
  } = useSmartQuery({
    queryKey: ["allCoinsMarket", url],
    queryFn: () => fetchApiClient<CoinType[]>(url),
    enabled: !!url,
  });

  if (isLoading) {
    return (
      <div className="w-full flex gap-x-8 p-3">
        {Array.from({ length: 10 }, (_, i) => (
          <Skeleton className="h-12 w-full rounded mr-8" key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    <AlertError
      errorName={"Coins Slider"}
      networkError={error}
      refetch={refetch}
    />;
  }

  return (
    <div className="w-full sm:mt-0 mt-5 ">
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
                      className="flex items-center gap-3 px-4 py-[7px] dark:bg-[#1E1D23] dark:border-t rounded-lg hover:cursor-pointer"
                      currency={currency}
                    />
                  </BackgroundGradient>
                ) : (
                  <Coin
                    coinId={coinId}
                    coin={coin}
                    setCoinId={setCoinId}
                    className="flex items-center gap-3 px-4 py-2 dark:bg-[#1E1D23] opacity-80 dark:opacity-80 dark:hover:opacity-100 hover:opacity-100 bg-gray-700 rounded-lg hover:cursor-pointer "
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
