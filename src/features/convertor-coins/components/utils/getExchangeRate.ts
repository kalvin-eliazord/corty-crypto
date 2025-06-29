import { CoinType } from "@/shared/types/coins";

export const getExchangeRate = (
  valueInput: string = "1",
  coin_a_id: string,
  coin_b_id: string,
  allCoins: CoinType[]
) => {
  const coin_a_price = allCoins.find((c) => c.id === coin_a_id)?.current_price;
  const coin_b_price = allCoins.find((c) => c.id === coin_b_id)?.current_price;

  if (!coin_a_price || !coin_b_price) return "";

  const exchangeRate = (coin_a_price / coin_b_price) * parseFloat(valueInput);

  return exchangeRate !== Math.floor(exchangeRate)
    ? exchangeRate.toFixed(2).toString()
    : exchangeRate.toString();
};