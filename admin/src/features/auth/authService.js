import axios from 'axios'
import { base_url, config } from '../../utils/baseUrl'

const login = async (user) => {
    const response = await axios.post(`${base_url}/auth/login-admin`, user, { withCredentials: true, headers:{
        'Content-Type' : 'application/json; charset=UTF-8',
    }
    })
    if(response.data){
        localStorage.setItem('admin', JSON.stringify(response.data))
    }
    return response.data
}

const logout = async () => {
    await axios.get(`${base_url}/auth/logout`)
}



const authSerivce = {
    login,
    logout,

}

export default authSerivce