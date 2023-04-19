import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: "",
};


// login the user
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


// load user

export const loadUser = createAsyncThunk(
  'load/user',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/me');
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
    }
  }
);

// logout the user
export const logoutUser=createAsyncThunk("logout/user",async()=>{
try{

  await axios.get("http://localhost:3000/api/v1/logout")
}catch(error){
  console.log(error)
}

})
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
    // load user
    builder.addCase(loadUser.pending,(state)=>{
      state.loading= true
      state.isAuthenticated= false
      state.user= null
      state.error= ""
    })
    builder.addCase(loadUser.fulfilled,(state,action)=>{
      state.loading=false
      state.isAuthenticated= true
      state.user= action.payload
      state.error= ""
  })
  builder.addCase(loadUser.rejected,(state,action)=>{
      state.loading=false
      state.isAuthenticated= false
      state.user=null
      state.error= action.payload
  })
//logout the user
builder.addCase(logoutUser.pending,(state)=>{
  state.loading= true
  state.isAuthenticated= false
  state.user= null
  state.error= ""
})
builder.addCase(logoutUser.fulfilled,(state,action)=>{
  state.loading=false
  state.isAuthenticated= false
  state.user= null
  state.error= ""
})
builder.addCase(logoutUser.rejected,(state,action)=>{
  state.loading=false
  state.isAuthenticated= false
  state.user=null
  state.error= action.payload
})

  },
  
});

export const {clearErrors}=userReducer.actions
export default userReducer.reducer