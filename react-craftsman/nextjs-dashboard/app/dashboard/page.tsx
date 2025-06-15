'use client'
import { useAuth } from '@/lib/auth-context'
import { useApi } from '@/hooks/use-api'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface DashboardData {
    stats: {
        totalUsers: number
        totalOrders: number
    }
    recentActivities: Array<{
        id: string
        message: string
        timestamp: string
    }>
}

export default function DashboardPage() {
    const { isAuthenticated, isLoading: authLoading } = useAuth()
    const router = useRouter()
    const { data, loading, error } = useApi<DashboardData>('/dashboard')

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, authLoading, router])

    if (authLoading || loading) {
        return <div className="p-4">로딩 중...</div>
    }

    if (error) {
        return <div className="p-4 text-red-500">에러: {error}</div>
    }

    if (!data) {
        return <div className="p-4">데이터가 없습니다.</div>
    }

    return (
        <div className="p-6">
            Dashboard Page
        </div>
    )
}
