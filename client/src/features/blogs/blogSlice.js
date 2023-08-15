import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";


const initialState = {
    blogs: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
}


export const getBlogs = createAsyncThunk("get/blogs", async(thunkAPI)=>{
    try{
        return await blogService.getBlogs()
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getBlog = createAsyncThunk("get/blog", async(id, thunkAPI)=>{
    try{
        return await blogService.getBlog(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const blogSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getBlogs.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getBlogs.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.blogs=action.payload
        })
        .addCase(getBlogs.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(getBlog.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getBlog.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.wantedBlog=action.payload
        })
        .addCase(getBlog.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
    }
})

export default blogSlice.reducer