import { useEffect, useState } from 'react';
import { getAllPermissions } from '../services/PermissionService';
import { Permission } from '../types/Permission';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';


const PermissionList = () => {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadInitialData();
    }, [navigate]);

    const loadInitialData = async () => {
        try{
            const permissionsData = await getAllPermissions();
            console.log('Permisos recibidos:', permissionsData);
            setPermissions(permissionsData);
        } catch(error) {
            console.error('Error loading data:', error);
        }
    };

    const getPermissionName = (permission: Permission) => {
        if(!permission.name) return 'Sin nombre';
    };

    const goToEditPermission = (permissionId: number) =>{
        navigate(`/editPermission/${permissionId}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista de Permisos</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Descripcion
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {permissions.map((permission) => (
                                <tr key={permission.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {permission.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {permission.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {getPermissionName(permission)}
                                        </div>
                                    </td>
                                    <div>
                                        <button 
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => goToEditPermission(permission.id)}
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </tr>
                            ))}
                        </tbody>
                        
                    </table>
                </div>
                <BackButton />
            </div>
        </div>
    );
};

export default PermissionList;
