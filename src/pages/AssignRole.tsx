import { useEffect, useState } from 'react';
import { getAllUsers, assignRoleToUser } from '../services/UserService';
import { getAllRoles } from '../services/RoleService';
import { User } from '../types/User';
import { Role } from '../types/Role';

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]); // Todos los roles
    const [assignableRoles, setAssignableRoles] = useState<Role[]>([]); // Roles filtrados
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

    useEffect(() => {
        loadUsers();
        loadRoles();
    }, []);

    const loadUsers = async () => {
        const data = await getAllUsers();
        setUsers(data);
    };

    const loadRoles = async () => {
        const data = await getAllRoles(); // Obtener todos los roles
        setRoles(data);
    };

    const handleShowAssignableRoles = (userId: number, userRoles: Role[]) => {
        setSelectedUserId(userId);

        // Filtrar roles asignables (roles no asignados al usuario)
        const availableRoles = roles.filter(
            (role) => !userRoles.some((userRole) => userRole.id === role.id)
        );
        setAssignableRoles(availableRoles); // Guardar roles disponibles
    };

    const handleAssignRole = async () => {
        if (selectedUserId && selectedRoleId) {
            await assignRoleToUser(selectedUserId, selectedRoleId);
            alert('Rol asignado exitosamente');
            setSelectedUserId(null);
            setSelectedRoleId(null);
            loadUsers(); // Actualizar lista de usuarios y sus roles
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Usuarios</h2>

            <div className="bg-white rounded-lg shadow-md">
                <ul className="divide-y divide-gray-200">
                    {users.map((user) => (
                        <li key={user.id} className="p-4 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <span className="text-gray-800 font-medium">{user.name}</span>
                                    <p className="text-gray-600 text-sm">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => handleShowAssignableRoles(user.id, user.roles)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Asignar Rol
                                </button>
                            </div>
                            {selectedUserId === user.id && (
                                <div className="mt-4">
                                    <select
                                        onChange={(e) => setSelectedRoleId(Number(e.target.value))}
                                        value={selectedRoleId || ''}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Selecciona un rol</option>
                                        {assignableRoles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={handleAssignRole}
                                        className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                                    >
                                        Asignar
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UsersPage;
