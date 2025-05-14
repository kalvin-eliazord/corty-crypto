import { format } from "date-fns";
import { HeaderProps } from "../types/coinTypes";
import { convertAmount } from "@/features/convertor/utils/convertAmount";
import { formatAmount } from "@/features/convertor/utils/formatAmount";
import Image from "next/image";

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
        <div className="flex">
          <Image src={coin.image} width={96} height={96} alt={"coin logo"} />(
          {name})
        </div>
      ) : (
        <div> {name} </div>
      )}

      <div>{`${currencyInfo.unit} ${formatAmount(convertedAmount)} `}</div>
      <div>{todayDate}</div>
    </div>
  );
};
