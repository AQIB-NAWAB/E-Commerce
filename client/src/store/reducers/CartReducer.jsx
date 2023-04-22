import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  loading: false,
  error: "",
};

export const addToCart = createAsyncThunk("Add/Cart", async ({ productId, quantity }, { getState }) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/product/${productId}`);
    const product = response.data.product;

    const state = getState().Cart;

    const isItemExist = state.items.find((item) => item._id === product._id);

    if (isItemExist) {
      // Product already exists in cart
      const updatedItems = state.items.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
      );
      window.localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    } else {
      // Product does not exist in cart
      const newItems = [...state.items, { ...product, quantity,Date:Date.now() }];
      window.localStorage.setItem("cartItems", JSON.stringify(newItems));
      return newItems;
    }
  } catch (error) {
    console.log(error);
  }
});

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    removeFromCart:(state,action)=>{

      state.items=state.items.filter((item)=>{
         const newItems= item._id != action.payload
         return newItems

      })
      console.log(action.payload)
         window.localStorage.setItem("cartItems",JSON.stringify(state.items))
        
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addToCart.rejected, (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    });
  },
});
export const {removeFromCart} =cartSlice.actions
export default cartSlice.reducer;
