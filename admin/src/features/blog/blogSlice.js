import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";


const initialState = {
    blogs:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}


export const getBlogs = createAsyncThunk('get/blogs', async(thunkAPI)=>{
    try{
        return await blogService.getBlogs() 
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    } 
})

export const createBlog = createAsyncThunk('create/blog', async(blog, thunkAPI)=>{
    try{
        return await blogService.createBlog(blog)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getBlog = createAsyncThunk('get/blog', async(id, thunkAPI)=>{
    try{
        return await blogService.getBlog(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const updateBlog = createAsyncThunk('update/blog', async(blog, thunkAPI)=>{
    try{
        return await blogService.updateBlog(blog)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const uploadBlogImage = createAsyncThunk('upload/blogImage', async(blog, thunkAPI)=>{
    try{
        const formData = new FormData();
        for (let i = 0; i < blog.images.length; i++){
            formData.append('images', blog.images[i])
        }
        return await blogService.uploadBlogImage(formData)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const deleteBlog = createAsyncThunk('delete/blog', async(id, thunkAPI)=>{
    try{
        return await blogService.deleteBlog(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const resetState = createAction('Reset_all')
export const resetDeleteState = createAction('Reset_delete')

const blogSlice = createSlice({
    name: 'blogs',
    initialState: initialState,
    reducers : {
        removeItem: (state, action) => {
            state.blogs=state.blogs.filter((blog) => blog._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBlogs.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getBlogs.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.blogs=action.payload
            state.isSuccess=true
        })
        .addCase(getBlogs.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(createBlog.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(createBlog.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.createdBlog=action.payload
            state.isSuccess=true
        })
        .addCase(createBlog.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(getBlog.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getBlog.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.dataBlog=action.payload
            state.isSuccess=true
        })
        .addCase(getBlog.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(updateBlog.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(updateBlog.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.updatedBlog=action.payload
            state.isSuccess=true
        })
        .addCase(updateBlog.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(uploadBlogImage.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(uploadBlogImage.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.blogImages=action.payload
            state.isSuccess=true
        })
        .addCase(uploadBlogImage.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(deleteBlog.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(deleteBlog.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.deleteMessage=action.payload
            state.isSuccess=true
        })
        .addCase(deleteBlog.rejected, (state, action)=>{
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

export const { removeItem } = blogSlice.actions
export default blogSlice.reducer