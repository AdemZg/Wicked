import axios from 'axios'
import { base_url, config } from '../../utils/baseUrl'


const getBlogs = async () => {
    const response = await axios.get(`${base_url}/blog/`)
    return response.data
}

const createBlog = async (blog) => {
    const response = await axios.post(`${base_url}/blog/`, blog, config)
    return response.data
}

const getBlog = async (id) => {
    const response = await axios.get(`${base_url}/blog/${id}`, config)
    return response.data
}

const updateBlog = async (blog) => {
    const response = await axios.put(`${base_url}/blog/${blog.id}`, blog.blogData, config)
    return response.data
}

const uploadBlogImage = async (blog) => {
    const response = await axios.put(`${base_url}/blog/upload/${blog.id}`,  blog.images, config)
    return response.data
}
const deleteBlog = async (id) => {
    const response = await axios.delete(`${base_url}/blog/${id}`, config)
    return response.data
}


const blogService = {
    getBlogs,
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog,
    uploadBlogImage
}

export default blogService