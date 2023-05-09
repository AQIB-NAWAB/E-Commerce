import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  totalProducts: [],
  error: "",
  isDeleted:false
};

export const getAllProducts = createAsyncThunk(
  "all/Products",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.get(
        `http://localhost:3000/api/v1/admin/products`,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data.message);
    }
  }
);

// delete product
export const deleteProduct = createAsyncThunk(
  "delete/Product",

  async ({ id }, { rejectWithValue }) => {
    console.log({ id });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.delete(
        `http://localhost:3000/api/v1/admin/product/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data.message);
    }
  }
);

const getAllProductsReducer = createSlice({
  name: "AllProducts",
  initialState,
  reducers: {
    clearDelete:(state,action)=>{
      state.isDeleted=false;
      return state
    }
  },
  extraReducers: (builder) => {
    // get all users
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.totalProducts = null;
      state.error = "";
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.totalProducts = action.payload;
      state.error = "";
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.totalProducts = null;
      state.error = action.payload;
    });
    // delete Product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.isDeleted = false;
      state.error = "";
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = true;
      state.error = "";
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.error = action.payload;
    });
  },
});
export const {clearDelete}=getAllProductsReducer.actions
export default getAllProductsReducer.reducer;
