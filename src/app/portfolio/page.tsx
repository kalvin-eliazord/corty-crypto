"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CoinType } from "@/shared/types/coins";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { OneHourPercentage } from "@/shared/components/OneHourPercentage";
import { saveToLocalStorage } from "@/features/portfolio/utils/localStorage";
import { useLocalStorage } from "@/features/portfolio/hooks/useLocalStorage";
import { formatAmountUnit } from "@/shared/utils/formatAmount";
import { AssetInfo } from "@/features/portfolio/components/AssetInfo";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { AssetProgress } from "@/features/portfolio/components/AssetProgress";
import { AssetPercentage } from "@/features/portfolio/components/AssetPercentage";
import {
  Asset,
  PortfolioType,
  FinalizedAsset,
  AllCoinsFinalized,
} from "@/features/portfolio/types/portfolio";
import { fetchPricePerDate } from "@/features/portfolio/utils/fetchPricePerDate";
import { formatAsset } from "@/features/portfolio/utils/formatAsset";
import { handleKeyDown } from "@/shared/utils/handleKeyDown";
import { isDotAtTheEnd } from "@/shared/utils/isDotAtTheEnd";
import { CoinIcon } from "@/shared/components/CoinIcon";
import { SearchCoins } from "@/features/search-coins/components/SearchCoins";
import { useSmartQuery } from "@/shared/hooks/useSmartQuery";
import { AlertError } from "@/shared/components/AlertError";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchApiClient } from "@/shared/utils/fetchApiClient";

