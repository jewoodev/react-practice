import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'
import {TokenManager} from "@/app/lib/token-manager"

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/dashboard/customers', '/dashboard/invoices']
const publicRoutes = ['/auth/login', '/auth/register', '/']

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // 3. Decrypt the session from the cookie
    const cookie = (await cookies()).get(TokenManager.ACCESS_KEY)?.value
    const payload = await decrypt(cookie)

    // 4. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !payload?.userId) {
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
    }

    // 5. Redirect to /dashboard if the user is authenticated
    if (
        isPublicRoute &&
        payload?.userId
    ) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|actions|_next/static|_next/image|.*\\.png$).*)'],
}