import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import PcatService from "./PcatService";


const initialState = {
    ProCats:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}


export const getProCats = createAsyncThunk('get/proCats', async(thunkAPI)=>{
    try{
        return await PcatService.getPcat() 
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    } 
})

export const createProCat = createAsyncThunk('create/proCat', async(proCat, thunkAPI)=>{
    try{
        return await PcatService.createProCat(proCat)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getProCat = createAsyncThunk('get/proCat', async(id, thunkAPI)=>{
    try{
        return await PcatService.getProCat(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const updateProCat = createAsyncThunk('update/proCat', async(category, thunkAPI)=>{
    try{
        return await PcatService.updateProCat(category)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const deleteProCat = createAsyncThunk('delete/proCat', async(id, thunkAPI)=>{
    try{
        return await PcatService.deleteProCat(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const resetState = createAction('Reset_all')
export const resetDeleteState = createAction('Reset_delete')

const PcatSlice = createSlice({
    name: 'ProCats',
    initialState: initialState,
    reducers : {
        removeItem: (state, action) => {
            state.ProCats=state.ProCats.filter((procat) => procat._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProCats.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getProCats.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.ProCats=action.payload
            state.isSuccess=true
        })
        .addCase(getProCats.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(createProCat.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(createProCat.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.createdProCat=action.payload
            state.isSuccess=true
        })
        .addCase(createProCat.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(getProCat.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getProCat.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.ProCatName=action.payload.title
            state.isSuccess=true
        })
        .addCase(getProCat.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(updateProCat.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(updateProCat.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.updatedProCat=action.payload
            state.isSuccess=true
        })
        .addCase(updateProCat.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(deleteProCat.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(deleteProCat.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.deleteMessage=action.payload
            state.isSuccess=true
        })
        .addCase(deleteProCat.rejected, (state, action)=>{
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

export const { removeItem } = PcatSlice.actions
export default PcatSlice.reducer