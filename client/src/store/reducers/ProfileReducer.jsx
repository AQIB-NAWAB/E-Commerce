import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    isUpdated:false,
    loading:false,
    error:""
}

// update proile
export const updateProfile = createAsyncThunk(
    "profile/update",
    async ({name, email, avatar }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
        
        const response = await axios.put(
          "http://localhost:3000/api/v1/me/update",
          { name, email, avatar },
          config
        );
        
        console.log(response.data);
        return response.data.success;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data.message);
      }
    }
  );
  


// Update user Role {Admin}

export const UpdateUserRole=createAsyncThunk("Update/Role",async({userId,name,email,role},{rejectWithValue})=>{
  try{
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    
    axios.put(`http://localhost:3000/api/v1/admin/user/${userId}`, {email,name,role},config);
  }catch(error){
    console.log(error)
  }

  })
  

  const ProfileReducer=createSlice({
    name:"Profile",
    initialState,
    reducers:{
      clearErrors:(state,action)=>{
        state.error=""
      }
    },
    extraReducers:(builder)=>{
      builder
        .addCase(updateProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.isUpdated=false
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
          state.loading =false;
          state.isUpdated = action.payload;
        })
        .addCase(updateProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(UpdateUserRole.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.isUpdated=false
        })
        .addCase(UpdateUserRole.fulfilled, (state, action) => {
          state.loading =false;
          state.isUpdated = action.payload;
        })
        .addCase(UpdateUserRole.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    } 
  })
  
export const {clearErrors}=ProfileReducer.actions
export default ProfileReducer.reducer