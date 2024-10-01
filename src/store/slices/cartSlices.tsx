import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosProduct from "../../api/axiosProduct";




export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    brand: string;
    quantity: number;
    sold: number;
    color: string;
    popularityScore: number;
    condition: string;
    size: string;
};


export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  color: string;
  product: Product;
  user: any;
}


export const fetchCarts: any = createAsyncThunk(
  'cart/fetchCarts', 
  async (userId: string, thunkAPI) => {
    try {
      const response: CartItem[] = await axiosProduct.get(`/carts?_expand=product&userId=${userId}&_expand=user`); 
      return response; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data); 
    }
  }
);

export interface CartState {
  carts: CartItem[]; 
  loading: boolean; 
}

const initialState: CartState = {
  carts: [], 
  loading: false,
};


export const CartSlice: any = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<CartItem[]>) {
      state.carts = action.payload;
      state.loading = false; 
    },
    buy(state, action: PayloadAction<{ productId: string; color: string }>) {
      const existingCartItem = state.carts.find(
        (item) => item.productId === action.payload.productId && item.color === action.payload.color
      );
    
      if (existingCartItem && existingCartItem.quantity > 0) {

        existingCartItem.quantity -= 1;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCarts.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
      state.loading = false; 
      state.carts = action.payload; 
    });
    builder.addCase(fetchCarts.rejected, (state, action) => {
      state.loading = false; 
      console.error("Fetching carts rejected. Error:", action.error.message);
    });
  },
});

// Export actions and reducer
export const { setProducts, addCart, buy } = CartSlice.actions;
export default CartSlice.reducer;