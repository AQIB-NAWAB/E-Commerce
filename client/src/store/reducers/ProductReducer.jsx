import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios"
const initialState={
    loading:false,
    products:[],
    error:"",
}




export  const fetchProducts=createAsyncThunk("fetch/Products",async()=>{
    const response = await axios.get('http://localhost:3000/api/v1/products');

   
    return response.data;
})
const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state,acion)=>{
            state.loading=true 
            state.products=[]         
        })
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading=false,
            state.products=action.payload
        })
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.error=action.error.message
            state.loading=false
            state.products=[]         

        })



    }

})

   



export default productSlice.reducer;
