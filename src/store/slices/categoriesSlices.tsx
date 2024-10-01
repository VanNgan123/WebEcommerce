import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosProduct from "../../api/axiosProduct";

type categories = {
    id: string ;
    name: string;
};

export const fetchCategories = createAsyncThunk<any, void>(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response: categories[] = await axiosProduct.get("/categories");
      return response;
    } catch (error: any) {
      return error;
    }
  }
);
const initialValue = {
  categories: [] as categories[], 
  loading: false,
};

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState: initialValue,
  reducers: {
    add: (state, action) => {
      
    },
  },
  
  
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      console.log("Fetching users rejected. Error:", action.error.message);
      
    });
  },
});
export const { add } = categorySlice.actions;
export default categorySlice.reducer;