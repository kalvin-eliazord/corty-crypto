import { formatTrillionAmount } from "../utils/formatTrillionAmount";
import { RootState } from "@/shared/store";
import { useSelector } from "react-redux";
import { selectMarketData } from "../utils/selectMarketData";
import FlashCircle from "@/assets/flash-circle.svg";
import Exchange from "@/assets/exchange.svg";
import GreenTriangle from "@/assets/green-triangle.svg";
import RedTriangle from "@/assets/red-triangle.svg";
import Btc from "@/assets/btc.svg";
import Eth from "@/assets/eth.svg";
import { MarketItem } from "./MarketItem";
import { formatNumberWithUnits } from "../utils/formatNumberWithUnits";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertError } from "@/shared/components/AlertError";
import { useSmartQuery } from "@/shared/hooks/useSmartQuery";
import { fetchApiClient } from "@/shared/utils/fetchApiClient";
import { MarketInfo } from "../types/marketInfo";
import { useTheme } from "next-themes";

const responsiveVisibilityClasses = [
  "hidden sm:flex",
  "hidden lg:flex",
  "hidden lg:flex",
  "hidden lg:flex",
  "flex",
  "flex",
];

export const MarketCoins = () => {
  const { resolvedTheme } = useTheme();
  const { code, symbol } = useSelector((state: RootState) => state.currency);

  const { data, isLoading, isError, error, refetch } = useSmartQuery({
    queryKey: ["marketInfo"],
    queryFn: () => fetchApiClient<MarketInfo>("global"),
  });

  const {
    activeCryptos,
    exchanges,
    totalMarketCap,
    totalVolume,
    btcMarketCapPercentage,
    ethMarketCapPercentage,
  } = selectMarketData(data, code);

  const marketheaders = [
    {
      Icon: FlashCircle,
      data: activeCryptos.toString(),
      name: "Coins",
      toolTipContent:
        "Number of cryptocurrencies currently active on the market.",
    },
    {
      Icon: Exchange,
      data: exchanges.toString(),
      name: "Exchange",
      toolTipContent: "Number of cryptocurrency exchanges currently tracked.",
    },
    {
      Icon: totalMarketCap > 0 ? GreenTriangle : RedTriangle,
      data: formatTrillionAmount(totalMarketCap),
      toolTipContent:
        "Combined market capitalization of all cryptocurrencies, in " +
        code.toUpperCase(),
    },
    {
      data: `${symbol} ${formatNumberWithUnits(totalVolume)}`,
      toolTipContent:
        "Total trading volume across all cryptocurrencies in the last 24 hours, in " +
        code.toUpperCase(),
    },
    {
      Icon: Btc,
      data: `${Math.floor(btcMarketCapPercentage)}%`,
      progressBarColor: "bg-orange-400",
      toolTipContent:
        "Bitcoin's share of the total cryptocurrency market capitalization.",
    },
    {
      Icon: Eth,
      data: `${Math.floor(ethMarketCapPercentage)}%`,
      progressBarColor: "bg-blue-400",
      toolTipContent:
        "Ethereum's share of the total cryptocurrency market capitalization.",
    },
  ];

  if (isLoading) {
    return (
      <div className="w-full  ">
        <ul className="flex gap-x-8 p-2 dark:bg-slate-800 bg-gradient-to-r dark:from-orange-900 dark:via-purple-900 dark:via-blue-900 dark:to-indigo-900 from-gray-400 to-gray-300 via-blue-100 to-gray-400 p-4 border-t border-b border-black-600 sm:px-35">
          {Array.from({ length: 6 }, (_, i) => (
            <li className="sm:first:ml-10" key={i}>
              <Skeleton className="h-7 w-20 rounded" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ul className="flex sm:gap-8 gap-4 overflow-hidden bg-gradient-to-r dark:from-orange-900 dark:via-purple-900 dark:via-blue-900 dark:to-indigo-900 from-gray-400 to-gray-300 via-blue-100 to-gray-400  border-t border-b border--600 shadow-lg py-4 p-3 lg:px-35">
        {marketheaders.map((marketHeader, i) => {
          const visibilityClass = responsiveVisibilityClasses[i] || "hidden";
          return (
            <li
              key={marketHeader.data + i}
              className={`sm:first:ml-10 transition-opacity duration-300 ${visibilityClass}`}
            >
              <MarketItem
                Icon={marketHeader.Icon}
                data={marketHeader.data}
                name={marketHeader.name}
                progressBarColor={marketHeader.progressBarColor}
                isVerticalHeaderLine={i !== marketheaders.length - 1}
                isThemeDark={resolvedTheme === "dark"}
                toolTipContent={marketHeader.toolTipContent}
              />
            </li>
          );
        })}
      </ul>

      {isError && (
        <AlertError
          errorName={"Market coins"}
          networkError={error}
          refetch={refetch}
        />
      )}
    </div>
  );
};
