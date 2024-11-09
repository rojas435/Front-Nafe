// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/AuthService';

interface User {
    role?: string;
}

interface AuthContextProps {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    hasRoles: (roles: string[]) => boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(authService.getUserInfo());
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!authService.isTokenExpired());

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

    const logout = () => {
        authService.removeToken();
        setUser(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        if (authService.isTokenExpired()) {
            logout();
        }
    }, []);

    const hasRoles = (roles: string[]) => {
        return user?.role ? roles.includes(user.role) : false;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, hasRoles }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};