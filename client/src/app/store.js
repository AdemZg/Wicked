import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import productReducer from '../features/products/productSlice'
import blogReducer from '../features/blogs/blogSlice'
import contactReducer from '../features/contact/contactSlice'


export const store = configureStore({
    reducer:{
        auth: userReducer,
        products: productReducer,
        blogs: blogReducer,
        contact: contactReducer
    }
})