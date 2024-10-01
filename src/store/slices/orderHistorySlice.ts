// src/store/slices/orderHistorySlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosProduct from "../../api/axiosProduct";

// Định nghĩa kiểu cho đơn hàng
export type OrderItem = {
  id: number;
  userId: string;
  fullName: string;
  email: string;
  address: string;
  phone: string;
  note: string;
  date: string;
  totalAmount: number;
  products: {
    productId: string;
    quantity: number;
  }[];
};

// Tạo asyncThunk để fetch lịch sử đơn hàng
export const fetchOrderHistory = createAsyncThunk(
  "orderHistory/fetchOrderHistory",
  async (userId: string, thunkAPI) => {
    try {
      const response = await axiosProduct.get(`/orders?userId=${userId}`);
      return response; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Định nghĩa state cho lịch sử đơn hàng
export interface OrderState {
  orders: OrderItem[]; 
  loading: boolean;
}

const initialState: OrderState = {
  orders: [], // Đồng bộ tên biến
  loading: false,
};

// Tạo slice cho lịch sử đơn hàng
const orderHistorySlice = createSlice({
  name: "orderHistorySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action: any) => {
        state.loading = false;
        state.orders = action.payload; // Gán dữ liệu từ payload vào state.orders
      })
      .addCase(fetchOrderHistory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default orderHistorySlice.reducer;
