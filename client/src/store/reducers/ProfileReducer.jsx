import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const initialState={
    isUpdated:false,
    loading:false,
    error:""
}

// update proile
export const updateProfile = createAsyncThunk(
    "profile/update",
    async ({ name, email, password, avatar }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
        
        const response = await axios.put(
          "http://localhost:3000/api/v1/profile",
          { name, email, password, avatar },
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
            state.status = false;
            state.error = action.payload;
          });
    }
    
})

export const {clearErrors}=ProfileReducer.actions
export default ProfileReducer.reducer