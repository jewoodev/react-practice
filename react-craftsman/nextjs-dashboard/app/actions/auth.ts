'use server'

import { z } from 'zod/v4';


const RegisterSchema = z.object({
    username: z.string().min(1, '사용자명은 최소 1자리 이상이어야 합니다'),
    password: z.string().min(6, '비밀번호는 최소 6자리 이상이어야 합니다'),
    email: z.email('올바른 이메일 형식이 아닙니다'),
    role: z.enum(['DENTAL', 'LAB']), // role이 이 두 값 중 하나여야 함
});

export async function register(prevState: any, formData: FormData) {
    try {
        // 1. 입력 데이터 검증
        const formDataObj = Object.fromEntries(formData);
        const validatedData = RegisterSchema.parse(formDataObj);

        // 2. API 요청
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData),
        })

        // 3. 응답 처리
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || '회원가입 중 오류가 발생했습니다');
        }

        return { success: true, data };
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Zod 유효성 검증 에러
            return {
                success: false,
                error: error.issues.map(err => err.message).join('\n'),
            };
        }

        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: false,
            error: '알 수 없는 오류가 발생했습니다',
        };
    }
}


const LoginSchema = z.object({
    username: z.string().min(1, '사용자명을 입력해주세요'),
    password: z.string().min(1, '비밀번호을 입력해주세요'),
});

export async function login(prevState: any, formData: FormData) {
    try {
        const formDataObj = Object.fromEntries(formData);
        const validatedData = LoginSchema.parse(formDataObj);

        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData),
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || '로그인 중 오류가 발생했습니다');
        }

        return { success: true, data };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: error.issues.map(err => err.message).join('\n'),
            };
        }

        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: false,
            error: '알 수 없는 오류가 발생했습니다',
        };
    }
}