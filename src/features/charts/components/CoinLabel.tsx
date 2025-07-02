import React from "react";
import { CoinType } from "@/shared/types/coins";
import { CoinIcon } from "@/shared/components/CoinIcon";

type CoinLabelProps = {
  coin: CoinType;
  size?: string;
};

export const CoinLabel: React.FC<CoinLabelProps> = ({
  coin,
  size = "w-8 h-8",
}) => {
  return (
    <div className="flex items-center gap-2">
      <CoinIcon id={coin.id} image={coin.image} tailwindSize={size} />
      <h1 className="text-white/70 dark:text-[#B9B8BB] text-xl">
        {coin.symbol.toUpperCase()}
      </h1>
    </div>
  );
};
