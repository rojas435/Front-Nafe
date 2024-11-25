import axios from 'axios';
import jwtService from '../services/JWTService';

const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api/' // Para desarrollo local
    : 'http://xhgrid2:8080/api/';  // Producción (redirigir al backend local a través del hostname del frontend)

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


//Esto daña lo de Nayeli
// export const getAllUsers = async () =>{
//     const token = localStorage.getItem('jwtToken');
//     const response = await axiosInstance.get("http://localhost:8080/api/users", {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
//     return response.data;
// }

// export const getAllRoles = async () =>{
//     const response = await axiosInstance.get("http://localhost:8080/api/roles");
//     return response.data;
// };



export default axiosInstance;



