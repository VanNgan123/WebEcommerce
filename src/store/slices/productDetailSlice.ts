import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosProduct from "../../api/axiosProduct";
import { Product } from "./productSlices";


// Define the shape of the product detail state
interface ProductDetailState {
  productDetail: Product | null;
  loading: boolean;
}

// Fetch single product by ID
export const fetchProductById = createAsyncThunk<Product, string>(
  "productDetail/fetchProductById",
  async (id: string,thunkAPI) => {
    try {
        const response = await axiosProduct.get(`/products/${id}`);
        return response // Return the actual data
        
    }catch(error: any) {
        return error
    }
  }
);

// Initial state for the product detail slice
const initialState: ProductDetailState = {
  productDetail: null,
  loading: false,
};

// Create the product detail slice
const detailSlice = createSlice({
  name: "productDetailSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true; // Set loading to true when the request starts
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request completes successfully
        state.productDetail = action.payload; // Store the details of the fetched product
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.loading = false; // Set loading to false on error
        console.error("Failed to fetch product detail"); // Log the error
      });
  },
});

export default detailSlice.reducer; // Export the reducer
