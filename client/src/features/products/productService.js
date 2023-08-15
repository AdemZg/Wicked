import axios from 'axios'
import { base_url, config } from '../../utils/baseUrl'

const getProducts = async (data) => {
    console.log(data)
    const response = await axios.get(`${base_url}/product?${data?.brand?`brand=${data?.brand}&&`:""}${data?.category?`category=${data?.category}&&`:""}${data?.tag?`tags=${data.tag}&&`:""}${data?.minPrice?`price[gte]=${data.minPrice}&&`:""}${data?.maxPrice?`price[lte]=${data.maxPrice}&&`:""}${data?.sort?`sort=${data.sort}`:""}`)
    return response.data
}

const getProduct = async (id) => {
    const response = await axios.get(`${base_url}/product/${id}`)
    return response.data
}

const addToWishlist = async (prodId) => {
    const response = await axios.put(`${base_url}/product/wishlist`, { prodId }, config)
    return response.data
}

const rateProduct = async (data) => {
    const response = await axios.put(`${base_url}/product/rating`, data, config)
    return response.data
}

const productService = {
    getProducts,
    getProduct,
    addToWishlist,
    rateProduct
}

export default productService