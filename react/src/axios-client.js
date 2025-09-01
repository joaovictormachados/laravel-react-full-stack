import axios from 'axios'

const base = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001'

const axiosClient = axios.create({
    baseURL: `${base}/api`,
})


axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    try {
        
    const {response} =error;
    if (response.status ===401) {
        localStorage.removeItem('ACCESS_TOKEN');
    }

    } catch (e) {
        console.error(e);

    }
    throw error;
})

export default axiosClient;
