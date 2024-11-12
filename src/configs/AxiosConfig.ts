import axios from 'axios';
import jwtService from '../services/JWTService';

const API_URL = 'http://localhost:8080/api/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = jwtService.getToken();
        if (token && config.headers && !config.url?.includes('/auth/signup')) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            jwtService.removeToken();
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;