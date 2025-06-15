'use server'

import {SignInFormState, SignInFormSchema, SignUpFormSchema, SignUpFormState} from '@/lib/definition'


export async function signUp(prevState: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
    try {
        const validatedFields = SignUpFormSchema.safeParse({
            username: formData.get('username'),
            password: formData.get('password'),
            email: formData.get('email'),
            role: formData.get('role'),
        })

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors
            }
        }

        // 2. API 요청
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedFields),
        })

        // 3. 응답 처리
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || '회원가입 중 오류가 발생했습니다')
        }

        return { data }
    } catch (error) {
        if (error instanceof Error) {
            return {
                message: error.message,
            }
        }

        return {
            message: '알 수 없는 오류가 발생했습니다',
        }
    }
}


export async function login(prevState: SignInFormState, formData: FormData): Promise<SignInFormState> {
    try {
        const validatedFields = SignInFormSchema.safeParse({
            username: formData.get('username'),
            password: formData.get('password'),
        })

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }

        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedFields),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || '로그인 중 오류가 발생했습니다')
        }

        return { data }
    } catch (error) {

        if (error instanceof Error) {
            return {
                message: error.message,
            }
        }

        return {
            message: '알 수 없는 오류가 발생했습니다',
        }
    }
}