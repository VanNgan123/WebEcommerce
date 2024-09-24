import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosProduct from "../../api/axiosProduct";

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    rating?: number; // Đặt là tùy chọn nếu không phải sản phẩm nào cũng có đánh giá  
    reviewCount?: number; // Đảm bảo thêm dòng này  
};

export const fetchProducts: any = createAsyncThunk(
  "products/fetchProducts",
  async (payload:Product, thunkAPI) => {
    try {
      const response:any[] = await axiosProduct.get("/products?_limit=52");
      return response;
    } catch (error: any) {
      return error;
    }
  }
);
const initialValue = {
  products: [] as Product[],  
  loading: false,
};

export const ProductSlice = createSlice({
  name: "productSlice",
  initialState: initialValue,
  reducers: {
    add: (state, action) => {
      
    },
  },
  
  
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      console.log("Fetching users rejected. Error:", action.error.message);
    });
  },
});
export const { add } = ProductSlice.actions;
export default ProductSlice.reducer;
export type { Product };











