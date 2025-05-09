import { format } from "date-fns";
import { HeaderProps } from "../types/coinTypes";

export const HeaderChart: React.FC<HeaderProps> = ({ name, marketChart }) => {
  const todayDate = format(new Date(), "MMMM d, yyyy");

  return (
    <div>
      <div>{name}</div>
      <div>{`currency ${marketChart.amount} amount`}</div>
      <div>{todayDate}</div>
    </div>
  );
};
