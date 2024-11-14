import { useEffect, useState } from 'react';
import { createRole, deleteRole, getAllRoles, updateRole } from '../services/RoleService';
import { Role } from '../types/Role';

const RolesPage = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [newRole, setNewRole] = useState('');
    const [newRoleDescription, setNewRoleDescription] = useState('');
    const [editRoleId, setEditRoleId] = useState<number | null>(null);
    const [editRoleName, setEditRoleName] = useState('');
    const [editRoleDescription, setEditRoleDescription] = useState('');

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {
        const data = await getAllRoles();
        setRoles(data);  // 'data' debe ser un arreglo de tipo 'Role[]'
    };

    const handleCreateRole = async () => {
        if (newRole && newRoleDescription) {
            const roleData = { name: newRole, description: newRoleDescription };
            await createRole(roleData);
            setNewRole('');
            setNewRoleDescription('');
            loadRoles();
        }
    };

    const handleEditRole = (id: number, name: string, description: string) => {
        setEditRoleId(id);
        setEditRoleName(name);
        setEditRoleDescription(description);
    };

    const handleUpdateRole = async () => {
        if (editRoleId && editRoleName && editRoleDescription) {
            const roleData = { name: editRoleName, description: editRoleDescription };
            await updateRole(editRoleId, roleData);
            setEditRoleId(null);
            setEditRoleName('');
            setEditRoleDescription('');
            loadRoles();
        }
    };

    const handleDeleteRole = async (id: number) => {
        await deleteRole(id);
        loadRoles();
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Roles</h2>

            {/* Formulario para agregar nuevo rol */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        placeholder="Nuevo Rol"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                        value={newRoleDescription}
                        onChange={(e) => setNewRoleDescription(e.target.value)}
                        placeholder="Descripción del Rol"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button 
                        onClick={handleCreateRole}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        Crear Rol
                    </button>
                </div>
            </div>

            {/* Listado de roles */}
            <div className="bg-white rounded-lg shadow-md">
                <ul className="divide-y divide-gray-200">
                    {roles.map((role) => (
                        <li key={role.id} className="p-4 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                                {editRoleId === role.id ? (
                                    <div className="flex flex-col gap-4 flex-1">
                                        <input
                                            type="text"
                                            value={editRoleName}
                                            onChange={(e) => setEditRoleName(e.target.value)}
                                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <textarea
                                            value={editRoleDescription}
                                            onChange={(e) => setEditRoleDescription(e.target.value)}
                                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Descripción del Rol"
                                        />
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={handleUpdateRole}
                                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                                            >
                                                Guardar
                                            </button>
                                            <button 
                                                onClick={() => setEditRoleId(null)}
                                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex-1">
                                            <span className="text-gray-800 font-medium">{role.name}</span>
                                            <p className="text-gray-600 text-sm">{role.description}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleEditRole(role.id, role.name, role.description)}
                                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteRole(role.id)}
                                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
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
            </div>
        </div>
    );
};

export default RolesPage;
