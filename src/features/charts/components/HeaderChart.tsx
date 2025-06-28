import Image from "next/image";
import { format } from "date-fns";
import { convertAmount } from "@/shared/utils/convertAmount";
import { formatAmountUnit } from "@/shared/utils/formatAmount";
import { MarketChart } from "../types/charts";
import { CurrencyInfo } from "@/features/convertor/types/currency";
import { CoinType } from "@/features/coins/types/coinTypes";

type HeaderProps = {
  name: string | undefined;
  marketChart: MarketChart;
  currencyInfo: CurrencyInfo;
  coin?: CoinType;
};

export const HeaderChart: React.FC<HeaderProps> = ({
  name,
  marketChart,
  currencyInfo,
  coin,
}) => {
  const todayDate = format(new Date(), "MMMM d, yyyy");
  const convertedAmount = convertAmount(marketChart.amount, currencyInfo.value);

  return (
    <div>
      {coin ? (
        <div className="flex gap-4">
          <Image src={coin.image} width={32} height={32} alt={"coin logo"} />
          <span className="text-gray-300">{name}</span>
        </div>
      ) : (
        <div> {name} </div>
      )}

      <div>{`${currencyInfo.unit} ${formatAmountUnit(convertedAmount)} `}</div>
      <div>{todayDate}</div>
    </div>
  );
};
