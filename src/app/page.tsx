"use client";
import { useState } from "react";
import { CoinsSlider } from "@/features/coins/components/CoinsSlider";
import { useCoinMarket } from "@/features/coins/hooks/useCoinMarket";
import { PriceChart } from "@/features/coins/components/PriceChart";
import { VolumeChart } from "@/features/coins/components/VolumeChart";

export default function Home() {
  const [coinId, setCoinId] = useState<string>("bitcoin");
  const { data, status, error } = useCoinMarket(coinId);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <CoinsSlider setCoinId={setCoinId} coinId={coinId} />
        <PriceChart data={data} status={status} error={error}></PriceChart>
        <VolumeChart data={data} status={status} error={error}></VolumeChart>
      </main>
    </div>
  );
}
