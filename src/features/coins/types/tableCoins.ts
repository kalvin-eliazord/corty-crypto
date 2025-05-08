import { CoinType, FetchStatus } from "./coinTypes";

export const tableHeaders = [
  "#",
  "Name",
  "Price",
  "1h",
  "24h",
  "7d",
  "24h Vol / Market Cap",
  "Circulating / Total Sup",
  "Last 7d",
];

export type TableCoinsProps = {
  allCoins: CoinType[];
  status: FetchStatus;
  error: string | null | undefined;
};
