// src/store/slices/orderSlices.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosProduct from "../../api/axiosProduct";

type Order = {
  id: number;
  userId: number;
  products: Array<{ productId: number; quantity: number }>;
  totalAmount: number;
  
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const response = await axiosProduct.get("/orders");
    return response;
  }
);

const initialState = {
  orders: [] as Order[],
  loading: false,
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action: any) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
