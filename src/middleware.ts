import { betterFetch } from "@better-fetch/fetch"
import { NextRequest, NextResponse } from "next/server"
import type { Session } from "@/lib/auth-types"

export async function middleware(request: NextRequest) {
    try {
        // Try to get the session
        const { data: session } = await betterFetch<Session>(
            "/api/auth/get-session",
            {
                baseURL: request.nextUrl.origin,
                headers: {
                    cookie: request.headers.get("cookie") || "",
                },
            },
        )

        // Protect dashboard and settings routes
        if (request.nextUrl.pathname.startsWith('/dashboard') ||
            request.nextUrl.pathname.startsWith('/settings')) {
            if (!session) {
                return NextResponse.redirect(new URL('/login', request.url))
            }
        }

        // Redirect authenticated users away from auth pages
        if (session && (
            request.nextUrl.pathname.startsWith('/login') ||
            request.nextUrl.pathname.startsWith('/signup')
        )) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }

        return NextResponse.next()
    } catch (error) {
        // If session check fails, redirect to login
        if (request.nextUrl.pathname.startsWith('/dashboard') ||
            request.nextUrl.pathname.startsWith('/settings')) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/settings/:path*',
        '/login',
        '/signup',
    ]
} 