export default function Portfolio() {
  const [selectedCoinId, setSelectedCoinId] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [amountInput, setAmountInput] = useState<string>("");
  const currency = useSelector((state: RootState) => state.currency);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [portfolio, setPortfolio] = useLocalStorage<PortfolioType>("portfolio");
  const [finalizedAsset, setFinalizedAsset] = useState<FinalizedAsset>({});

  const url = currency.code
    ? `coins/markets?vs_currency=${currency.code}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    : "";

  const {
    data: allCoins,
    isLoading: isLoadingAllCoins,
    isError: isErrorAllCoins,
    error: errorAllCoins,
    refetch: refetchAllCoins,
  } = useSmartQuery({
    queryKey: ["allCoinsMarket", url],
    queryFn: () => fetchApiClient<CoinType[]>(url),
    enabled: !!url,
  });

  const {
    data: pricesPerDate,
    isLoading: isLoadingPriceData,
    isError: isErrorPriceDate,
    error: errorPriceDate,
    refetch: refetchPriceDate,
  } = useSmartQuery({
    queryKey: ["pricesPerDate", portfolio, currency.code, allCoins],
    queryFn: () => fetchPricePerDate(portfolio, currency.code, allCoins),
    enabled: !!currency.code && !!portfolio && !!allCoins,
  });

  useEffect(() => {
    if (!pricesPerDate || pricesPerDate.length === 0) return;

    const finalizedAsset = formatAsset(pricesPerDate);
    setFinalizedAsset(finalizedAsset);
  }, [pricesPerDate]);

  const portfolioFiltered: AllCoinsFinalized[] | undefined =
    allCoins &&
    finalizedAsset &&
    allCoins
      .filter((coin: CoinType) => coin.id in finalizedAsset)
      .map((coin: CoinType) => {
        return { ...coin, ...finalizedAsset[coin.id] };
      });

  const handleSaveBtnClick = () => {
    if (!date || !selectedCoinId || !parseFloat(amountInput)) return;

    const newAsset: Asset = {
      id: selectedCoinId,
      amount: parseFloat(amountInput),
      date: format(date, "dd-MM-yyyy"),
    };

    setPortfolio((prev) => {
      const newPortfolio = [...prev];

      const index = prev.findIndex(
        (asset) => asset.id === newAsset.id && asset.date === newAsset.date
      );
      if (index !== -1) {
        newPortfolio[index] = {
          ...newPortfolio[index],
          amount: newPortfolio[index].amount + newAsset.amount,
        };
      } else {
        newPortfolio.push(newAsset);
      }

      saveToLocalStorage<PortfolioType>("portfolio", newPortfolio);
      return newPortfolio;
    });
    setAmountInput("");
    setSelectedCoinId("");
    setDate(new Date());
  };

  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDotAtTheEnd(amountInput, e)) return;

    setAmountInput(e.target.value.trim());
  };

  const handleCalendarBlur = () => {
    setTimeout(() => {
      setIsCalendarOpen((prev) => !prev);
    }, 250);
  };

  if (isLoadingAllCoins || isLoadingPriceData) {
    return (
      <>
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="flex flex-col flex-1 md:flex-row gap-8 w-full dark:bg-[#1F1D2280] p-5 rounded-3xl border-t border-l border-r mb-8"
          >
            <Skeleton className="h-50 w-full rounded-3xl" />
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <Dialog>
        <div className="flex justify-between mb-9">
          <h1 className="text-2xl text-white">Portfolio </h1>
          <DialogTrigger asChild>
            <Button variant="outline" className="z-10 text-white border-white">
              Add Asset
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent
          className="sm:max-w-[425px] dark:bg-[#262626] bg-gray-200"
          aria-description="Add Asset"
        >
          <DialogHeader>
            <DialogTitle className="dark:text-white text-gray-700">
              Add Asset
            </DialogTitle>
          </DialogHeader>
          <div className="relative w-full">
            <SearchCoins
              isSearchIcon={false}
              setSelectedCoinId={setSelectedCoinId}
              asLink={false}
            />
          </div>
          <Input
            type="text"
            inputMode="decimal"
            placeholder="Enter amount"
            value={amountInput}
            onChange={handleAmountInputChange}
            onKeyDown={handleKeyDown}
            className=" dark:bg-input/30 border "
          />

          <div className="relative w-full">
            <Button
              variant={"outline"}
              className={cn(
                "w-[250px] pl-3 text-left font-normal",
                !date && "text-muted-foreground"
              )}
              onClick={() => setIsCalendarOpen((prev) => !prev)}
            >
              {date && format(date, "d MMMM, yyyy")}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>

            {isCalendarOpen && (
              <Calendar
                className="absolute top-full bg-gray-200 dark:bg-[#1E1E26] rounded-xl border "
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                onDayBlur={handleCalendarBlur}
              />
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="submit"
                onClick={handleSaveBtnClick}
                disabled={!selectedCoinId || !parseFloat(amountInput)}
              >
                Buy
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div>
        <ul>
          {portfolioFiltered &&
            portfolioFiltered.map((savedCoin) => {
              const currentValue = savedCoin.amount * savedCoin.current_price;
              const profit = currentValue - savedCoin.totalCost;
              const percentage = (profit / savedCoin.totalCost) * 100;

              return (
                <li key={`${savedCoin.id}-${savedCoin.date}`} className="mb-9">
                  <BackgroundGradient className=" lg:flex rounded-3xl  dark:bg-[#1E1D23] sm:gap-6 p-5">
                    <div className="w-full flex flex-col gap-y-1 mb-4 lg:mb-0">
                      <div className="flex sm:gap-4 mb-2 sm:mb-7 items-center">
                        <CoinIcon
                          id={savedCoin.id}
                          image={savedCoin.image}
                          tailwindSize={"w-17 h-10"}
                        />
                        <span className="text-white text-xl sm:text-2xl font-medium sm:text-nowrap">
                          {savedCoin.name} ({savedCoin.symbol.toUpperCase()})
                        </span>
                      </div>
                      <span className="dark:text-white text-gray-200">
                        Amount
                      </span>

                      <div className="flex flex gap-2 ">
                        <span className="text-white text-2xl font-medium text-wrap">
                          {currency.symbol}
                          {savedCoin.amount &&
                            savedCoin.current_price &&
                            formatAmountUnit(
                              savedCoin.amount * savedCoin.current_price
                            )}
                        </span>
                        {percentage !== 0 && (
                          <OneHourPercentage
                            percentage={percentage}
                            color={percentage > 0 ? "#43FFC7" : "#FF5252"}
                          />
                        )}
                      </div>
                      <span className="dark:text-gray-400 text-gray-200 text-sm">
                        Purchased {savedCoin.date}
                      </span>
                    </div>

                    <div className="w-full flex flex-col gap-y-4 mb-4 sm:mb-0">
                      <AssetInfo
                        currencySymbol={currency.symbol}
                        currentPrice={savedCoin.current_price}
                        subtitle={"Current price"}
                      />
                      <AssetPercentage
                        percentage={savedCoin.market_cap_change_percentage_24h}
                        label={"24h%"}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-y-4">
                      <AssetProgress
                        dividend={savedCoin.total_volume}
                        divisor={savedCoin.market_cap}
                        label="Market cap vs volume"
                      />
                      <AssetProgress
                        dividend={savedCoin.circulating_supply}
                        divisor={savedCoin.total_supply}
                        label="Circ. vs max supply"
                      />
                    </div>
                  </BackgroundGradient>
                </li>
              );
            })}
        </ul>
        {isErrorAllCoins && (
          <AlertError
            errorName={"All coins market"}
            networkError={errorAllCoins}
            refetch={refetchAllCoins}
          />
        )}

        {isErrorPriceDate && (
          <AlertError
            errorName={"Price per date"}
            networkError={errorPriceDate}
            refetch={refetchPriceDate}
          />
        )}
      </div>
    </>
  );
}
