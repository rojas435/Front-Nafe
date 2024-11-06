// src/context/AuthContext.tsx
import React from 'react';

import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/AuthService.ts';

interface AuthContextProps {
    user: unknown | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<unknown | null>(authService.getUserInfo());
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!authService.isTokenExpired());

    // Función para iniciar sesión
    const login = async (username: string, password: string): Promise<boolean> => {
        const token = await authService.login(username, password);
        if (token) {
            authService.setToken(token);
            setUser(authService.getUserInfo());
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    // Función para cerrar sesión
    const logout = () => {
        authService.removeToken();
        setUser(null);
        setIsAuthenticated(false);
    };

    // Verificación del estado de autenticación en el primer render
    useEffect(() => {
        if (authService.isTokenExpired()) {
            logout();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};
