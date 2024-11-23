import axios from 'axios';
import { User } from '../types/User';
import { Role } from '../types/Role';
import axiosInstance from '../configs/AxiosConfig';

const API_BASE_URL = 'http://localhost:8080/api';

// export const getAllUsers = async (): Promise<User[]> => {
//     const response = await axios.get(`${API_BASE_URL}/users`);
//     return response.data;
// };

export const getAllUsers = async () => {
    const response = await axiosInstance.get('users'); // Base URL ya configurada
    return response.data;
};

export const getAssignableRoles = async (userId: number): Promise<{ roles: Role[] }> => {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/assignable-roles`);
    return response.data;
};

export const assignRoleToUser = async (userId: number, roleId: number): Promise<void> => {
    await axios.post(`${API_BASE_URL}/users/${userId}/roles`, { roleId });
};
