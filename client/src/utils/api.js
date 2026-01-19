import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    const appToken = localStorage.getItem('appToken')
    
    if(token){
        req.headers.Authorization = `Bearer ${token}`
    }
    if(appToken){
        req.headers['X-App-Token'] = appToken
    }
    return req
})

api.interceptors.response.use((res) => res, (err) => {
    if(err.response?.status === 401){
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
    if(err.response?.status === 403){
        localStorage.removeItem("appToken");
        window.location.href = "/";
    }
    return Promise.reject(err)
})

export default api;