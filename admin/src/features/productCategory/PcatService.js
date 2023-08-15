import axios from 'axios'
import { base_url, config } from '../../utils/baseUrl'


const getPcat = async () => {
    const response = await axios.get(`${base_url}/product-category/`)
    return response.data
}

const createProCat = async (product) => {
    const response = await axios.post(`${base_url}/product-category/`, product, config)
    return response.data
}

const getProCat = async (id) => {
    const response = await axios.get(`${base_url}/product-category/${id}`, config)
    return response.data
}

const updateProCat = async (category) => {
    const response = await axios.put(`${base_url}/product-category/${category.id}`,category.categoryData, config)
    return response.data
}

const deleteProCat = async (id) => {
    const response = await axios.delete(`${base_url}/product-category/${id}`, config)
    return response.data
}

const PcatService = {
    getPcat,
    createProCat,
    getProCat,
    updateProCat,
    deleteProCat
}

export default PcatService