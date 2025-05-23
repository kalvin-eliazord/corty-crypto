import { format } from "date-fns";
import { formatAmountUnit } from "@/shared/utils/formatAmount";
import Image from "next/image";
import { CoinType, Currency } from "@/shared/types/coins";
import { MarketChart } from "../types/charts";

type HeaderProps = {
  name: string | undefined;
  marketChart: MarketChart;
  currency: Currency;
  coin?: CoinType;
};

export const HeaderChart: React.FC<HeaderProps> = ({
  name,
  marketChart,
  currency,
  coin,
}) => {
  const todayDate = format(new Date(), "MMMM d, yyyy");

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
        currency.symbol
      } 
      ${formatAmountUnit(marketChart.amount)} `}</h2>
      <p className="text-[#B9B8BB]">{todayDate}</p>
    </div>
  );
};
