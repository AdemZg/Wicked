import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponService from "./couponService";



const initialState = {
    coupons: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: ''
}

export const getCoupons = createAsyncThunk('get/coupons', async (thunkAPI) => {
    try{
        return await couponService.getCoupons()
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const createCoupon = createAsyncThunk('create/coupon', async (coupon, thunkAPI) =>{
    try{
        return await couponService.createCoupon(coupon)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err) 
    }
})

export const getCoupon = createAsyncThunk('get/coupon', async (id, thunkAPI) => {
    try{
        return await couponService.getCoupon(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const updateCoupon = createAsyncThunk('update/coupon', async (coupon, thunkAPI) => {
    try{
        return await couponService.updateCoupon(coupon)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const deleteCoupon = createAsyncThunk('delete/coupon', async (id, thunkAPI) => {
    try{
        return await couponService.deleteCoupon(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const resetState = createAction('Reset_all')
export const resetDeleteState = createAction('Reset_delete')

const couponSlice = createSlice({
    name: 'coupons',
    initialState: initialState,
    reducers: {
        removeItem: (state, action) => {
            state.coupons=state.coupons.filter((coupon) => coupon._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCoupons.pending, (state) => {
            state.isLoading=true
        })
        .addCase(getCoupons.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.coupons=action.payload
        })
        .addCase(getCoupons.rejected, (state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(createCoupon.pending, (state) => {
            state.isLoading=true
        })
        .addCase(createCoupon.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.createdCoupon=action.payload
        })
        .addCase(createCoupon.rejected, (state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(getCoupon.pending, (state) => {
            state.isLoading=true
        })
        .addCase(getCoupon.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.dataCoupon=action.payload
        })
        .addCase(getCoupon.rejected, (state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(updateCoupon.pending, (state) => {
            state.isLoading=true
        })
        .addCase(updateCoupon.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.updatedCoupon=action.payload
        })
        .addCase(updateCoupon.rejected, (state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(deleteCoupon.pending, (state) => {
            state.isLoading=true
        })
        .addCase(deleteCoupon.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.deleteMessage=action.payload
        })
        .addCase(deleteCoupon.rejected, (state, action) => {
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

export const { removeItem } = couponSlice.actions
export default couponSlice.reducer