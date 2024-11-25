import React, { useEffect, useState } from 'react';
import { MachineService } from '../services/MachineService';
import type { Machine } from '../types/Machine';

const MachinesPage: React.FC = () => {
    const [machines, setMachines] = useState<Machine[]>([]);
    const [newMachine, setNewMachine] = useState<Machine>({ idMachine: 0, name: '', description: '' }); // idMachine agregado
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const machineService = new MachineService();

    useEffect(() => {
        const fetchMachines = async () => {
            try {
                const data = await machineService.getMachines();
                // Mapea idMachine a id
                const mappedMachines = data.map((machine: Machine) => ({
                    idMachine: machine.idMachine,
                    id: machine.idMachine,
                    name: machine.name,
                    description: machine.description,
                }));

                setMachines(mappedMachines);
                setLoading(false);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred');
                setLoading(false);
            }
        };

        fetchMachines();
    }, []);

    const handleCreate = async () => {
        if (!newMachine.name || !newMachine.description) {
            setError('Please provide both name and description for the machine');
            return;
        }

        try {
            const createdMachine: Machine = await machineService.createMachine(newMachine);
            setMachines([...machines, createdMachine]);
            setNewMachine({ idMachine: 0, name: '', description: '' }); // Reset with idMachine as 0
            setError(null);
        } catch (error) {
            setError('Error creating machine');
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!id) {
        setError('Invalid machine ID');
        return;
        }

        try {
        await machineService.deleteMachine(id);
        setMachines(machines.filter((machine) => machine.id !== id));
        setError(null);
        } catch (error) {
        setError('Error deleting machine: ' + (error instanceof Error ? error.message : 'Unknown error'));
        console.error(error);
        }
    };

    if (loading) {
        return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg text-gray-600">Loading...</div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
            Error: {error}
        </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Machines</h1>
        
        {/* Form to add new machine */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add a New Machine</h2>
            <div className="space-y-4">
            <div>
                <input
                type="text"
                placeholder="Machine Name"
                value={newMachine.name}
                onChange={(e) => setNewMachine({ ...newMachine, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
            </div>
            <div>
                <input
                type="text"
                placeholder="Machine Description"
                value={newMachine.description}
                onChange={(e) => setNewMachine({ ...newMachine, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
            </div>
            <button
                onClick={handleCreate}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
                Create Machine
            </button>
            </div>
        </div>

        {/* Display list of machines */}
        <div className="bg-white rounded-lg shadow-md">
            {machines.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
                No machines found
            </div>
            ) : (
            <ul className="divide-y divide-gray-200">
                {machines.map((machine, index) => (
                    <li
                        key={machine.id ?? `machine-${index}`}
                        className="p-6 hover:bg-gray-50 transition-colors duration-150"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-800">{machine.name}</h3>
                                <p className="mt-1 text-gray-600">{machine.description}</p>
                            </div>
                            {machine.id ? (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDelete(machine.id!)}
                                        className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                <span className="text-gray-400">No ID</span>
                            )}

                        </div>
                    </li>
                ))}
            </ul>
            )}
        </div>
        </div>
    );
};

export default MachinesPage;
