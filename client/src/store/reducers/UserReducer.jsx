import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: "",
};
export const loginUser = createAsyncThunk("login/user", async ( data,{rejectWithValue } ) => {
  try {
    console.log(data)

    const response = await axios.post("http://localhost:3000/api/v1/login", {
      email:data.email,
      password:data.password,
    });
    console.log( response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message)

  }
});

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors:(state,action)=>{
      state.error=""
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading= true
      state.isAuthenticated= false
      state.user= null
      state.error= ""
    });
    builder.addCase(loginUser.fulfilled,(state,action)=>{
        state.loading=false
        state.isAuthenticated= true
        state.user= action.payload
        state.error= ""
    })
    builder.addCase(loginUser.rejected,(state,action)=>{
        state.loading=false
        state.isAuthenticated= false
        state.user=null
        state.error= action.payload
    })
  },
  
});

export const {clearErrors}=userReducer.actions
export default userReducer.reducer