import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-4 py-2 
                     bg-gray-700 hover:bg-gray-800
                     text-gray-100 text-sm font-medium rounded-md
                     transition-all duration-300 ease-in-out
                     hover:shadow-sm hover:gap-3
                     active:bg-gray-900
                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 transform transition-transform duration-300 ease-in-out
                         group-hover:-translate-x-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
            >
                <path 
                    fillRule="evenodd" 
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                />
            </svg>
            <span className="transform transition-all duration-300 ease-in-out
                           group-hover:translate-x-1">
                Cerrar sesión
            </span>
        </button>
    );
};

export default Logout;