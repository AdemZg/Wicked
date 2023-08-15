import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";
import { toast } from "react-toastify";


const initialState = {
    contact: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
}


export const createEnquiry = createAsyncThunk("create/enquiry", async(contact, thunkAPI)=>{
    try{
        return await contactService.postQuery(contact)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})


export const contactSlice = createSlice({
    name: "contact",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(createEnquiry.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(createEnquiry.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.contact=action.payload
            if(state.isSuccess){
                setTimeout(() => {
                    toast.success("Enquiry Submitted Successfully !")
                }, 100)
            }
        })
        .addCase(createEnquiry.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            if(state.isError){
                setTimeout(() => {
                    toast.error("Couldn't Submit Form !")
                }, 100)
            }
        })
    }
})

export default contactSlice.reducer