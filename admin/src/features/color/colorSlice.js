import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";


const initialState = {
    colors:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}


export const getColors = createAsyncThunk('get/colors', async(thunkAPI)=>{
    try{
        return await colorService.getColors()
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    } 
})

export const createColor = createAsyncThunk('create/color', async(color, thunkAPI)=>{
    try{
        return await colorService.createColor(color)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    } 
})

export const deleteColor = createAsyncThunk('delete/color', async(id, thunkAPI)=>{
    try{
        return await colorService.deleteColor(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    } 
})

export const resetState = createAction('Reset_all')
export const resetDeleteState = createAction('Reset_delete')

const colorSlice = createSlice({
    name: 'colors',
    initialState: initialState,
    reducers : {
        removeItem: (state, action) => {
            state.colors=state.colors.filter((color) => color._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getColors.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getColors.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.colors=action.payload
            state.isSuccess=true
        })
        .addCase(getColors.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(createColor.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(createColor.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.createdColor=action.payload
            state.isSuccess=true
        })
        .addCase(createColor.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(deleteColor.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(deleteColor.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.deleteMessage=action.payload
            state.isSuccess=true
        })
        .addCase(deleteColor.rejected, (state, action)=>{
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


export const { removeItem } = colorSlice.actions
export default colorSlice.reducer