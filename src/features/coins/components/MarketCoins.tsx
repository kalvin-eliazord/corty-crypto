import { useFetchCoinData } from "@/shared/hooks/useFetchCoinData";
import { formatTrillionAmount } from "../utils/formatTrillionAmount";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { MarketInfo } from "../types/marketInfo";
import { selectMarketData } from "../utils/selectMarketData";
import { useMemo } from "react";
import FlashCircle from "@/assets/flash-circle.svg";
import Exchange from "@/assets/exchange.svg";
import GreenTriangle from "@/assets/green-triangle.svg";
import RedTriangle from "@/assets/red-triangle.svg";
import Btc from "@/assets/btc.svg";
import Eth from "@/assets/eth.svg";
import { MarketItem } from "./MarketItem";
import { formatNumberWithUnits } from "../utils/formatNumberWithUnits";

export const MarketCoins = () => {
  const { data, status } = useFetchCoinData<MarketInfo>("/global");
  const { currencyCode, currencyInfo } = useSelector(
    (state: RootState) => state.currency
  );

  const marketheaders = useMemo(() => {
    const {
      activeCryptos,
      exchanges,
      totalMarketCap,
      totalVolume,
      btcMarketCapPercentage,
      ethMarketCapPercentage,
    } = selectMarketData(data, currencyCode);

    return [
      { Icon: FlashCircle, data: activeCryptos.toString(), name: "Coins" },
      { Icon: Exchange, data: exchanges.toString(), name: "Exchange" },
      {
        Icon: totalMarketCap > 0 ? GreenTriangle : RedTriangle,
        data: formatTrillionAmount(totalMarketCap),
      },
      {
        data: `${currencyInfo.unit}${formatNumberWithUnits(totalVolume)}`,
      },
      {
        Icon: Btc,
        data: `${Math.floor(btcMarketCapPercentage)}%`,
        progressBarColor: "orange",
      },
      {
        Icon: Eth,
        data: `${Math.floor(ethMarketCapPercentage)}%`,
        progressBarColor: "blue",
      },
    ];
  }, [data, currencyCode, currencyInfo]);

  if (status === "pending") {
    return <div>isLoading</div>;
  }

  return (
    <div>
      <ul className="flex gap-x-8 p-2 dark:bg-slate-800 bg-gradient-to-r from-orange-900 via-purple-900 via-blue-900 to-indigo-900 p-4 border-t border-b border-black-600">
        {marketheaders.map((marketHeader, i) => (
          <li key={marketHeader.data} className={i === 0 ? "ml-10" : ""}>
            <MarketItem
              Icon={marketHeader.Icon}
              data={marketHeader.data}
              name={marketHeader.name}
              progressBarColor={marketHeader.progressBarColor}
              isVerticalHeaderLine={i !== marketheaders.length - 1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
