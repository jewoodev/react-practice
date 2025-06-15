import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'

export function useApi<T>(endpoint: string, dependencies: any[] = []) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                const result = await apiClient.get<T>(endpoint)
                setData(result)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, dependencies)

    const refetch = async () => {
        try {
            setLoading(true)
            setError(null)
            const result = await apiClient.get<T>(endpoint)
            setData(result)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, refetch }
}
