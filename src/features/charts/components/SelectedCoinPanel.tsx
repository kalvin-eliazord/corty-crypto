import { CoinsSlider } from "@/features/slider-coins/components/CoinsSlider";
import { CoinType, Currency } from "@/shared/types/coins";
import { Charts } from "./Charts";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import Compare from "@/assets/compare.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CoinBadge } from "@/features/slider-coins/components/CoinBadge ";

type SelectedCoinPanelProps = {
  currency: Currency;
  allCoins: CoinType[] | undefined;
};

export const SelectedCoinPanel = ({
  allCoins,
  currency,
}: SelectedCoinPanelProps) => {
  const [firstCoinId, setFirstCoinId] = useState<string>(
    allCoins?.[0].id ?? "bitcoin"
  );
  const [comparedCoinId, setComparedCoinId] = useState<string>("");
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const selectedCoin = useMemo(() => {
    return allCoins?.find((c: CoinType) => c.id === firstCoinId);
  }, [firstCoinId, allCoins]);

  const comparedCoin = useMemo(() => {
    return allCoins?.find((c: CoinType) => c.id === comparedCoinId);
  }, [comparedCoinId, allCoins]);

  const handleBtnClick = () => {
    setIsToggled((prev) => {
      const newState = !prev;
      if (!newState) {
        setComparedCoinId("");
      }

      return newState;
    });
  };

  const handleMainCoinClick = () => {
    setFirstCoinId(comparedCoinId);
    setComparedCoinId("");
  };

  const handleComparedCoinClick = () => {
    setComparedCoinId("");
  };

  return (
    <section
      aria-labelledby="coin-section-heading"
      className="w-full flex flex-col gap-8 sm:mt-0 mt-5 z-50"
    >
      <h2 id="coin-section-heading" className="sr-only">
        Selected Coin Charts
      </h2>

      <div className="flex gap-5 items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={!allCoins || allCoins.length === 0}
              onClick={handleBtnClick}
              variant="outline"
              className={`${
                isToggled ? "w-30" : "w-25"
              } text-white bg-white/15 dark:bg-[#1F1D2280] dark:border-white/20 border-white/40 shadow-md hover:bg-white/50 dark:hover:bg-white/30 hover:text-black/50 ${
                isToggled && "bg-white/50 dark:bg-white/30"
              }`}
            >
              <Compare /> {isToggled ? "Comparing" : "Compare"}
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>Click to start comparing 2 coins.</p>
          </TooltipContent>
        </Tooltip>

        {isToggled && selectedCoin && (
          <CoinBadge
            coin={selectedCoin}
            hover={!!selectedCoin && !!comparedCoin}
            onClick={comparedCoin && handleMainCoinClick}
          />
        )}

        {comparedCoin && (
          <CoinBadge
            coin={comparedCoin}
            hover={!!comparedCoin}
            onClick={handleComparedCoinClick}
          />
        )}
      </div>
      <CoinsSlider
        setCoinId={setFirstCoinId}
        coinId={firstCoinId}
        comparedCoinId={comparedCoinId}
        setComparedCoinId={setComparedCoinId}
        currency={currency}
        isToggled={isToggled}
      />

      <Charts
        currency={currency}
        selectedCoin={selectedCoin}
        comparedCoin={comparedCoin}
      />
    </section>
  );
};
