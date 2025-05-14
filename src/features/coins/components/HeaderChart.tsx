import { format } from "date-fns";
import { HeaderProps } from "../types/coinTypes";
import { convertAmount } from "@/features/convertor/utils/convertAmount";
import { formatAmount } from "@/features/convertor/utils/formatAmount";

export const HeaderChart: React.FC<HeaderProps> = ({
  name,
  marketChart,
  currency,
}) => {
  const todayDate = format(new Date(), "MMMM d, yyyy");
  
  const convertedAmount = convertAmount(
    marketChart.amount,
    currency.value
  ); 

  return (
    <div>
      <div>{name}</div>
      <div>{`${currency.unit} ${formatAmount(convertedAmount)} `}</div>
      <div>{todayDate}</div>
    </div>
  );
};
