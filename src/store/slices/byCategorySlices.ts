import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosProduct from "../../api/axiosProduct";

export type Categories = {
    id: number;
    name: string;
};

export const fetchCategoriesByID: any = createAsyncThunk(
  "categories/fetchCategoriesByID",
  async (payload:Categories, thunkAPI) => {
    try {
      const response:any[] = await axiosProduct.get("/categories");
      return response;
    } catch (error: any) {
      return error;
    }
  }
);
const initialValue = {
Categories: [] as Categories[],
  loading: false,
};

export const CategoriesSlice = createSlice({
  name: "CategoriesSlice",
  initialState: initialValue,
  reducers: {
    add: (state, action) => {
      
    },
  },
  
  
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesByID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesByID.fulfilled, (state, action) => {
      state.loading = false;
      state.Categories = action.payload;
    });
    builder.addCase(fetchCategoriesByID.rejected, (state, action) => {
      state.loading = false;
      console.log("Fetching users rejected. Error:", action.error.message);
      
    });
  },
});
export const { add } = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
