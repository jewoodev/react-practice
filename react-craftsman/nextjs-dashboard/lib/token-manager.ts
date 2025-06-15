export class TokenManager {
    private static readonly TOKEN_KEY = 'authToken'

    static setToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.TOKEN_KEY, token)
        }
    }

    static getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(this.TOKEN_KEY)
        }
        return null
    }

    static removeToken(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.TOKEN_KEY)
        }
    }

    static isTokenExpired(token: string): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            const currentTime = Math.floor(Date.now() / 1000)
            return payload.exp < currentTime
        } catch {
            return true
        }
    }
}