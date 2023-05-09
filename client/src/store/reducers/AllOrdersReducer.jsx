import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";


const initialState={
    loading :true,
    totalOrders:[],
    error:""
}
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};
export const  getAllOrders=createAsyncThunk("all/Orders",async(_, { rejectWithValue })=>{
    try{
      
      const response = await axios.get(`http://localhost:3000/api/v1/admin/orders`,config);
      return response.data
    }catch(error){
      console.log(error)
return rejectWithValue(error.data.message)
    }
  })



const getAllOrdersReducer=createSlice({
    name:"Users",
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        // get all users
  builder.addCase(getAllOrders.pending,(state)=>{
    state.loading= true
    state.totalOrders= null
    state.error= ""
  })
  builder.addCase(getAllOrders.fulfilled,(state,action)=>{
    state.loading=false
    state.totalOrders= action.payload
    state.error= ""
})
builder.addCase(getAllOrders.rejected,(state,action)=>{
    state.loading=false
    state.totalOrders=null
    state.error= action.payload
})

    }
})

export default getAllOrdersReducer.reducer