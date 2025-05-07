import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../coinsSlice";
import { CoinsSlideProps, CoinType } from "../types/coinTypes";

export const CoinsSlider = ({ coinId, setCoinId }: CoinsSlideProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { allCoins, status, error } = useSelector(
    (state: RootState) => state.coins
  );

  if(allCoins){
    console.log("coins: ",allCoins)
  }

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
    <ul style={{ display: "flex", gap: "20px", border: "1px solid" }}>
      {allCoins && allCoins.slice(0, 10).map((coin: CoinType) => (
        <li
          key={coin.id}
          style={{ fontWeight: coin.id === coinId ? "bold" : "normal" }}
          onClick={() => setCoinId(coin.id)}
        >
          {coin.name}
        </li>
      ))}
    </ul>
  );
};
