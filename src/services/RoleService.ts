import axiosInstance from '../configs/AxiosConfig';
import { Role } from '../types/Role';

// Crear rol
export const createRole = async (roleData: Omit<Role, 'id'>): Promise<Role> => {
    const response = await axiosInstance.post<Role>('/roles', roleData);
    return response.data;
};

// Obtener rol por ID
export const getRoleById = async (id: number): Promise<Role> => {
    const response = await axiosInstance.get<Role>(`/roles/${id}`);
    return response.data;
};

// Obtener todos los roles
export const getAllRoles = async (): Promise<Role[]> => {
    const response = await axiosInstance.get<Role[]>('/roles');
    return response.data;
};

// Actualizar rol
export const updateRole = async (id: number, roleData: Omit<Role, 'id'>): Promise<Role> => {
    const response = await axiosInstance.put<Role>(`/roles/${id}`, roleData);
    return response.data;
};

// Eliminar rol
export const deleteRole = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/roles/${id}`);
};
