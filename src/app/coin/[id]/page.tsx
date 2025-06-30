"use client";

import { useParams } from "next/navigation";
import { RootState } from "@/shared/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SegmentedControl } from "@/features/details-coin/components/SegmentedControl";
import { CoinDetails } from "@/features/details-coin/components/CoinDetails";
import { useSmartQuery } from "@/shared/hooks/useSmartQuery";
import { AlertError } from "@/shared/components/AlertError";
import { fetchApiClient } from "@/shared/utils/fetchApiClient";
import { CoinType } from "@/shared/types/coins";
import CoinsConvertorWithChart from "@/features/convertor-coins/components/CoinsConvertorWithChart";

export default function Coin() {
  const params = useParams();
  const currency = useSelector((state: RootState) => state.currency);

  const url = currency.code
    ? `coins/markets?vs_currency=${currency.code}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
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

  const [selectedAction, setSelectedAction] = useState<string>("Coin");
  const [selectedCoinId, setSelectedCoinId] = useState<string>(
    params.id as string
  );
  const [randomCoinId, setRandomCoinId] = useState<string>(
    (allCoins &&
      allCoins[Math.floor(Math.random() * allCoins.length - 1)].id) ||
      "bitcoin"
  );

  const handleArrowsClick = () => {
    const tempSelectedCoinId = selectedCoinId;

    setSelectedCoinId(randomCoinId);
    setRandomCoinId(tempSelectedCoinId);
  };

  return (
    <div className="flex flex-col sm:gap-y-5">
      <SegmentedControl
        actions={["Coin", "Convertor"]}
        setSelectedAction={setSelectedAction}
        selectedAction={selectedAction}
      />

      {selectedAction === "Coin" && (
        <CoinDetails selectedCoinId={selectedCoinId} />
      )}

      {selectedAction === "Convertor" && allCoins && (
        <CoinsConvertorWithChart
          selectedCoinId={selectedCoinId}
          setSelectedCoinId={setSelectedCoinId}
          currency={currency}
          allCoins={allCoins}
          randomCoinId={randomCoinId}
          setRandomCoinId={setRandomCoinId}
          isError={isError}
          isLoading={isLoading}
          handleArrowsClick={handleArrowsClick}
        />
      )}
      {isError && (
        <AlertError
          errorName={"All coins"}
          networkError={error}
          refetch={refetch}
        />
      )}
    </div>
  );
}
