import { useEffect, useState } from 'react';
import { getAllRoutines, createRoutine, updateRoutine } from '../services/RoutineService'; //deleteRoutine iba en los corchetes para poder usar el método
import { Routine } from '../types/Routine';
import BackButton from '../components/BackButton';

const RoutinesPage = () => {
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [newRoutine, setNewRoutine] = useState({ name: '', descriptionRoutine: '' });
    const [editRoutineId, setEditRoutineId] = useState<number | null>(null);
    const [editRoutine, setEditRoutine] = useState({ name: '', descriptionRoutine: '' });

    useEffect(() => {
        loadRoutines();
    }, []);

    const loadRoutines = async () => {
        const data = await getAllRoutines();
        setRoutines(data);
    };

    const handleCreateRoutine = async () => {
        if (newRoutine.name && newRoutine.descriptionRoutine) {
            await createRoutine(newRoutine);
            setNewRoutine({ name: '', descriptionRoutine: '' });
            loadRoutines();
        }
    };

    const handleEditRoutine = (id: number, name: string, descriptionRoutine: string) => {
        setEditRoutineId(id);
        setEditRoutine({ name, descriptionRoutine });
    };

    const handleUpdateRoutine = async () => {
        if (editRoutineId && editRoutine.name && editRoutine.descriptionRoutine) {
            await updateRoutine(editRoutineId, editRoutine);
            setEditRoutineId(null);
            setEditRoutine({ name: '', descriptionRoutine: '' });
            loadRoutines();
        }
    };

    /** Comentado por no estar funcional. Decidir si lo modifcamos o cambiamos de modo que no se vea esta funcionalidad
     * @deprecated This method exists but should not be used.
     * Handles the deletion of a routine by its ID.
     * 
     * @param {number} id - The ID of the routine to delete.
     * @returns {Promise<void>} A promise that resolves when the routine is deleted and routines are reloaded.
    
    const handleDeleteRoutine = async (id: number) => {
        await deleteRoutine(id);
        loadRoutines();
    };
    */

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Rutinas</h2>

            {/* Formulario para agregar nueva rutina */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={newRoutine.name}
                        onChange={(e) => setNewRoutine({ ...newRoutine, name: e.target.value })}
                        placeholder="Nombre de la Rutina"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        value={newRoutine.descriptionRoutine}
                        onChange={(e) => setNewRoutine({ ...newRoutine, descriptionRoutine: e.target.value })}
                        placeholder="Descripción de la Rutina"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleCreateRoutine}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Crear Rutina
                    </button>
                </div>
            </div>

            {/* Listado de rutinas */}
            <div className="bg-white rounded-lg shadow-md">
                <ul className="divide-y divide-gray-200">
                    {routines.map((routine) => (
                        <li key={routine.idRoutine} className="p-4 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                                {editRoutineId === routine.idRoutine ? (
                                    <div className="flex flex-col gap-4 flex-1">
                                        <input
                                            type="text"
                                            value={editRoutine.name}
                                            onChange={(e) => setEditRoutine({ ...editRoutine, name: e.target.value })}
                                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <textarea
                                            value={editRoutine.descriptionRoutine}
                                            onChange={(e) => setEditRoutine({ ...editRoutine, descriptionRoutine: e.target.value })}
                                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleUpdateRoutine}
                                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                onClick={() => setEditRoutineId(null)}
                                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex-1">
                                            <span className="text-gray-800 font-medium">{routine.name}</span>
                                            <p className="text-gray-600 text-sm">{routine.descriptionRoutine}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditRoutine(routine.idRoutine!, routine.name, routine.descriptionRoutine)}
                                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                                            >
                                                Editar
                                            </button>
                                            {/* Esta comentado porque delete no funciona en el back y ya lo habíamos hablado
                                            <button
                                                onClick={() => handleDeleteRoutine(routine.idRoutine!)}
                                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                            >
                                                Eliminar
                                            </button>
                                            */}
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

export default RoutinesPage;
