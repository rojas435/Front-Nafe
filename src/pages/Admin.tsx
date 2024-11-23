// src/pages/Admin.tsx
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { userRole } = useAuth();
    const navigate = useNavigate();

    const goToRolesPage = () => {
        navigate('/roles');
    };

    const goToAssignRolesPage = () => {
        navigate('/assignRoles');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                                <p>Welcome to the admin area!</p>
                                <p>Your role is: {userRole}</p>
                                <div className="flex flex-col space-y-4">
                                    <button 
                                    onClick={goToRolesPage} 
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                    >
                                    Go to Roles Page
                                    </button>

                                    <button
                                        onClick={goToAssignRolesPage}
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"  
                                    >
                                        Go to assign Roles Page
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
