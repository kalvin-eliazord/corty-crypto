import { useEffect, useState } from "react";
import { CoinType, Currency } from "@/shared/types/coins";
import { ArrowLeftRight } from "lucide-react";
import { CoinConvertorPart } from "./CoinConvertorPart";
import { isDotAtTheEnd } from "@/shared/utils/isDotAtTheEnd";
import { getExchangeRate } from "../utils.ts/getExchangeRate";

type CurrencyCoinProps = {
  selectedCoinId: string;
  setSelectedCoinId: (selectedCoinId: string) => void;
  randomCoinId: string;
  setRandomCoinId: (randomCoinId: string) => void;
  currency: Currency;
  allCoins: CoinType[];
  isError: boolean;
  isLoading: boolean;
};

export const CurrencyConvertor: React.FC<CurrencyCoinProps> = ({
  selectedCoinId,
  currency,
  allCoins,
  randomCoinId,
  isError,
  isLoading,
  setSelectedCoinId,
  setRandomCoinId,
}) => {
  const { code } = currency;
  const [leftCoinInput, setLeftCoinInput] = useState<string>("1");
  const [rightCoinInput, setRightCoinInput] = useState<string>("1");

  useEffect(() => {
    setRightCoinInput(getExchangeRate(selectedCoinId, randomCoinId, allCoins));
  }, [selectedCoinId, randomCoinId, allCoins]);

  const handleLeftChangeCoinsAmount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isDotAtTheEnd(leftCoinInput, e)) return;

    const exchangeRate = getExchangeRate(
      selectedCoinId,
      randomCoinId,
      allCoins
    );
    if (!exchangeRate) return;

    setLeftCoinInput(e.target.value.trim());
    setRightCoinInput(exchangeRate);
  };

  const handleRightChangeCoinsAmount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isDotAtTheEnd(rightCoinInput, e)) return;

    const exchangeRate = getExchangeRate(
      randomCoinId,
      selectedCoinId,
      allCoins
    );
    if (!exchangeRate) return;

    setRightCoinInput(e.target.value.trim());
    setLeftCoinInput(exchangeRate);
  };

  return (
    <div className="w-full mb-15">
      <div className="flex sm:flex-row flex-col items-center justify-between gap-2">
        <CoinConvertorPart
          label={"You sell"}
          currencyCode={code}
          selectedCryptoId={selectedCoinId}
          inputState={leftCoinInput}
          handleInputChange={handleLeftChangeCoinsAmount}
          allCoins={allCoins}
          setSelectedCoinId={setSelectedCoinId}
          isError={isError}
          isLoading={isLoading}
        />

        <ArrowLeftRight width={60} height="auto" className="self-center mt-3" />

        <CoinConvertorPart
          label={"You buy"}
          currencyCode={code}
          inputState={rightCoinInput}
          selectedCryptoId={randomCoinId}
          handleInputChange={handleRightChangeCoinsAmount}
          allCoins={allCoins}
          setSelectedCoinId={setRandomCoinId}
          isError={isError}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};