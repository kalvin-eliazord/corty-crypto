import { format } from "date-fns";
import { convertAmount } from "@/shared/utils/convertAmount";
import { formatAmountUnit } from "@/shared/utils/formatAmount";
import Image from "next/image";
import { CoinType } from "@/shared/types/coinTypes";
import { MarketChart } from "../types/charts";
import { CurrencyInfo } from "@/features/currency-selector/types/currencyInfo";

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
        <div className="flex gap-4 mb-6">
          <Image src={coin.image} width={32} height={32} alt={"coin logo"} />
          <h1 className="text-[#B9B8BB] text-xl ">{name}</h1>
        </div>
      ) : (
        <h1 className="text-[#B9B8BB] text-xl mb-7.5"> {name} </h1>
      )}

      <h2 className="font-medium text-2xl">{`${
        currencyInfo.unit
      } ${formatAmountUnit(convertedAmount)} `}</h2>
      <p className="text-[#B9B8BB]">{todayDate}</p>
    </div>
  );
};
