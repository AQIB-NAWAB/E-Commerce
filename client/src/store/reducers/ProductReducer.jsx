import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  products: [],
  single_product_details: {},
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "fetch/Products",
  async ({ keyword = "", price = [0, 25000], page = 1, isCategory }) => {
    try {
      let link = `http://localhost:3000/api/v1/products?price[gte]=${price[0]}&keyword=${keyword}&price[lte]=${price[1]}&page=${page}`;

      if (isCategory) {
        link = `http://localhost:3000/api/v1/products?price[gte]=${price[0]}&keyword=${keyword}&price[lte]=${price[1]}&page=${page}&category=${isCategory}`;
      }
      const response = await axios.get(link);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
// fetch product detials
export const fetchProductDetails = createAsyncThunk(
  "fetch/Product/details",
  async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.get(
      `http://localhost:3000/api/v1/product/${id}`
    );

    return response.data;
  }
);

// new product
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, acion) => {
      state.loading = true;
      state.products = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload; // Accessing the products array from response payload
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.products = [];
    });

    //  fetch details
    builder.addCase(fetchProductDetails.pending, (state, action) => {
      state.loading = true;
      state.single_product_details = {};
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.single_product_details = action.payload;
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.single_product_details = {};
    });
  },
});

export default productSlice.reducer;
