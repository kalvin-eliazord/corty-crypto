import { HeaderProps } from "../types/coinTypes";

export const HeaderChart: React.FC<HeaderProps> = ({ name, data }) => {
  const todayDate = new Date().getDate();

  return (
    <div>
      <div>{name}</div>
      <div>{data}</div>
      <div>{todayDate}</div>
    </div>
  );
};
