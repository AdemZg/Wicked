import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";



const initialState = {
    enquiries:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const getEnquiries = createAsyncThunk('get/enquiries', async(thunkAPI) => {
    try{
        return await enquiryService.getEnquiries()
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getEnquiry = createAsyncThunk('get/enquiry', async(id, thunkAPI) => {
    try{
        return await enquiryService.getEnquiry(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const updateEnquiry = createAsyncThunk('update/enquiry', async(enquiry, thunkAPI) => {
    try{
        return await enquiryService.updateEnquiry(enquiry)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const deleteEnquiry = createAsyncThunk('delete/enquiry', async(id, thunkAPI) => {
    try{
        return await enquiryService.deleteEnquiry(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const resetDeleteState = createAction('Reset_delete')
export const resetState = createAction('Reset_all')

const enquirySlice = createSlice({
    name: 'enquiries',
    initialState: initialState,
    reducers: {
        removeItem: (state, action) => {
            state.enquiries=state.enquiries.filter((enquiry) => enquiry._id !== action.payload)
        },
        updateItem: (state, action) => {
            state.enqStatus=action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getEnquiries.pending, (state)=> {
            state.isLoading=true
        })
        .addCase(getEnquiries.fulfilled, (state, action)=> {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.enquiries=action.payload

        })
        .addCase(getEnquiries.rejected, (state, action)=> {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(getEnquiry.pending, (state)=> {
            state.isLoading=true
        })
        .addCase(getEnquiry.fulfilled, (state, action)=> {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.dataEnquiry=action.payload

        })
        .addCase(getEnquiry.rejected, (state, action)=> {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(updateEnquiry.pending, (state)=> {
            state.isLoading=true
        })
        .addCase(updateEnquiry.fulfilled, (state, action)=> {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.updatedStatus=action.payload.status

        })
        .addCase(updateEnquiry.rejected, (state, action)=> {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(deleteEnquiry.pending, (state)=> {
            state.isLoading=true
        })
        .addCase(deleteEnquiry.fulfilled, (state, action)=> {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.deleteMessage=action.payload

        })
        .addCase(deleteEnquiry.rejected, (state, action)=> {
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

export const { removeItem, updateItem } = enquirySlice.actions
export default enquirySlice.reducer