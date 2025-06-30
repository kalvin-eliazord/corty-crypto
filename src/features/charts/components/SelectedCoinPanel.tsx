import { CoinsSlider } from "@/features/slider-coins/components/CoinsSlider";
import { CoinType, Currency } from "@/shared/types/coins";
import { Charts } from "./Charts";
import { useMemo } from "react";

type SelectedCoinPanelProps = {
  coinId: string;
  currency: Currency;
  allCoins: CoinType[] | undefined;
  setCoinId: (coinId: string) => void;
};

export const SelectedCoinPanel = ({
  allCoins,
  currency,
  setCoinId,
  coinId,
}: SelectedCoinPanelProps) => {
  const selectedCoin = useMemo(() => {
    return allCoins?.find((c: CoinType) => c.id === coinId);
  }, [coinId, allCoins]);

  return (
    <section
      aria-labelledby="coin-section-heading"
      className="w-full flex flex-col gap-8"
    >
      <h2 id="coin-section-heading" className="sr-only">
        Selected Coin Charts
      </h2>

      <CoinsSlider setCoinId={setCoinId} coinId={coinId} currency={currency} />

      <Charts
        coinId={coinId}
        currency={currency}
        selectedCoin={selectedCoin}
        setCoinId={setCoinId}
      />
    </section>
  );
};
