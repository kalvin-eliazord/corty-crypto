"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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
import { removeDuplicates } from "@/features/portfolio/utils/removeDuplicates";
import { isValidCoin } from "@/features/portfolio/utils/isValidCoin";

export default function Portfolio() {
  const [selectedCoinId, setSelectedCoinId] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [amountInput, setAmountInput] = useState<string>("");
  const currency = useSelector((state: RootState) => state.currency);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [portfolio, setPortfolio] = useLocalStorage<PortfolioType>("portfolio");
  const [finalizedAsset, setFinalizedAsset] = useState<FinalizedAsset>({});

  const uniqueAssets = removeDuplicates(portfolio);

  const url =
    currency.code && uniqueAssets
      ? `coins/markets?vs_currency=${currency.code}&ids=${Object.keys(
          uniqueAssets
        ).join(",")}`
      : "";

  const {
    data: coinsData,
    isLoading: isLoadingAllCoins,
    isError: isErrorAllCoins,
    error: errorAllCoins,
    refetch: refetchAllCoins,
  } = useSmartQuery({
    queryKey: ["coinsData", url],
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
    queryKey: ["pricesPerDate", portfolio, currency.code, coinsData],
    queryFn: () => fetchPricePerDate(portfolio, currency.code, coinsData),
    enabled: !!currency.code && !!portfolio && !!coinsData,
  });

  useEffect(() => {
    if (!pricesPerDate || pricesPerDate.length === 0) return;

    const finalizedAsset = formatAsset(pricesPerDate);
    setFinalizedAsset(finalizedAsset);
  }, [pricesPerDate]);

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
            className="flex flex-col flex-1 md:flex-row gap-8 w-full dark:bg-[#1F1D2280] p-5 rounded-3xl mb-8"
          >
            <Skeleton className="h-50 w-full rounded-3xl" />
          </div>
        ))}
      </>
    );
  }

  const handleClickTrashBtn = (assetId: string) => {
    setPortfolio((prev) => {
      const portfolioFiltered = [...prev].filter(
        (asset) => asset.id !== assetId
      );
      saveToLocalStorage<PortfolioType>("portfolio", portfolioFiltered);
      return portfolioFiltered;
    });
  };

  return (
    <>
      <Dialog>
        <div className="flex justify-between mb-9 sm:mt-0 mt-5">
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
              isNavbar={false}
            />
          </div>
          <Input
            id="amount"
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
      <section>
        <ul>
          {Object.keys(finalizedAsset).map((assetId) => {
            const asset = finalizedAsset[assetId];
            if (!isValidCoin(asset)) {
              return null;
            }

            const currentValue = asset.amount * asset.current_price;
            const profit = currentValue - asset.totalCost;
            const percentage = (profit / asset.totalCost) * 100;

            return (
              <li key={`${assetId}-${asset.date}`} className="mb-9 relative ">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="absolute border rounded-full z-20 p-1 bg-white/20 hover:bg-red-500 hover:cursor-pointer right-0 top-0 sm:translate-x-2 translate-y-2">
                      <Trash2 color="white" />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Do you really want to delete this asset ?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="dark:text-gray-400 text-white/80">
                        This action cannot be undone. This will permanently
                        delete your{" "}
                        <span className="font-bold text-white">
                          {asset.name}
                        </span>{" "}
                        asset.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-white border-white">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleClickTrashBtn(assetId)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <BackgroundGradient className=" lg:flex rounded-3xl bg-white/30 dark:bg-[#1E1D23] sm:gap-6 p-5 shadow-2xl">
                  <div className="w-full flex flex-col gap-y-1 mb-4 lg:mb-0">
                    <div className="flex sm:gap-4 mb-2 sm:mb-7 items-center">
                      <CoinIcon
                        id={assetId}
                        image={asset.image}
                        tailwindSize={"w-17 h-10"}
                      />

                      <Link
                        className="text-white text-xl sm:text-2xl font-medium sm:text-nowrap hover:text-white/50"
                        href={`/coin/${assetId}`}
                      >
                        {asset.name} ({asset.symbol.toUpperCase()})
                      </Link>
                    </div>
                    <span className="dark:text-white text-gray-200">
                      Amount
                    </span>

                    <div className="flex flex gap-2 ">
                      <span className="text-white text-2xl font-medium text-wrap">
                        {currency.symbol}
                        {asset.amount &&
                          asset.current_price &&
                          formatAmountUnit(asset.amount * asset.current_price)}
                      </span>
                      {percentage !== 0 && (
                        <OneHourPercentage
                          percentage={percentage}
                          color={percentage > 0 ? "#43FFC7" : "#FF5252"}
                        />
                      )}
                    </div>
                    <span className="dark:text-gray-400 text-gray-200 text-sm">
                      Purchased {asset.date}
                    </span>
                  </div>

                  <div className="w-full flex flex-col gap-y-4 mb-4 sm:mb-0">
                    <AssetInfo
                      currencySymbol={currency.symbol}
                      currentPrice={asset.current_price}
                      subtitle={"Current price"}
                    />
                    <AssetPercentage
                      percentage={asset.market_cap_change_percentage_24h}
                      label={"24h%"}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-y-4">
                    <AssetProgress
                      dividend={asset.total_volume}
                      divisor={asset.market_cap}
                      label="Market cap vs volume"
                    />
                    <AssetProgress
                      dividend={asset.circulating_supply}
                      divisor={asset.total_supply}
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
            errorName={"Coins data"}
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
      </section>
    </>
  );
}
