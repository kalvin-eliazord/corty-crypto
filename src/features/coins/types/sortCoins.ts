import { CoinType } from "../types/coinTypes";

export const sortCoins = (
  coins: CoinType[],
  sortType: string,
  reverse: boolean
): CoinType[] => {
  const sorted = coins.toSorted((a, b) => {
    switch (sortType) {
      case "Name":
        return a.name.localeCompare(b.name);
      case "Price":
        return a.current_price - b.current_price;
      case "1h":
        return (
          a.price_change_percentage_1h_in_currency -
          b.price_change_percentage_1h_in_currency
        );
      case "24h":
        return (
          a.price_change_percentage_24h_in_currency -
          b.price_change_percentage_24h_in_currency
        );
      case "7d":
        return (
          a.price_change_percentage_7d_in_currency -
          b.price_change_percentage_7d_in_currency
        );
      default:
        return 0;
    }
  });

  return reverse ? sorted.toReversed() : sorted;
};
