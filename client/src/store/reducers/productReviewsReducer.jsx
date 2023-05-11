import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};


 export  const sendReview=createAsyncThunk("send/Review",async({productId,user,rating,comment,name},{rejectWithValue})=>{
  try{
    console.log({productId,user,rating,comment})
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
await axios.put("http://localhost:3000/api/v1/review",{productId,user,rating,comment,name},config)
  }catch(error){
    console.log(error)
    rejectWithValue(error)
  }
 }
 
 )
export const getProductReviews = createAsyncThunk(
  'productReviews/getProductReviews',
  async ({reviwedProductId}, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.get(
        `http://localhost:3000/api/v1/reviews?id=${reviwedProductId}`,
        config
      );  

      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message);
    }
  }
);
//deleteReview
export const deleteReview = createAsyncThunk(
  'productReviews/deleteReview',
  async ({ id, reviwedProductId }, { rejectWithValue }) => {
    console.log({id,reviwedProductId})
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const response = await axios.delete(
        `http://localhost:3000/api/v1/reviews?id=${id}&productId=${reviwedProductId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const productReviewsSlice = createSlice({
  name: 'productReviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
        state.numberOfReviews = action.payload.numberOfReviews;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviewsproductId;
        state.numberOfReviews = action.payload.numberOfReviews;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },

});
export default productReviewsSlice.reducer;
