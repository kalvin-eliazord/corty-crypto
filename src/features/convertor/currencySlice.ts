import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrencyInfo } from "./types/currency";

type CurrencyProps = {
  currencyInfo: CurrencyInfo;
  currencyCode: string;
};

const initialState: CurrencyProps = {
  currencyInfo: {} as CurrencyInfo,
  currencyCode: "usd",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrencyInfo(state, action: PayloadAction<CurrencyInfo>) {
      state.currencyInfo = action.payload;
    },
    setCurrencyCode(state, action: PayloadAction<string>) {
      state.currencyCode = action.payload;
    },
  },
});

export const { setCurrencyInfo, setCurrencyCode } = currencySlice.actions;
export default currencySlice.reducer;