import currencySlice from "@/shared/store/currencySlice";
import coinsSlice from "@/shared/store/coinsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    coins: coinsSlice,
    currency: currencySlice ,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
