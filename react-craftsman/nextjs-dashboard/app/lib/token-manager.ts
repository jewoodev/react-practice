import {cookies} from "next/headers"


export class TokenManager {

    static ACCESS_KEY: string= 'accessToken'
    static REFRESH_KEY: string = 'refreshToken'

    static async setAccessToken(accessToken: string): Promise<void> {
        if (typeof window !== 'undefined') {
            const cookieStore = await cookies()
            cookieStore.set(this.ACCESS_KEY, accessToken)
        }
    }

    static async setToken(accessToken: string, refreshToken: string): Promise<void> {
        if (typeof window !== 'undefined') {
            const cookieStore = await cookies()
            cookieStore.set(this.ACCESS_KEY, accessToken)
            cookieStore.set(this.REFRESH_KEY, refreshToken)
        }
    }

    static async getToken(): Promise<string | undefined> {
        if (typeof window !== 'undefined') {
            const cookieStore = await cookies()
            return cookieStore.get(this.ACCESS_KEY)?.value
        }
        return undefined
    }

    static async removeToken(): Promise<void> {
        if (typeof window !== 'undefined') {
            const cookieStore = await cookies()
            cookieStore.delete(this.ACCESS_KEY)
            cookieStore.delete(this.REFRESH_KEY)
        }
    }

    // static isTokenExpired(token: string): boolean {
    //     try {
    //         const payload = JSON.parse(atob(token.split('.')[1]))
    //         const currentTime = Math.floor(Date.now() / 1000)
    //         return payload.exp < currentTime
    //     } catch {
    //         return true
    //     }
    // }
}