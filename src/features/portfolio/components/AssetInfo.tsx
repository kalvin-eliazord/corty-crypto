import { formatAmountUnit } from "@/shared/utils/formatAmount";

type AssetInfoProps = {
  currencySymbol: string;
  currentPrice: number;
  subtitle: string;
};

export const AssetInfo: React.FC<AssetInfoProps> = ({
  currencySymbol,
  currentPrice,
  subtitle,
}) => {
  return (
    <div className="w-full border hover:border-gray-500 rounded-xl p-2 text-wrap">
      <h2 className="text-lg font-medium text-white">
        {currencySymbol}
        {formatAmountUnit(currentPrice)}
      </h2>
      <span className="dark:text-gray-400 text-gray-200 text-sm">{subtitle} </span>
    </div>
  );
};