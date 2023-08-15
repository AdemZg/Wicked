import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";



const initialState = {
    brands:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}


export const getBrands = createAsyncThunk('get/brands', async(thunkAPI)=>{
    try{
        return await brandService.getBrands() 
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    } 
})

export const createBrand = createAsyncThunk('create/brand', async(brand, thunkAPI)=>{
    try{
        return await brandService.createBrand(brand)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    } 
})

export const getBrand = createAsyncThunk('get/brand', async(id, thunkAPI)=>{
    try{
        return await brandService.getBrand(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    } 
})

export const updateBrand = createAsyncThunk('update/brand', async(brand, thunkAPI)=>{
    try{
        return await brandService.updateBrand(brand)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    } 
})

export const deleteBrand = createAsyncThunk('delete/brand', async(id, thunkAPI)=>{
    try{
        return await brandService.deleteBrand(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    } 
})

export const resetState = createAction('Reset_all')
export const resetDeleteState = createAction('Reset_delete')

const brandSlice = createSlice({
    name: 'brands',
    initialState: initialState,
    reducers : {
        removeItem: (state, action) => {
            state.brands = state.brands.filter((brand) => brand._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBrands.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getBrands.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.brands=action.payload
            state.isSuccess=true
        })
        .addCase(getBrands.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(createBrand.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(createBrand.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.createdBrand=action.payload
            state.isSuccess=true
        })
        .addCase(createBrand.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(getBrand.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getBrand.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.brandName=action.payload.title
            state.isSuccess=true
        })
        .addCase(getBrand.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(updateBrand.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(updateBrand.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.updatedBrand=action.payload
            state.isSuccess=true
        })
        .addCase(updateBrand.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(deleteBrand.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(deleteBrand.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isError=false
            state.deleteMessage=action.payload
            state.isSuccess=true
        })
        .addCase(deleteBrand.rejected, (state, action)=>{
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

export const { removeItem } = brandSlice.actions
export default brandSlice.reducer