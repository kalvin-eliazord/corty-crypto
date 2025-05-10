import { useExchangeRates } from "../hooks/useExchangeRates";
import { setCurrency } from "../currencySlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const currencies = ["USD", "GBP", "EUR", "BTC", "ETH"];

export const Convertor = () => {
  const dispatch = useDispatch();
  const { exchangeRates, status, error } = useExchangeRates();
  const [targetCurrency, setTargetCurrency] = useState<string>("USD");

  useEffect(() => {
    const selectedRate = exchangeRates[targetCurrency.toLowerCase()];

    if (selectedRate) {
      dispatch(setCurrency(selectedRate));
    } else {
      console.warn(`Currency ${selectedRate} not found in exchange rates.`);
    }
  }, [targetCurrency, dispatch, exchangeRates]);

  if (status === "rejected" && error) {
    return <>Error : {error}</>;
  }

  if (status === "pending") {
    return <> Convertor loading </>;
  }

  return (
    <div>
      <select
        value={targetCurrency}
        onChange={(e) => setTargetCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};
