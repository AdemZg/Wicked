import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import uploadService from "./uploadService";



const initialState = {
    images:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const upload = createAsyncThunk('get/images', async(images,thunkAPI) => {
    try{
        const formData = new FormData();
        for (let i = 0; i < images.length; i++){
            formData.append('images', images[i])
        }
        return await uploadService.upload(formData)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const deleteImage = createAsyncThunk('delete/images', async(id,thunkAPI) => {
    try{
        return await uploadService.deleteImage(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const resetState = createAction('Reset_all')

const uploadSlice = createSlice({
    name: 'images',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(upload.pending, (state)=> {
            state.isLoading=true
        })
        .addCase(upload.fulfilled, (state, action)=> {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.images=action.payload

        })
        .addCase(upload.rejected, (state, action)=> {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error

        })
        .addCase(deleteImage.pending, (state)=> {
            state.isLoading=true
        })
        .addCase(deleteImage.fulfilled, (state, action)=> {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.images=[]

        })
        .addCase(deleteImage.rejected, (state, action)=> {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.payload

        })
        .addCase(resetState, () => initialState)
    }
})

export default uploadSlice.reducer