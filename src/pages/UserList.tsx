import { useEffect, useState } from 'react';
import { getAllUsers, getAssignableRoles } from '../services/UserService';
import { getAllRoles } from '../services/RoleService';
import { User } from '../types/User';
import { Role } from '../types/Role';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [, setRoles] = useState<Role[]>([]);
    const [userRoles, setUserRoles] = useState<Record<number, Role[]>>({});
    const navigate = useNavigate();

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            // Cargar usuarios y roles
            const [usersData, rolesData] = await Promise.all([
                getAllUsers(),
                getAllRoles()
            ]);

            console.log('Usuarios recibidos:', usersData);
            console.log('Roles recibidos:', rolesData);

            setUsers(usersData);
            setRoles(rolesData);

            // Cargar roles para cada usuario
            const userRolesMap: Record<number, Role[]> = {};
            for (const user of usersData) {
                try {
                    const { roles: userRoleData } = await getAssignableRoles(user.id);
                    userRolesMap[user.id] = userRoleData;
                } catch (error) {
                    console.error(`Error loading roles for user ${user.id}:`, error);
                    userRolesMap[user.id] = [];
                }
            }
            setUserRoles(userRolesMap);

        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const getUserRoleName = (user: User) => {
        const userRolesList = userRoles[user.id] || [];
        if (userRolesList.length === 0) return 'Sin rol asignado';
        return userRolesList.map(role => role.name).join(', ');
    };

    const goToAssignRolesPage = () => {
        navigate('/assignRoles');
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista de Usuarios</h2>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Rol
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {user.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {getUserRoleName(user)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        
                    </table>
                </div>
                <button
                    onClick={goToAssignRolesPage}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"  
                >
                    Go to assign Roles
                </button>
            </div>
        </div>
    );
};

export default UserList;