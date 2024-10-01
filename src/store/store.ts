import { configureStore } from "@reduxjs/toolkit";
import   userSlice  from './slices/userSlices';
import productSlice from "./slices/productSlices";
import categorySlice from "./slices/categoriesSlices";
import productDetailSlice from "./slices/productDetailSlice";
import byCategorySlices from "./slices/byCategorySlices";
import CartSlice from "./slices/cartSlices";
import orderSlice from "./slices/orderSlice";
import orderHistorySlice from "./slices/orderHistorySlice";


const store = configureStore({
  reducer: {
    userState: userSlice,
    productState: productSlice,
    categoryState: categorySlice,
    productDetailState: productDetailSlice,
    byCategoryState: byCategorySlices,
    cartState: CartSlice,
    orderState: orderSlice,
    orderHistoryState: orderHistorySlice,
  },
});

// Định nghĩa RootState dựa trên cấu trúc store
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
// Export store để sử dụng trong toàn bộ ứng dụng
export default store;