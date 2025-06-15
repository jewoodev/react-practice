import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    return handleRequest(request, params.path, 'GET')
}

export async function POST(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    return handleRequest(request, params.path, 'POST')
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    return handleRequest(request, params.path, 'PUT')
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    return handleRequest(request, params.path, 'DELETE')
}

async function handleRequest(
    request: NextRequest,
    path: string[],
    method: string
) {
    try {
        // 쿠키에서 토큰 가져오기
        const cookieStore = await cookies()
        const token = cookieStore.get('authToken')?.value

        // 요청 헤더 준비
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        // 백엔드로 요청 전달
        const backendUrl = `${BACKEND_URL}/${path.join('/')}`
        const body = method !== 'GET' ? await request.text() : undefined

        const response = await fetch(backendUrl, {
            method,
            headers,
            body,
        })

        const data = await response.json()

        return new NextResponse(data, {
            status: response.status,
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'application/json',
            },
        })
    } catch {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}