import axios from 'axios'
import { base_url, config } from '../../utils/baseUrl'

const postQuery = async (contact) => {
    const response = await axios.post(`${base_url}/enquiry/`, contact)
    return response.data
}


const contactService = {
    postQuery,
}

export default contactService