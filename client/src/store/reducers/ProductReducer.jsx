import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios"
const initialState={
    loading:false,
    products:[],
    product:{},
    error:"",
}




export  const fetchProducts=createAsyncThunk("fetch/Products",async()=>{
    const response = await axios.get('http://localhost:3000/api/v1/products');

   
    return response.data;
})

// get the Product Details 
export  const fetchProductDetails=createAsyncThunk("fetch/Product/details",async(id)=>{
    const response = await axios.get(`http://localhost:3000/api/v1/product/${id}`);

   
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



        //  fetch details
        builder.addCase(fetchProductDetails.pending,(state,acion)=>{
            state.loading=true 
            state.product=[]         
        })
        builder.addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.loading=false,
            state.product=action.payload
        })
        builder.addCase(fetchProductDetails.rejected,(state,action)=>{
            state.error=action.error.message
            state.loading=false
            state.product=[]         
        })



    }

})

   



export default productSlice.reducer;
