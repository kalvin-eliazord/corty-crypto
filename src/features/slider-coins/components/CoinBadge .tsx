import React from "react";
import { CoinType } from "@/shared/types/coins";
import { CoinIcon } from "@/shared/components/CoinIcon";

type CoinBadgeProps = {
  coin: CoinType;
  onClick?: () => void;
  hover?: boolean;
};

export const CoinBadge: React.FC<CoinBadgeProps> = ({
  coin,
  onClick,
  hover = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-2 border rounded-lg relative shadow-md border-white/20
        ${hover ? "hover:cursor-pointer hover:bg-red-600" : ""}
      `}
    >
      <CoinIcon id={coin.id} image={coin.image} tailwindSize="w-6 h-6" />
    </div>
  );
};
