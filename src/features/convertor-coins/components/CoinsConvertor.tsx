import { useEffect, useState } from "react";
import { CoinType, Currency } from "@/shared/types/coins";
import { ArrowLeftRight } from "lucide-react";
import { CoinConvertorPart } from "./CoinConvertorPart";
import { isDotAtTheEnd } from "@/shared/utils/isDotAtTheEnd";
import { getExchangeRate } from "../utils/getExchangeRate";

type CoinsConvertorProps = {
  selectedCoinId: string;
  setSelectedCoinId: (selectedCoinId: string) => void;
  randomCoinId: string;
  setRandomCoinId: (randomCoinId: string) => void;
  currency: Currency;
  allCoins: CoinType[];
  isError: boolean;
  isLoading: boolean;
  handleArrowsClick: () => void;
};

export const CoinsConvertor: React.FC<CoinsConvertorProps> = ({
  selectedCoinId,
  currency,
  allCoins,
  randomCoinId,
  isError,
  isLoading,
  setSelectedCoinId,
  setRandomCoinId,
  handleArrowsClick,
}) => {
  const { code } = currency;
  const [leftCoinInput, setLeftCoinInput] = useState<string>("1");
  const [rightCoinInput, setRightCoinInput] = useState<string>("1");

  useEffect(() => {
    if (!leftCoinInput || !leftCoinInput.trim() || !parseFloat(leftCoinInput)) {
      return;
    }

    const exchangeRate = getExchangeRate(
      leftCoinInput,
      selectedCoinId,
      randomCoinId,
      allCoins
    );

    setRightCoinInput(exchangeRate);
  }, [selectedCoinId, randomCoinId, allCoins, leftCoinInput]);

  const handleLeftChangeCoinsAmount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isDotAtTheEnd(leftCoinInput, e)) return;

    setLeftCoinInput(e.target.value.trim());
  };

  const handleRightChangeCoinsAmount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isDotAtTheEnd(rightCoinInput, e)) return;

    const valueInput = e.target.value.trim();

    const exchangeRate = getExchangeRate(
      valueInput,
      randomCoinId,
      selectedCoinId,
      allCoins
    );

    setRightCoinInput(valueInput);
    setLeftCoinInput(exchangeRate);
  };

  return (
    <div className="w-full z-20">
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

        <div className="relative">
          <div className="absolute border bg-white/10 rounded-full p-3 sm:p-2 z-40 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
            <ArrowLeftRight
              width={32}
              height={32}
              className=" transition-transform duration-300 hover:-rotate-36 z-20 hover:cursor-pointer"
              onClick={handleArrowsClick}
              color="white"
            />
          </div>
        </div>
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
