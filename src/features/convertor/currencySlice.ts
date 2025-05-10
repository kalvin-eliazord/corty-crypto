import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrencyInfo } from "./types/exchangeRate";

type CurrencyProps = {
  currency: CurrencyInfo;
};

const initialState: CurrencyProps = {
  currency: {} as CurrencyInfo,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<CurrencyInfo>) {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
