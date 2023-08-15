import axios from 'axios'
import { base_url, config } from '../../utils/baseUrl'

const getUsers = async () => {
    const response = await axios.get(`${base_url}/user/all`)
    return response.data
}

const getUser = async (id) => {
    const response = await axios.get(`${base_url}/user/${id}`, config)
    return response.data
}


const deleteUser = async (id) => {
    const response = await axios.delete(`${base_url}/user/${id}`, config)
    return response.data
}

const getLoggedInAdmin= async () => {
    const response = await axios.get(`${base_url}/user/`, config)
    return response.data
}
const customerSerivce = {
    getUsers,
    getUser,
    deleteUser,
    getLoggedInAdmin
}

export default customerSerivce