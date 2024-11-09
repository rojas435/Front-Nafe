// src/services/AuthService.ts

const TOKEN_KEY = 'jwtToken';

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};

export const isTokenExpired = (): boolean => {
    const token = getToken();
    if (!token) return true;

    try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        return exp * 1000 < Date.now();
    } catch {
        return true;
    }
};

export const login = async (username: string, password: string): Promise<string | null> => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) throw new Error('Login failed');
        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getUserInfo = () => {
    const token = getToken();
    if (!token) return null;

    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
};
