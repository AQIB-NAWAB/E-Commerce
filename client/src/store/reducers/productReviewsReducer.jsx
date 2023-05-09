import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

export const getProductReviews = createAsyncThunk(
  'productReviews/getProductReviews',
  async ({id}, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.get(
        `http://localhost:3000/api/v1/reviews/${id}`,
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
  'productReviews/getProductReviews',
  async ({id,productID}, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.delete(
        `http://localhost:3000/api/v1/reviews/${id}`,{productID},
        config
      );

      return response.data;
    } catch (error) {
      console.log(error)
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
      });
  },
});

export default productReviewsSlice.reducer;
