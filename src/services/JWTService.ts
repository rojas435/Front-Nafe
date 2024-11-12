import { DecodedToken } from "../types/JWT";

export default class JWTService {

    private static readonly TOKEN_KEY = 'jwtToken';

    static setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    static getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    static removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    static isTokenValid(token: string): boolean {
        // Implement your token validation logic here
        // For example, check if the token is expired
        const decoded = this.getDecodedToken(token);
        if (!decoded) return false;

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp > currentTime;
    }

    static getDecodedToken(token: string): DecodedToken | null {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload) as DecodedToken;
        } catch (error) {
            console.error('Invalid token:', error);
            return null;
        }
    }
}