import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCoinData } from "../../shared/services/fetchCoinData";
import { AllCoinsProps, CoinType, FetchStatus } from "./types/coinTypes";
import getError from "@/shared/utils/getError";

export const fetchCoinsMarket = createAsyncThunk<
  CoinType[],
  void,
  { rejectValue: string }
>("coins/fetchCoinsMarket", async (_, { rejectWithValue }) => {
  try {
    const { data } = await fetchCoinData(
      "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
    );
    return data;
  } catch (err) {
    const message = getError(err);

    return rejectWithValue(message);
  }
});

const initialState: AllCoinsProps = {
  allCoins: [],
  status: "pending" as FetchStatus,
  error: null,
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinsMarket.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCoinsMarket.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.allCoins = action.payload as CoinType[];
      })
      .addCase(fetchCoinsMarket.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default coinsSlice.reducer;
