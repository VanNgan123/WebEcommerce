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

type IPayload = {
  _categoryId?: string;
  category: string[];
  _page: number;
  _limit?: number;
};

/**
 * category: [1,2,3,4,5];
 * => categoryId=1&category=2&category=3
 *
 * ["categoryId1", "category2", "category3"] => join => categoryI=1&categoryId=2
 */

function convertCategoryToQuery(categories: string[]): string {
  if (categories.length === 0) return "";

  return categories
    .map((category, index) => {
      return `categoryId=${category}`;
    })
    .join("&");
}

const convertData = (payload: IPayload) => {
  const _page = payload._page
  const _limit = payload._limit ;
  if (payload._categoryId) {
    const _categoryId = payload._categoryId;
    console.log("🚀 ~ convertData ~ _categoryId:", _categoryId)
    return `?categoryId=${_categoryId}`;
  }
  else{
    const category = payload.category;
    const newCategory = convertCategoryToQuery(category);
    return `?_page=${_page}&_limit=${_limit}&${newCategory}`;
  }
};

export const fetchProducts: any = createAsyncThunk(
  "products/fetchProducts",
  async (payload: IPayload, thunkAPI) => {
    const query = convertData(payload);
    try {
      const response: any[] = await axiosProduct.get(`/products${query}`);
      return response;
    } catch (error: any) {
      return error;
    }
  }
);
const initialValue = {
  products: [] as Product[],
  loading: false,
  category: [] as string[],
};

export const ProductSlice = createSlice({
  name: "productSlice",
  initialState: initialValue,
  reducers: {
    addCategory: (state, action) => {
      state.category = action.payload;
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
export const { addCategory } = ProductSlice.actions;
export default ProductSlice.reducer;
export type { Product };
