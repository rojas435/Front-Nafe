import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/UserService';
import { User } from '../types/User';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            const usersData = await getAllUsers();
            console.log('Usuarios recibidos:', usersData);
            setUsers(usersData);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const getUserRoleName = (user: User) => {
        if (!user.roles || user.roles.length === 0) return 'Sin rol asignado';
        return user.roles.map(role => role.name).join(', ');
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
            <BackButton />
        </div>
    );
};

export default UserList;