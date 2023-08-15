import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authSerivce from './authService.js'


const getAdminFromLocalStorage = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null

const initialState = {
    user: getAdminFromLocalStorage,
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const login = createAsyncThunk('auth/login-admin', async(user, thunkAPI)=>{
    try{
        return await authSerivce.login(user)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const logout = createAsyncThunk('auth/logout', async(thunkAPI)=>{
    try{
        return await authSerivce.logout()
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})




export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending,(state) => {
            state.isLoading=true
        })
        .addCase(login.fulfilled,(state,action) => {
            state.isLoading=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(login.rejected,(state) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.user=null
        })
        .addCase(logout.pending,(state) => {
            state.isLoading=true
        })
        .addCase(logout.fulfilled,(state) => {
            state.isLoading=false
            state.isSuccess=true
            state.user=null
        })
        .addCase(logout.rejected,(state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })

    }
})

export default authSlice.reducer