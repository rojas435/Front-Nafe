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

// src/services/AuthService.ts
export const login = async (username: string, password: string): Promise<string | null> => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        console.log('Login response status:', response.status); // Debug log

        if (!response.ok) {
            throw new Error(`Login failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Login response data:', data); // Debug log

        // Check different possible token locations in response
        const token = data.token || data.access_token || data.jwt;
        console.log('Extracted token:', token); // Debug log

        return token;
    } catch (error) {
        console.error('Login error details:', error);
        return null;
    }
};

export const signup = async (username: string, password: string, email: string, phone: string, rh: string, weight: number): Promise<string | null> => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email, phone, rh, weight })
        });

        if (!response.ok) {
            throw new Error(`Signup failed with status: ${response.status}`);
        }

        return 'User registered successfully';
    } catch (error) {
        console.error('Signup error details:', error);
        return null;
    }
};

// Utility function to decode JWT
export const decodeToken = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Token decode error:', error);
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
