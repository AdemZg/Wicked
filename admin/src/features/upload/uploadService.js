import axios from "axios";
import { base_url, config } from "../../utils/baseUrl";



const upload = async (images) => {
    const response = await axios.post(`${base_url}/upload/`, images ,config)
    return response.data
}

const deleteImage = async (id) => {
    const response = await axios.delete(`${base_url}/upload/delete-image/${id}` ,config)
    return response.data
}

const uploadService = {
    upload,
    deleteImage
}


export default uploadService