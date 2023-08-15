import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import orderService from "./orderService";



const initialState = {
    orders:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const getOrders = createAsyncThunk('get/orders', async(thunkAPI) => {
    try{
        return await orderService.getOrders()
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getOrderByUserId = createAsyncThunk('get/order', async(id, thunkAPI) => {
    try{
        return await orderService.getOrderByUserId(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getAllUserOrders = createAsyncThunk('get/all-user-orders', async(id, thunkAPI) => {
    try{
        return await orderService.getAllUserOrders(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const deleteOrder = createAsyncThunk('delete/order', async(id, thunkAPI) => {
    try{
        return await orderService.deleteOrder(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const resetDeleteState = createAction('reset_Delete')

const orderSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {
        removeItem : (state, action) => {
            state.orders=state.orders.filter((order) => order._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOrders.pending, (state)=> {
            state.isLoading=true
        })
        .addCase(getOrders.fulfilled, (state, action)=> {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.orders=action.payload

        })
        .addCase(getOrders.rejected, (state, action)=> {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error

        })
        .addCase(getOrderByUserId.pending, (state)=> {
            state.isLoading=true
        })
        .addCase(getOrderByUserId.fulfilled, (state, action)=> {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.wantedOrder=action.payload

        })
        .addCase(getOrderByUserId.rejected, (state, action)=> {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error

        })
        .addCase(getAllUserOrders.pending, (state)=> {
            state.isLoading=true
        })
        .addCase(getAllUserOrders.fulfilled, (state, action)=> {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.userOrders=action.payload

        })
        .addCase(getAllUserOrders.rejected, (state, action)=> {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(deleteOrder.pending, (state)=> {
            state.isLoading=true
        })
        .addCase(deleteOrder.fulfilled, (state, action)=> {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.deleteMessage=action.payload

        })
        .addCase(deleteOrder.rejected, (state, action)=> {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(resetDeleteState, (state) => {
            state.deleteMessage=null
        })
    }
})

export const { removeItem } = orderSlice.actions
export default orderSlice.reducer