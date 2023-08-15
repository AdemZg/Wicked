import axios from 'axios'
import { base_url, config } from '../../utils/baseUrl'


const getBcat = async () => {
    const response = await axios.get(`${base_url}/blog-category/`)
    return response.data
}

const createBcat = async (brand) => {
    const response = await axios.post(`${base_url}/blog-category/`, brand, config)
    return response.data
}

const getBlogCat = async (id) => {
    const response = await axios.get(`${base_url}/blog-category/${id}`, config)
    return response.data
}

const updateBlogCat = async (category) => {
    const response = await axios.put(`${base_url}/blog-category/${category.id}`, category.categoryData, config)
    return response.data
}

const deleteBlogCat = async (id) => {
    const response = await axios.delete(`${base_url}/blog-category/${id}`, config)
    return response.data
}

const BcatService = {
    getBcat,
    createBcat,
    getBlogCat,
    updateBlogCat,
    deleteBlogCat
}

export default BcatService