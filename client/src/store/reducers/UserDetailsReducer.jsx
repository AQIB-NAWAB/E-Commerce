import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";


const initialState={
    loading :true,
    user:null,
    error:""
}
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};
export const  getUserDetails=createAsyncThunk("User/Details",async({userId}, { rejectWithValue })=>{
    console.log(userId)
    try{
      
      const response = await axios.get(`http://localhost:3000/api/v1/admin/user/${userId}`,config);
      return response.data
    }catch(error){
      console.log(error)
return rejectWithValue(error.data.message)
    }
  })



const userDetailsReducer=createSlice({
    name:"Users",
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        // get all users
  builder.addCase(getUserDetails.pending,(state)=>{
    state.loading= true
    state.user= null
    state.error= ""
  })
  builder.addCase(getUserDetails.fulfilled,(state,action)=>{
    state.loading=false
    state.user= action.payload
    state.error= ""
})
builder.addCase(getUserDetails.rejected,(state,action)=>{
    state.loading=false
    state.user=null
    state.error= action.payload
})

    }
})

export default userDetailsReducer.reducer