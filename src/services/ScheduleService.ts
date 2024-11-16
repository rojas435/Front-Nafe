import axiosInstance from '../configs/AxiosConfig';
import { Schedule } from '../types/Schedule';

// Obtener todos los schedules
export const getAllSchedules = async (): Promise<Schedule[]> => {
    const response = await axiosInstance.get('/schedules');
    return response.data;
};

// Obtener un schedule por ID
export const getScheduleById = async (id: number): Promise<Schedule> => {
    const response = await axiosInstance.get(`/schedules/${id}`);
    return response.data;
};

// Crear un nuevo schedule
export const createSchedule = async (scheduleData: Schedule): Promise<Schedule> => {
    const response = await axiosInstance.post('/schedules', scheduleData);
    return response.data;
};

// Actualizar un schedule existente
export const updateSchedule = async (id: number, scheduleData: Schedule): Promise<Schedule> => {
    const response = await axiosInstance.put(`/schedules/${id}`, scheduleData);
    return response.data;
};

// Eliminar un schedule
export const deleteSchedule = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/schedules/${id}`);
};
