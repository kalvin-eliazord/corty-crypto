import { Currency } from "@/shared/types/coins";
import { Cryptocurrency } from "../types/detailsCoins";
import Triangle from "@/assets/triangle.svg";
import { formatAmount } from "@/shared/utils/formatAmount";

type Triangle24HourProps = {
  cryptoData: Cryptocurrency | undefined;
  isHigh: boolean;
  currency: Currency;
};

export const Triangle24Hour = ({
  cryptoData,
  isHigh,
  currency,
}: Triangle24HourProps) => {
  if (!cryptoData) return null;

  let label = "";
  let color = "";
  let marketData24h = null;
  let marginRight = "";

  if (isHigh) {
    label = "high";
    color = "#43FFC7";
    marketData24h = cryptoData.market_data.high_24h;
    marginRight = "mr-4";
  } else {
    label = "low";
    color = "#FF5252";
    marketData24h = cryptoData.market_data.low_24h;
    marginRight = "mr-5";
  }

  const formattedMarketData = formatAmount(marketData24h[currency.code]);

  return (
    <div className="flex items-center w-full">
      <Triangle
        className={`${!isHigh && "scale-y-[-1]"} w-10`}
        style={{ color }}
      />
      <span className={marginRight}>24h {label}:</span>
      <span className="font-medium ">
        {currency.symbol}
        {formattedMarketData}
      </span>
    </div>
  );
};