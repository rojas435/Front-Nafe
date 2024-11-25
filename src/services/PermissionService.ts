import axiosInstance from '../configs/AxiosConfig';
import { Permission } from '../types/Permission';

export const getAllPermissions = async (): Promise<Permission[]> => {
    const response = await axiosInstance.get<Permission[]>('/permissions');
    return response.data;
};

export const getPermissionById = async (permissionId: number): Promise<Permission> => {
    const response = await axiosInstance.get(`/permissions/${permissionId}`);
    return response.data;
};

export const createPermission = async (permission: Omit<Permission, 'id'>): Promise<Permission> => {
    const response = await axiosInstance.post('/permissions', permission);
    return response.data;
};

export const updatePermission = async (permissionId: number, permission: Omit<Permission, 'id'>): Promise<Permission> => {
    const response = await axiosInstance.put(`/permissions/${permissionId}`, permission);
    return response.data;
};

export const deletePermission = async (permissionId: number): Promise<void> => {
    await axiosInstance.delete(`/permissions/${permissionId}`);
};