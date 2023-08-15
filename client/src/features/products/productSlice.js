import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";


const initialState = {
    products:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const getProducts = createAsyncThunk('get/products', async({sort,tag,brand,category,minPrice,maxPrice},thunkAPI)=>{
    try{
        return await productService.getProducts({sort,tag,brand,category,minPrice,maxPrice})
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getProduct = createAsyncThunk('get/product', async(id, thunkAPI)=>{
    try{
        return await productService.getProduct(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const addToWishlist = createAsyncThunk('add/wishlist', async(prodId, thunkAPI)=>{
    try{
        return await productService.addToWishlist(prodId)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const rateProduct = createAsyncThunk('rate/product', async(data, thunkAPI)=>{
    try{
        return await productService.rateProduct(data)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})


const productSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getProducts.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.products=action.payload
        })
        .addCase(getProducts.rejected, (state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
        })
        .addCase(getProduct.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getProduct.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.wantedProduct=action.payload
        })
        .addCase(getProduct.rejected, (state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
        })
        .addCase(addToWishlist.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(addToWishlist.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.wishlist=action.payload
            state.message="Product Added To Wishlist !"
        })
        .addCase(addToWishlist.rejected, (state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
        })
        .addCase(rateProduct.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(rateProduct.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.wantedProduct=action.payload
        })
        .addCase(rateProduct.rejected, (state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
        })
    }
})

export default productSlice.reducer