import axios from "axios"
import { authStore } from "../store/authStore"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: false,
    headers: { "Content-Type": "application/json" }
})

api.interceptors.request.use(
    (config) => {
        const token = authStore.getState().user?.token

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },

    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.status === 401) {
            authStore.getState().logout()
        }

        return Promise.reject(error)
    }
)

export default api