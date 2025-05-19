import currencySlice from "@/features/currency-selector/currencySlice";
import coinsSlice from "@/shared/coinsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    coins: coinsSlice,
    currency: currencySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
