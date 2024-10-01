import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosUser from "../../api/axiosUser";


type User = {
  id: number;
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: string;
};


export const fetchUser: any = createAsyncThunk(
  "user/fetchUser",
  async (payload:User, thunkAPI) => {
    try {
      const response:any[] = await axiosUser.get("/users");
      return response;
    } catch (error: any) {
      return error;
    }
  }
);
const initialValue = {
  users: [] as User[],  
  loading: false,
  loggedInUser: null as User | null,  // Cho phép loggedInUser là User hoặc null
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: initialValue,
  reducers: {
    login: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
  
  
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      console.log("Fetching users rejected. Error:", action.error.message);
      
    });
  },
});
export const { login } = userSlice.actions;
export default userSlice.reducer;