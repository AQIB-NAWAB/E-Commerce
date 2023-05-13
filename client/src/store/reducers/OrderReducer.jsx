import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";


const initialState={
    loading :true,
    Orders:[],
    OrderDetails:{},
    error:""
}
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};
export const  getMyOrders=createAsyncThunk("My/Orders",async(_, { rejectWithValue })=>{
    try{
      
      const response = await axios.get(`http://localhost:3000/api/v1/orders/me`,config);
      return response.data
    }catch(error){
      console.log(error)
return rejectWithValue(error.data.message)
    }
  })


export const getOrderDetails=createAsyncThunk("Order/deatils",async({orderId}, { rejectWithValue })=>{
    try{
      
      const response = await axios.get(`http://localhost:3000/api/v1/order/${orderId}`,config);
      return response.data
    }catch(error){
      console.log(error)
return rejectWithValue(error.data.message)
    }
  })  
const getMyOrdersSlice=createSlice({
    name:"Users",
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        // get all users
  builder.addCase(getMyOrders.pending,(state)=>{
    state.loading= true
    state.Orders= null
    state.error= ""
  })
  .addCase(getMyOrders.fulfilled,(state,action)=>{
    state.loading=false
    state.Orders= action.payload
    state.error= ""
})
.addCase(getMyOrders.rejected,(state,action)=>{
    state.loading=false
    state.Orders=null
    state.error= action.payload
})

.addCase(getOrderDetails.fulfilled,(state,action)=>{
    state.loading=false
    state.OrderDetails= action.payload
})

    }
})

export default getMyOrdersSlice.reducer