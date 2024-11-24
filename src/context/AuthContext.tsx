import React, { createContext, useState, useEffect, useContext } from 'react';
import JWTService from '../services/JWTService';

interface AuthContextType {
    isAuthenticated: boolean;
    userRole: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const token = JWTService.getToken();
        return token ? JWTService.isTokenValid(token) : false;
    });

    const [userRole, setUserRole] = useState<string | null>(() => {
        const token = JWTService.getToken();
        const decoded = token ? JWTService.getDecodedToken(token) : null;
        return decoded?.roles?.[0] || null;
    });

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const token = JWTService.getToken();
                if (token && JWTService.isTokenValid(token)) {
                    const decoded = JWTService.getDecodedToken(token);
                    setIsAuthenticated(true);
                    setUserRole(decoded?.roles?.[0] || null);
                } else {
                    console.warn('Token invalid or not found');
                    JWTService.removeToken();
                    setIsAuthenticated(false);
                    setUserRole(null);
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                JWTService.removeToken();
                setIsAuthenticated(false);
                setUserRole(null);
            }
        };

        initializeAuth();
        // Set up token expiration check
        const interval = setInterval(initializeAuth, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const login = (token: string) => {
        JWTService.setToken(token);
        const decoded = JWTService.getDecodedToken(token) as { roles?: string[] };
        setIsAuthenticated(true);
        setUserRole(decoded.roles?.[0] || null);
    };

    const logout = () => {
        JWTService.removeToken();
        setIsAuthenticated(false);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
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