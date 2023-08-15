import axios from "axios";
import { base_url, config } from "../../utils/baseUrl";


const getOrders = async () => {
    const response = await axios.get(`${base_url}/user/orders`, config)
    return response.data
}

const getOrderByUserId = async (id) => {
    const response = await axios.get(`${base_url}/user/user-order/${id}`, config)
    return response.data
}

const getAllUserOrders = async (id) => {
    const response = await axios.get(`${base_url}/user/all-user-orders/${id}`, config)
    return response.data
}

const deleteOrder = async (id) => {
    const response = await axios.delete(`${base_url}/user/delete-order/${id}`, config)
    return response.data
}

const orderService = {
    getOrders,
    getOrderByUserId,
    getAllUserOrders,
    deleteOrder
}


export default orderService