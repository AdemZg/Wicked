import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import BcatService from "./blogCatService";


const initialState = {
    BlogCats:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}


export const getBlogCats = createAsyncThunk('get/BlogCats', async(thunkAPI)=>{
    try{
        return await BcatService.getBcat()
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    } 
})

export const createBlogCat = createAsyncThunk('create/blogCat', async(blogCat, thunkAPI)=>{
    try{
        return await BcatService.createBcat(blogCat)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const updateBlogCat = createAsyncThunk('update/blogCat', async(category, thunkAPI)=>{
    try{
        return await BcatService.updateBlogCat(category)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getBlogCat = createAsyncThunk('get/blogCat', async(id, thunkAPI)=>{
    try{
        return await BcatService.getBlogCat(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const deleteBlogCat = createAsyncThunk('delete/blogCat', async(id, thunkAPI)=>{
    try{
        return await BcatService.deleteBlogCat(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const resetState = createAction('Reset_all')
export const resetDeleteState = createAction('Reset_delete')

const BcatSlice = createSlice({
    name: 'BlogCats',
    initialState: initialState,
    reducers : {
        removeItem :(state, action) => {
            state.BlogCats=state.BlogCats.filter((item) => item._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBlogCats.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getBlogCats.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.BlogCats=action.payload
            state.isSuccess=true
        })
        .addCase(getBlogCats.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(createBlogCat.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(createBlogCat.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.createdBlogCat=action.payload
            state.isSuccess=true
        })
        .addCase(createBlogCat.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(getBlogCat.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getBlogCat.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.BlogCatName=action.payload.title
            state.isSuccess=true
        })
        .addCase(getBlogCat.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(updateBlogCat.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(updateBlogCat.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.updatedBlogCat=action.payload
            state.isSuccess=true
        })
        .addCase(updateBlogCat.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(deleteBlogCat.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(deleteBlogCat.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.deleteMessage=action.payload
            state.isSuccess=true
        })
        .addCase(deleteBlogCat.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(resetState, () => initialState)
        .addCase(resetDeleteState, (state) => {
            state.deleteMessage=null
        })
    }
})


export const { removeItem } = BcatSlice.actions
export default BcatSlice.reducer