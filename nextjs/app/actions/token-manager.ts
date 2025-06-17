'use server'

import {cookies} from "next/headers"


const ACCESS_KEY = 'accessToken'
const REFRESH_KEY = 'refreshToken'

export async function  setAccessToken(accessToken: string): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.set(ACCESS_KEY, accessToken)
}

export async function setToken(accessToken: string, refreshToken: string): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.set(ACCESS_KEY, accessToken)
    cookieStore.set(REFRESH_KEY, refreshToken)
}

export async function getToken(): Promise<string | undefined> {
    const cookieStore = await cookies()
    return cookieStore.get(ACCESS_KEY)?.value
}

export async function removeToken(): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.delete(ACCESS_KEY)
    cookieStore.delete(REFRESH_KEY)
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
