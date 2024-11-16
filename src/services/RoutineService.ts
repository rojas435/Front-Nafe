import axiosInstance from '../configs/AxiosConfig';
import { Routine } from '../types/Routine';

// Obtener todas las rutinas
export const getAllRoutines = async (): Promise<Routine[]> => {
    const response = await axiosInstance.get('/routines');
    return response.data;
};

// Obtener una rutina por ID
export const getRoutineById = async (id: number): Promise<Routine> => {
    const response = await axiosInstance.get(`/routines/${id}`);
    return response.data;
};

// Crear una nueva rutina
export const createRoutine = async (routineData: Routine): Promise<Routine> => {
    const response = await axiosInstance.post('/routines', routineData);
    return response.data;
};

// Actualizar una rutina existente
export const updateRoutine = async (id: number, routineData: Routine): Promise<Routine> => {
    const response = await axiosInstance.put(`/routines/${id}`, routineData);
    return response.data;
};

// Eliminar una rutina
export const deleteRoutine = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/routines/${id}`);
};
