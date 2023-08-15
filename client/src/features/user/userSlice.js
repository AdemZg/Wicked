import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { userService } from "./userService";
import { toast } from "react-toastify";


const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
    user:getUserFromLocalStorage,
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:'',
    loginError:false,
}

export const registerUser = createAsyncThunk ('register/user', async (user, thunkAPI) => {
    try{
        return await userService.registerUser(user)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const loginUser = createAsyncThunk ('login/user', async (user, thunkAPI) => {
    try{
        return await userService.loginUser(user)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const updateUser = createAsyncThunk ('update/user', async (user, thunkAPI) => {
    try{
        return await userService.updateUser(user)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const changePassword = createAsyncThunk ('change/password', async (user, thunkAPI) => {
    try{
        return await userService.changePassword(user)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const forgotPasswordToken = createAsyncThunk ('forgot/password-token', async (user, thunkAPI) => {
    try{
        return await userService.forgotPasswordToken(user)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const resetPassword = createAsyncThunk ('reset/password', async (user, thunkAPI) => {
    try{
        return await userService.resetPassword(user)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getUserWishlist = createAsyncThunk ('get/wishlist', async (thunkAPI) => {
    try{
        return await userService.getUserWishlist()
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const addToCart = createAsyncThunk ('add/cart', async (cart, thunkAPI) => {
    try{
        return await userService.addToCart(cart)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getUserCart = createAsyncThunk ('get/cart', async (thunkAPI) => {
    try{
        return await userService.getUserCart()
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const updateProductQuantityFromCart = createAsyncThunk ('update/product-quantity', async (productDetails, thunkAPI) => {
    try{
        return await userService.updateProductQuantityFromCart(productDetails)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const deleteProductFromCart = createAsyncThunk ('delete/product-cart', async (id, thunkAPI) => {
    try{
        return await userService.removeProductFromCart(id)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const createOrder = createAsyncThunk ('create/order', async (order, thunkAPI) => {
    try{
        return await userService.createOrder(order)
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getMyOrders = createAsyncThunk ('get/my-orders', async (thunkAPI) => {
    try{
        return await userService.getMyOrders()
    }
    catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const resetLoginError = createAction('reset/loginError')
export const resetPasswordError = createAction('reset/passwordError')

export const userSlice = createSlice({
    name:'user',
    initialState: initialState,
    reducers: {
        removeItem : (state,action) => {
            state.wishlist.wishlist=state.wishlist.wishlist.filter((item) => item._id !== action.payload)
        },
        removeCartProduct: (state,action) => {
            state.userCart=state.userCart.filter((cart) => cart._id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading=true
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading=true
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading=false
            state.loginError=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading=false
            state.loginError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(updateUser.pending, (state) => {
            state.isLoading=true
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading=false
            state.loginError=false
            state.isSuccessUpdated=true
            state.user.firstname=action.payload.firstname
            state.user.lastname=action.payload.lastname
            state.user.email=action.payload.email
            state.user.mobile=action.payload.mobile
            if(state.isSuccessUpdated){
                toast.success("Your Account Details Have Been Updated !")
            }
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isLoading=false
            state.loginError=true
            state.isSuccessUpdated=false
            state.message=action.error
        })
        .addCase(changePassword.pending, (state) => {
            state.isLoading=true
        })
        .addCase(changePassword.fulfilled, (state, action) => {
            state.isLoading=false
            state.passwordError=false
            state.isSuccessUpdatedPassword=true
            if(state.isSuccessUpdatedPassword){
                toast.success("You Have Changed Your Password !")
            }
        })
        .addCase(changePassword.rejected, (state, action) => {
            state.isLoading=false
            state.passwordError=true
            state.isSuccessUpdatedPassword=false
            state.message=action.error
        })
        .addCase(forgotPasswordToken.pending, (state) => {
            state.isLoading=true
        })
        .addCase(forgotPasswordToken.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.token=action.payload
            if(state.isSuccess){
                toast.success("Email Sent Successfully !")
            }
        })
        .addCase(forgotPasswordToken.rejected, (state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(resetPassword.pending, (state) => {
            state.isLoading=true
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccessPasswordChanged=true
            state.passwordUpdatedUser=action.payload
            if(state.isSuccessPasswordChanged){
                toast.success("Your Password Has Been Changed !")
            }
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccessPasswordChanged=false
            state.message=action.error
        })
        .addCase(getUserWishlist.pending, (state) => {
            state.isLoading=true
        })
        .addCase(getUserWishlist.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.wishlist=action.payload
        })
        .addCase(getUserWishlist.rejected, (state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(addToCart.pending, (state) => {
            state.isLoading=true
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.cartProduct=action.payload
            if(state.isSuccess){
                toast.success("Product Added To Cart !")
            }
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(getUserCart.pending, (state) => {
            state.isLoading=true
        })
        .addCase(getUserCart.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.userCart=action.payload
        })
        .addCase(getUserCart.rejected, (state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(deleteProductFromCart.pending, (state) => {
            state.isLoading=true
        })
        .addCase(deleteProductFromCart.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.deletedCartProduct=action.payload
            if(state.isSuccess){
                setTimeout(() =>{
                    toast.success("Product Has Been  Deleted From Your Cart !")
                }, 500)
            }
        })
        .addCase(deleteProductFromCart.rejected, (state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            if(state.isError){
                toast.error("Something Went Wrong !")
            }
        })
        .addCase(updateProductQuantityFromCart.pending, (state) => {
            state.isLoading=true
        })
        .addCase(updateProductQuantityFromCart.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.updatedProductQuantity=action.payload
        })
        .addCase(updateProductQuantityFromCart.rejected, (state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(createOrder.pending, (state) => {
            state.isLoading=true
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.createdOrder=action.payload
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(getMyOrders.pending, (state) => {
            state.isLoading=true
        })
        .addCase(getMyOrders.fulfilled, (state, action) => {
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.orders=action.payload
        })
        .addCase(getMyOrders.rejected, (state, action) => {
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(resetLoginError, (state) => {
            state.loginError=false
        })
        .addCase(resetPasswordError, (state) => {
            state.passwordError=false
        })
    }
})

export const { removeItem, removeCartProduct } = userSlice.actions
export default userSlice.reducer