
import { configureStore } from "@reduxjs/toolkit";
import   userSlice  from './slices/userSlices';
import productSlice from "./slices/productSlices";
import categorySlice from "./slices/categoriesSlices";
import productDetailSlice from "./slices/productDetailSlice";

const store = configureStore({
  reducer: {
    userState: userSlice,
    productState: productSlice,
    categoryState: categorySlice,
    productDetailState: productDetailSlice


  },
});

// Định nghĩa RootState dựa trên cấu trúc store
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
// Export store để sử dụng trong toàn bộ ứng dụng
export default store;