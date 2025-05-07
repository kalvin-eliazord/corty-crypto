import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../coinsSlice";
import { CoinsSliderProps, CoinType } from "../types/coinTypes";

export const CoinsSlider = ({ coinId, setCoinId }: CoinsSliderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { allCoins, status, error } = useSelector(
    (state: RootState) => state.coins
  );

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  if (status === "rejected") {
    return <>hasError : {error}</>;
  }

  if (status === "pending") {
    return <>isLoading</>;
  }

  return (
    <ul>
      {allCoins &&
        allCoins.slice(0, 10).map((coin: CoinType) => (
          <li key={coin.id} onClick={() => setCoinId(coin.id)}>
            {coin.name}
          </li>
        ))}
    </ul>
  );
};
