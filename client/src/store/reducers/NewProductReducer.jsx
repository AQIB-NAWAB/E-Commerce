import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";


const initialState={
    loading :true,
    newProduct:null,
    error:""
}
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const createNewProduct = createAsyncThunk(
    "create/Product",
    async ({ name,price,description,category,stock,images }, { rejectWithValue }) => {
      
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
        const response = await axios.post(
          `http://localhost:3000/api/v1/admin/product/new`,
          { name,price,description,category,stock,images },
          config
        );
  
        return response.data;
      } catch (error) {
        console.log(error)
        return rejectWithValue(error.data.message);
      }
    }
  );



const createProduct=createSlice({
    name:"Users",
    initialState,
    reducers:{
      clearNewProduct:(state,action)=>{
        state.newProduct=null;
        return state
      }

    },
    extraReducers:(builder)=>{
        // get all users
  builder.addCase(createNewProduct.pending,(state)=>{
    state.loading= true
    state.newProduct= null
    state.error= ""
  })
  builder.addCase(createNewProduct.fulfilled,(state,action)=>{
    state.loading=false
    state.newProduct= action.payload
    state.error= ""
})
builder.addCase(createNewProduct.rejected,(state,action)=>{
    state.loading=false
    state.newProduct=null
    state.error= action.payload
})

    }
})
export const {clearNewProduct}=createProduct.actions
export default createProduct.reducer