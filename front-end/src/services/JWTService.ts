import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
    username: string
    roles: string[]
    exp: number
}

const TOKEN_KEY = 'jwtToken'

const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY)
}

const setToken = (token: string): string => {
    localStorage.setItem(TOKEN_KEY, token)
    return getToken() as string
}

const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY)
}

const getDecodedToken = (): DecodedToken | null => {
    const token = getToken()
    if (!token) return null
    try {
        return jwtDecode<DecodedToken>(token)
    } catch (error) {
        console.error('Failed to decode token', error)
        return null
    }
}

const getUsername = (decodedToken: DecodedToken): string => {
    return decodedToken ? decodedToken.username : ''
}

const getRoles = (decodedToken: DecodedToken): string[] => {
    return decodedToken ? decodedToken.roles : []
}

const isTokenExpired = (): boolean => {
    const decodedToken = getDecodedToken()
    if (!decodedToken) return true
    return decodedToken.exp * 1000 < Date.now()
}

export default {
    getToken,
    setToken,
    removeToken,
    getDecodedToken,
    getUsername,
    getRoles,
    isTokenExpired,
}