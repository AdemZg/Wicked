export const base_url = "http://localhost:4000/api"

const { token } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}

export const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
    }
}