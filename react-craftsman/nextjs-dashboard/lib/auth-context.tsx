'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { TokenManager } from './token-manager'
import { apiClient } from './api-client'

interface User {
    id: string
    email: string
    name: string
    role: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    isLoading: boolean
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const isAuthenticated = !!user

    useEffect(() => {
        checkAuthStatus()
    }, [])

    const checkAuthStatus = async () => {
        try {
            const token = TokenManager.getToken()

            if (!token || TokenManager.isTokenExpired(token)) {
                TokenManager.removeToken()
                setIsLoading(false)
                return
            }

            // 백엔드에서 사용자 정보 가져오기
            const userData = await apiClient.get<User>('/api/user/me')
            setUser(userData)
        } catch (error) {
            console.error('Auth check failed:', error)
            TokenManager.removeToken()
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            if (response.ok) {
                const { token, user: userData } = await response.json()

                TokenManager.setToken(token)
                setUser(userData)
                return true
            }
        } catch (error) {
            console.error('Login failed:', error)
        }
        return false
    }

    const logout = () => {
        TokenManager.removeToken()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isLoading,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
