/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import { getAllRoles } from '../services/RoleService';
import { assignRoleToUser, getAllUsers } from '../services/UserService';
import { Role } from '../types/Role';
import { User } from '../types/User';

const AssignRolesComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [assignableRoles, setAssignableRoles] = useState<Role[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<{ [userId: number]: number | '' }>({});
    const [loading, setLoading] = useState<{ [userId: number]: boolean }>({});

    useEffect(() => {
        loadUsers();
        fetchRoles();
    }, []);

    const loadUsers = async () => {
        try {
            const data: User[] = await getAllUsers();
            console.log('Users loaded:', data);
            setUsers(data);

            const initialSelectedRoles: { [userId: number]: number | '' } = {};
            data.forEach((user: User) => {
                initialSelectedRoles[user.id] = user.roleId || '';
            });
            setSelectedRoles(initialSelectedRoles);
        } catch (error) {
            console.error('Error loading users:', error);
            alert('Error al cargar los usuarios');
        }
    };

    const fetchRoles = async () => {
        try {
            const roles = await getAllRoles();
            setAssignableRoles(roles);
        } catch (error) {
            console.error('Error fetching roles:', error);
            alert('Error al cargar los roles');
        }
    };

    const handleAssignRole = async (userId: number) => {
        console.log('Attempting to assign role. userId:', userId);
        console.log('Selected roles state:', selectedRoles);
        
        if (!userId) {
            console.error('No user ID provided');
            return;
        }

        const roleId = selectedRoles[userId];
        if (!roleId) {
            console.error('No role selected');
            return;
        }

        // Actualizar estado de loading
        setLoading(prev => ({ ...prev, [userId]: true }));

        try {
            // Convertir el roleId en un array como espera el backend
            await assignRoleToUser(userId, roleId);
            alert(`Rol asignado exitosamente al usuario con ID: ${userId}`);
            // Actualizar la lista de usuarios
            await loadUsers();
        } catch (error: any) {
            console.error('Error al asignar rol:', error);
            const errorMessage = error.response?.data?.message || 'Hubo un error al asignar el rol';
            alert(errorMessage);
        } finally {
            setLoading(prev => ({ ...prev, [userId]: false }));
        }
    };

    const handleRoleChange = (userId: number, roleId: string) => {
        console.log('Role change - userId:', userId, 'roleId:', roleId);
        setSelectedRoles(prevSelectedRoles => ({
            ...prevSelectedRoles,
            [userId]: roleId === '' ? '' : Number(roleId)
        }));
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Usuarios</h2>
            <div className="bg-white rounded-lg shadow-md">
                <ul className="divide-y divide-gray-200">
                    {users.map((user, userIndex) => (
                        <li
                            key={`user-${user.id ?? userIndex}`}
                            className="p-4 hover:bg-gray-50"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <span className="text-gray-800 font-medium">{user.name}</span>
                                    <p className="text-gray-600 text-sm">{user.email}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <select
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    value={selectedRoles[user.id] || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    disabled={loading[user.id]}
                                >
                                    <option value="">Selecciona un rol</option>
                                    {assignableRoles.map((role, roleIndex) => (
                                        <option
                                            key={`role-${role.id ?? roleIndex}`}
                                            value={role.id}
                                        >
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => handleAssignRole(user.id)}
                                    disabled={!selectedRoles[user.id] || loading[user.id]}
                                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {loading[user.id] ? 'Asignando...' : 'Asignar'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <BackButton />
            </div>
        </div>
    );
};

export default AssignRolesComponent;