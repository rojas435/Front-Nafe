import { useEffect, useState } from 'react';
import { getAllSchedules, createSchedule, updateSchedule, deleteSchedule } from '../services/ScheduleService';
import { Schedule } from '../types/Schedule';
import BackButton from '../components/BackButton';


const SchedulesPage = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [newSchedule, setNewSchedule] = useState<Schedule>({ userId: 0, routineId: 0 });
    const [editScheduleId, setEditScheduleId] = useState<number | null>(null);
    const [editSchedule, setEditSchedule] = useState<Schedule>({ userId: 0, routineId: 0 });

    useEffect(() => {
        loadSchedules();
    }, []);

    const loadSchedules = async () => {
        const data = await getAllSchedules();
        setSchedules(data);
    };

    const handleCreateSchedule = async () => {
        if (newSchedule.userId && newSchedule.routineId) {
            await createSchedule(newSchedule);
            setNewSchedule({ userId: 0, routineId: 0 });
            loadSchedules();
        }
    };

    const handleEditSchedule = (id: number, userId: number, routineId: number) => {
        setEditScheduleId(id);
        setEditSchedule({ userId, routineId });
    };

    const handleUpdateSchedule = async () => {
        if (editScheduleId && editSchedule.userId && editSchedule.routineId) {
            await updateSchedule(editScheduleId, editSchedule);
            setEditScheduleId(null);
            setEditSchedule({ userId: 0, routineId: 0 });
            loadSchedules();
        }
    };

    const handleDeleteSchedule = async (id: number) => {
        await deleteSchedule(id);
        loadSchedules();
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Horarios</h2>

            {/* Formulario para agregar nuevo schedule */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col gap-4">
                    <input
                        type="number"
                        value={newSchedule.userId}
                        onChange={(e) => setNewSchedule({ ...newSchedule, userId: Number(e.target.value) })}
                        placeholder="ID del Usuario"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        value={newSchedule.routineId}
                        onChange={(e) => setNewSchedule({ ...newSchedule, routineId: Number(e.target.value) })}
                        placeholder="ID de la Rutina"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleCreateSchedule}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Crear Horario
                    </button>
                </div>
            </div>

            {/* Listado de schedules */}
            <div className="bg-white rounded-lg shadow-md">
                <ul className="divide-y divide-gray-200">
                    {schedules.map((schedule) => (
                        <li key={schedule.idSchedule} className="p-4 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                                {editScheduleId === schedule.idSchedule ? (
                                    <div className="flex flex-col gap-4 flex-1">
                                        <input
                                            type="number"
                                            value={editSchedule.userId}
                                            onChange={(e) => setEditSchedule({ ...editSchedule, userId: Number(e.target.value) })}
                                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            type="number"
                                            value={editSchedule.routineId}
                                            onChange={(e) => setEditSchedule({ ...editSchedule, routineId: Number(e.target.value) })}
                                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleUpdateSchedule}
                                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                onClick={() => setEditScheduleId(null)}
                                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex-1">
                                            <span className="text-gray-800 font-medium">Usuario: {schedule.userId}</span>
                                            <p className="text-gray-600 text-sm">Rutina: {schedule.routineId}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditSchedule(schedule.idSchedule!, schedule.userId, schedule.routineId)}
                                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSchedule(schedule.idSchedule!)}
                                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            <BackButton/>
            </div>
        </div>
    );
};

export default SchedulesPage;
