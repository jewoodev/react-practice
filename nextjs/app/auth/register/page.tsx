'use client'

import { useFormStatus } from 'react-dom'
import { signUp } from '@/app/actions/auth'
import {useActionState, useEffect} from "react"
import {useRouter} from "next/navigation"

// Submit 버튼 컴포넌트
function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 py-2 px-4 text-white rounded-md hover:bg-blue-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? '처리중...' : '회원가입'}
        </button>
    )
}

export default function RegisterPage() {
    const router = useRouter()

    const [state, action] = useActionState(signUp, undefined)

    useEffect(() => {
        if (!state?.errors && !state?.message) {
            router.push('/auth/login')
        }
    }, []);

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>

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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        이메일
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {state?.errors?.email && <p>{state.errors.email}</p>}

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        비밀번호
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {state?.errors?.password && <p>{state.errors.password}</p>}

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                        회원 유형
                    </label>
                    <select
                        id="role"
                        name="role"
                        defaultValue="DENTAL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="DENTAL">치과</option>
                        <option value="LAB">기공소</option>
                    </select>
                </div>
                {state?.errors?.role && <p>{state.errors.role}</p>}

                <SubmitButton />
            </form>
        </div>
    )
}