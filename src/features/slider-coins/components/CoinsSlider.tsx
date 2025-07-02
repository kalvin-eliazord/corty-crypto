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
  comparedCoinId?: string;
  setComparedCoinId?(coinId: string): void;
  currency: Currency;
  isToggled: boolean;
};

export const CoinsSlider: React.FC<CoinsSliderProps> = ({
  coinId,
  setCoinId,
  currency,
  comparedCoinId,
  setComparedCoinId,
  isToggled,
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

  if (isError || !allCoins) {
    return (
      <AlertError
        errorName={"Coins Slider"}
        networkError={error}
        refetch={refetch}
      />
    );
  }
  const currentCoinId =
    isToggled && comparedCoinId !== undefined ? comparedCoinId : coinId;

  const currentSetCoinId =
    isToggled && setComparedCoinId !== undefined
      ? setComparedCoinId
      : setCoinId;

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {allCoins.map((coin: CoinType) => (
            <CarouselItem key={coin.id} className="basis-auto">
              {coinId === coin.id || comparedCoinId === coin.id ? (
                <BackgroundGradient rounded="lg" isBlurred={false}>
                  <Coin
                    coinId={currentCoinId}
                    setCoinId={currentSetCoinId}
                    coin={coin}
                    className="py-[7px] dark:border-t"
                    currency={currency}
                  />
                </BackgroundGradient>
              ) : (
                <Coin
                  coinId={currentCoinId}
                  setCoinId={currentSetCoinId}
                  coin={coin}
                  className="py-2 dark:bg-white/10 hover:bg-gray-500 dark:hover:bg-white/30 bg-gray-700"
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
