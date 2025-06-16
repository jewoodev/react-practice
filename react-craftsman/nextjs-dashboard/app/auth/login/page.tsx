'use client'

import {login} from '@/app/actions/auth'
import {useActionState, useEffect} from "react"
import { useFormStatus } from 'react-dom'
import {useRouter} from "next/navigation"
import Link from 'next/link'

// Submit 버튼 컴포넌트
function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-1/2 bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? '처리중...' : '로그인'}
        </button>
    )
}

export default function LoginPage() {
    const router = useRouter()

    const [state, action] = useActionState(login, undefined)

    // 로그인 성공 시 페이지 이동
    useEffect(() => {
        if (!state?.errors && state?.data?.token) {
            router.push('/dashboard')
        }
    }, [])

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>

            <form action={action} className="space-y-4">

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        사용자명
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {state?.errors?.username && <p>{state.errors.username}</p>}

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        비밀번호
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {state?.errors?.password && <p>{state.errors.password}</p>}

                <div className="flex gap-x-4">
                    <LoginButton />
                    <Link href="/auth/register" className="w-1/2">
                        <div
                            className="w-full bg-sky-500 py-2 px-4 text-white rounded-md hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed text-center"
                        >
                            회원가입
                        </div>
                    </Link>
                </div>
            </form>
        </div>
    )
}