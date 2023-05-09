import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";


const initialState={
    loading :true,
    totalUsers:[],
    error:"",
    isDeleted:false,
}
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};
export const  getAllUsers=createAsyncThunk("all/users",async(_, { rejectWithValue })=>{
    try{
      
      const response = await axios.get(`http://localhost:3000/api/v1/admin/users`,config);
      return response.data
    }catch(error){
      console.log(error)
return rejectWithValue(error.data.message)
    }
  })

// delete Users
export const deleteUser = createAsyncThunk(
  "delete/User",

  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.delete(
        `http://localhost:3000/api/v1/admin/user/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data.message);
    }
  }
);


const getAllUsersReducer=createSlice({
    name:"Users",
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        // get all users
  builder.addCase(getAllUsers.pending,(state)=>{
    state.loading= true
    state.totalUsers= null
    state.error= ""
  })
  builder.addCase(getAllUsers.fulfilled,(state,action)=>{
    state.loading=false
    state.totalUsers= action.payload
    state.error= ""
})
builder.addCase(getAllUsers.rejected,(state,action)=>{
    state.loading=false
    state.totalUsers=null
    state.error= action.payload
})
// delete Users
builder.addCase(deleteUser.pending, (state) => {
  state.loading = true;
  state.isDeleted = false;
  state.error = "";
});
builder.addCase(deleteUser.fulfilled, (state, action) => {
  state.loading = false;
  state.isDeleted = true;
  state.error = "";
});
builder.addCase(deleteUser.rejected, (state, action) => {
  state.loading = false;
  state.isDeleted = false;
  state.error = action.payload;
});
    }
})

export default getAllUsersReducer.reducer