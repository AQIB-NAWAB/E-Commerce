import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";


const initialState={
    loading :true,
    isUpdated:false,
    error:""
}
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const Update_Product = createAsyncThunk(
    "Update/Product",
    async ({ id,name,price,description,category,stock,images }, { rejectWithValue }) => {
      
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
        const response = await axios.put(
          `http://localhost:3000/api/v1/admin/product/${id}`,
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



const UpdateProductReducer=createSlice({
    name:"Users",
    initialState,
    reducers:{
      clearUpdate:(state,action)=>{
        state.isUpdated=false;
        return state
      }
    },
    extraReducers:(builder)=>{
        // get all users
  builder.addCase(Update_Product.pending,(state)=>{
    state.loading= true
    state.isUpdated= false
    state.error= ""
  })
  builder.addCase(Update_Product.fulfilled,(state,action)=>{
    state.loading=false
    state.isUpdated= true
    state.error= ""
})
builder.addCase(Update_Product.rejected,(state,action)=>{
    state.loading=false
    state.isUpdated=false
    state.error= action.payload
})

    }
})
export const {clearUpdate}=UpdateProductReducer.actions
export default UpdateProductReducer.reducer