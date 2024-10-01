import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosProduct from "../../api/axiosProduct";


export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  brand: string;
  quantity: number;
  sold: number;
  color?: string;
  popularityScore: number;
  condition: string;
  size: string;
};

export const fetchProductSearch = createAsyncThunk(
  "productSearchSlice/fetchProductSearch",
  async (payload: { name: string }, thunkAPI) => {
    try {
      const response = await axiosProduct.get<Product[]>(`/products?name_like=${payload.name}`);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);

interface ProductByCategoryState {
  productSearch: Product[];  
  loading: boolean;
  error: string | null;  
}

const initialState: ProductByCategoryState = {
  productSearch: [], 
  loading: false,
  error: null,
};

export const productSearchSlice = createSlice({
  name: "productSearchSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductSearch.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error when starting a new fetch
      })
      .addCase(fetchProductSearch.fulfilled, (state, action: any) => {
        state.productSearch = action.payload; // Update product search results
        state.loading = false; // Set loading to false
      })
      .addCase(fetchProductSearch.rejected, (state, action) => {
        state.loading = false; // Set loading to false
        state.error = action.payload as string; // Update error state
      });
  },
});

export default productSearchSlice.reducer;
