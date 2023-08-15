import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import customerSerivce from './customerService'


const initialState = {
    customers:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const getUsers = createAsyncThunk('customer/get-customers', async(thunkAPI)=>{
    try{
        return await customerSerivce.getUsers()
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getUser = createAsyncThunk('get/user', async(id, thunkAPI)=>{
    try{
        return await customerSerivce.getUser(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const deleteUser = createAsyncThunk('delete/user', async(id, thunkAPI) => {
    try{
        return await customerSerivce.deleteUser(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getLoggedInAdmin = createAsyncThunk('get/admin', async(thunkAPI) => {
    try{
        return await customerSerivce.getLoggedInAdmin()
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const resetDeleteState = createAction('Reset_delete')

export const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers:{
        removeItem : (state, action) => {
            state.customers=state.customers.filter((customer) => customer._id !== action.payload)
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getUsers.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getUsers.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.customers=action.payload
        })
        .addCase(getUsers.rejected, (state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
        })
        .addCase(getUser.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getUser.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.wantedUser=action.payload
        })
        .addCase(getUser.rejected, (state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
        })
        .addCase(deleteUser.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(deleteUser.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.deleteMessage=action.payload
        })
        .addCase(deleteUser.rejected, (state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
        })
        .addCase(getLoggedInAdmin.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getLoggedInAdmin.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.loggedInAdmin=action.payload
        })
        .addCase(getLoggedInAdmin.rejected, (state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
        })
        .addCase(resetDeleteState, (state) => {
            state.deleteMessage=null
        })
    }
})

export const { removeItem } = customerSlice.actions
export default customerSlice.reducer