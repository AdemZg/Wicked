import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import customerReducer from '../features/customers/customerSlice.js'
import productReducer from '../features/product/productSlice.js'
import blogReducer from '../features/blog/blogSlice.js'
import orderReducer from '../features/order/orderSlice.js'
import enquiryReducer from '../features/enquiry/enquirySlice.js'
import brandReducer from '../features/brand/brandSlice.js'
import PcatReducer from '../features/productCategory/PcatSlice.js'
import BcatReducer from '../features/blogCategory/blogCatSlice.js'
import colorReducer from '../features/color/colorSlice.js'
import uploadReducer from '../features/upload/uploadSlice.js'
import couponReducer from '../features/coupons/couponSlice.js'



export const store = configureStore({
    reducer:{
        auth: authReducer,
        customers: customerReducer,
        products: productReducer,
        blogs: blogReducer,
        orders: orderReducer,
        enquiries: enquiryReducer,
        coupons: couponReducer,
        brands: brandReducer,
        ProCats: PcatReducer,
        BlogCats: BcatReducer,
        colors: colorReducer,
        images: uploadReducer
    },
})