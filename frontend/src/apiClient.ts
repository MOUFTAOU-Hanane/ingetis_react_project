import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config: any) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            if (!config.headers) config.headers = {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => Promise.reject(error)
);

export default apiClient;
