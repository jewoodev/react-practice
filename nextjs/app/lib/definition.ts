import { z } from 'zod/v4'


export const SignUpFormSchema = z.object({
    username: z
        .string()
        .min(1, '사용자명은 최소 1자리 이상이어야 합니다')
        .trim(),
    password: z
        .string()
        .min(6, '비밀번호는 최소 6자리 이상이어야 합니다')
        .trim(),
    email: z.email('올바른 이메일 형식이 아닙니다'),
    role: z.enum(['DENTAL', 'LAB']), // role이 이 두 값 중 하나여야 함
})

export const SignInFormSchema = z.object({
    username: z.string().min(1, '사용자명을 입력해주세요').trim(),
    password: z.string().min(1, '비밀번호를 입력해주세요').trim(),
})


export type SignUpFormState =
    | {
        errors?: {
            username?: string[]
            password?: string[]
            email?: string[]
            role?: string[]
        }
        message?: string
        data?: {
            token?: string
        }
    }
    | undefined


export type SignInFormState =
    | {
        errors?: {
            username?: string[]
            password?: string[]
        }
        message?: string
        data?: {
            accessToken?: string
        }
    }
    | undefined
