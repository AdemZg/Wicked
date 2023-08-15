export const base_url = "http://localhost:4000/api"

const { token } = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : {}

export const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
    }
}