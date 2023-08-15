import axios from 'axios'
import { base_url, config } from '../../utils/baseUrl'

const { token } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}

const registerUser = async (user) => {
    const response = await axios.post(`${base_url}/auth/register`,user)
    return response.data
}

const loginUser = async (user) => {
    const response = await axios.post(`${base_url}/auth/login`, user, { withCredentials: true, headers:{
        'Content-Type' : 'application/json; charset=UTF-8',
    }})
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const updateUser = async (user) => {
    const response = await axios.put(`${base_url}/user/edit`, user, config)
    response.data.token=token
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const changePassword = async (user) => {
    const response = await axios.put(`${base_url}/auth/update-password`, user, config)
    return response.data
}

const forgotPasswordToken = async (user) => {
    const response = await axios.post(`${base_url}/auth/forgot-password`, user, config)
    return response.data
}

const resetPassword = async (user) => {
    const response = await axios.put(`${base_url}/auth/reset-password/${user.token}`, {password: user.password, password2: user.password2}, config)
    return response.data
}

const getUserWishlist = async () => {
    const response = await axios.get(`${base_url}/user/wishlist`, config)
    return response.data
}

const addToCart = async (cart) => {
    const response = await axios.post(`${base_url}/user/cart`, cart, config)
    return response.data
}

const getUserCart = async () => {
    const response = await axios.get(`${base_url}/user/cart`, config)
    return response.data
}

const updateProductQuantityFromCart = async (productDetails) => {
    const response = await axios.put(`${base_url}/user/update-quantity-cart/${productDetails.id}`, {quantity: productDetails.quantity}, config)
    return response.data
}

const removeProductFromCart = async (id) => {
    const response = await axios.delete(`${base_url}/user/delete-product-cart/${id}`, config)
    return response.data
}

const createOrder = async (order) => {
    const response = await axios.post(`${base_url}/user/cart/create-order`, order ,config)
    return response.data
}

const getMyOrders = async () => {
    const response = await axios.get(`${base_url}/user/my-orders`, config)
    return response.data
}


export const userService = {
    registerUser,
    loginUser,
    updateUser,
    getUserWishlist,
    addToCart,
    getUserCart,
    removeProductFromCart,
    updateProductQuantityFromCart,
    createOrder,
    getMyOrders,
    changePassword,
    forgotPasswordToken,
    resetPassword
}

