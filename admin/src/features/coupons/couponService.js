import axios from "axios";
import { base_url, config } from "../../utils/baseUrl";


const getCoupons = async () => {
    const response = await axios.get(`${base_url}/coupon/`, config)
    return response.data
}

const createCoupon = async (coupon) => {
    const response = await axios.post(`${base_url}/coupon/`, coupon, config)
    return response.data
}

const getCoupon = async (id) => {
    const response = await axios.get(`${base_url}/coupon/${id}`, config)
    return response.data
}

const updateCoupon = async (coupon) => {
    const response = await axios.put(`${base_url}/coupon/${coupon.id}`,coupon.couponData, config)
    return response.data
}

const deleteCoupon = async (id) => {
    const response = await axios.delete(`${base_url}/coupon/${id}`, config)
    return response.data
}
const couponService = {
    getCoupons,
    createCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
}


export default couponService