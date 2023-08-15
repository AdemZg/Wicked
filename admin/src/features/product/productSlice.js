import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";




const initialState = {
    products:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const getProducts = createAsyncThunk('get/products', async(thunkAPI)=>{
    try{
        return await productService.getProducts()
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const createProduct = createAsyncThunk('create/product', async(product, thunkAPI)=>{
    try{
        return await productService.createProduct(product)
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

export const updateProduct = createAsyncThunk('update/product', async(product, thunkAPI)=>{
    try{
        return await productService.updateProduct(product)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const deleteProduct = createAsyncThunk('delete/product', async(id, thunkAPI)=>{
    try{
        return await productService.deleteProduct(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const resetState = createAction('Reset_all')
export const resetDeleteState = createAction('Reset_delete')

const productSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        removeItem: (state, action) => {
            state.products=state.products.filter((product) => product._id !== action.payload)
        }
    },
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
        .addCase(createProduct.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(createProduct.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.createdProduct=action.payload
        })
        .addCase(createProduct.rejected, (state,action)=>{
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
            state.dataProduct=action.payload
        })
        .addCase(getProduct.rejected, (state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
        })
        .addCase(updateProduct.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(updateProduct.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.updatedProduct=action.payload
        })
        .addCase(updateProduct.rejected, (state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
        })
        .addCase(deleteProduct.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(deleteProduct.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.deleteMessage=action.payload
        })
        .addCase(deleteProduct.rejected, (state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
        })
        .addCase(resetState, () => initialState)
        .addCase(resetDeleteState, (state) => {
            state.deleteMessage=null
        })
    }
})


export const { removeItem } = productSlice.actions
export default productSlice.reducer