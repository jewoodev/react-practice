'use client'

import { useEffect, useState } from 'react'
import { getDashboard } from '@/app/actions/dashboard'
import {useRouter} from "next/navigation"

export default function DashboardPage() {
    const [errors, setErrors] = useState<string | undefined>()
    const [data, setData] = useState<string | undefined>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const result = await getDashboard()
                setErrors(result.errors)
                setData(result.data)
            } catch {
                setErrors('데이터를 가져오는 중 오류가 발생했습니다.')
            } finally {
                setLoading(false)
            }
        }

        fetchDashboard()
    }, [])

    if (loading) {
        return <p>로딩 중...</p>
    }

    if (errors) {
        useRouter().push('/auth/login')
    }

    return <p>{data}</p>
}