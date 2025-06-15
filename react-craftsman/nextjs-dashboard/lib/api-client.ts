import { TokenManager } from "@/lib/token-manager"

export class ApiClient {
    private baseUrl: string

    constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '') {
        this.baseUrl = baseUrl
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const token = TokenManager.getToken()

        const config: RequestInit = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, config)

        // 401 에러 시 토큰 제거 및 로그인 페이지로 리다이렉트
        if (response.status === 401) {
            TokenManager.removeToken()
            if (typeof window !== 'undefined') {
                window.location.href = '/login'
            }
            throw new Error('Unauthorized')
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response.json()
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'GET',
        })
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        })
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        })
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' })
    }
}

export const apiClient = new ApiClient()