import axios from 'axios'
import { base_url, config } from '../../utils/baseUrl'


const getColors = async () => {
    const response = await axios.get(`${base_url}/color/`)
    return response.data
}

const createColor = async (color) => {
    const response = await axios.post(`${base_url}/color/`, color, config)
    return response.data
}

const deleteColor = async (id) => {
    const response = await axios.delete(`${base_url}/color/${id}`, config)
    return response.data
}


const colorService = {
    getColors,
    createColor,
    deleteColor
}

export default colorService