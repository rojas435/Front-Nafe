
// src/pages/User.tsx
import { useAuth } from '../context/AuthContext';

const User = () => {
    const { userRole } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div className="divide-y divide-gray-200">
                            <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
                            <p>Welcome to the user area!</p>
                            <p>Your role is: {userRole}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;