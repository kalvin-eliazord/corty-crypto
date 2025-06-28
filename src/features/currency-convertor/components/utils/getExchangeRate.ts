import { CoinType } from "@/shared/types/coins";

export const getExchangeRate = (
  coin_a_id: string,
  coin_b_id: string,
  allCoins: CoinType[]
) => {
  const coin_a_price = allCoins.find((c) => c.id === coin_a_id)?.current_price;
  const coin_b_price = allCoins.find((c) => c.id === coin_b_id)?.current_price;

  if (!coin_a_price || !coin_b_price) return "";

  return ((coin_a_price / coin_b_price) * 1).toFixed(2).toString();
};