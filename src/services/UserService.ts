/* eslint-disable @typescript-eslint/no-explicit-any */
//import axios from 'axios';
//import { User } from '../types/User';
import { Role } from '../types/Role';
import axiosInstance from '../configs/AxiosConfig';

//const API_BASE_URL = 'http://localhost:8080/api';

// export const getAllUsers = async (): Promise<User[]> => {
//     const response = await axios.get(`${API_BASE_URL}/users`);
//     return response.data;
// };

export const getAllUsers = async () => {
    const response = await axiosInstance.get('users'); // Base URL ya configurada
    return response.data;
};

export const getAssignableRoles = async (userId: number): Promise<{ roles: Role[] }> => {
    const response = await axiosInstance.get(`users/${userId}/assignable-roles`);
    return response.data;
};

export const assignRoleToUser = async (userId: number, roleId: number): Promise<void> => {
    try {
        await axiosInstance.post(`users/${userId}/assign-roles`, [roleId]);
        
        console.log('Role assignment successful');
    } catch (error: any) {
        console.error('Error in role assignment:', {
            status: error.response?.status,
            data: error.response?.data
        });
        throw error;
    }
};

