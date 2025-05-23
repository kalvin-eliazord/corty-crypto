import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "../types/coins";

const initialState: Currency = {
  symbol: "$",
  code: "usd",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<Currency>) {
      state.symbol = action.payload.symbol;
      state.code = action.payload.code;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
