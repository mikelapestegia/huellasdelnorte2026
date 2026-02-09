import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

// Simple in-memory rate limiter for API routes (middleware-level)
const apiRateMap = new Map<string, { count: number; resetAt: number }>();
const API_RATE_LIMIT = 100; // requests per window
const API_RATE_WINDOW_MS = 60_000; // 1 minute

function apiRateLimit(request: NextRequest): NextResponse | null {
    const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        'unknown';

    const key = `api:${ip}`;
    const now = Date.now();

    let entry = apiRateMap.get(key);
    if (!entry || now > entry.resetAt) {
        entry = { count: 1, resetAt: now + API_RATE_WINDOW_MS };
        apiRateMap.set(key, entry);
        return null;
    }

    entry.count++;
    if (entry.count > API_RATE_LIMIT) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
        return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            {
                status: 429,
                headers: {
                    'Retry-After': String(retryAfter),
                    'X-RateLimit-Limit': String(API_RATE_LIMIT),
                    'X-RateLimit-Remaining': '0',
                },
            }
        );
    }

    return null;
}

// Periodic cleanup of expired entries
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of apiRateMap) {
        if (now > entry.resetAt) apiRateMap.delete(key);
    }
}, 60_000);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Rate limit API routes
    if (pathname.startsWith('/api/')) {
        const rateLimitResponse = apiRateLimit(request);
        if (rateLimitResponse) return rateLimitResponse;

        // Allow API routes to pass through without i18n processing
        return NextResponse.next();
    }

    // Apply i18n middleware for non-API routes
    return intlMiddleware(request);
}

export const config = {
    // Match all routes except static files
    matcher: ['/((?!_next|.*\\..*).*)'],
};
