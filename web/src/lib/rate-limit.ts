import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple in-memory rate limiter for API routes.
 * For production, replace with Redis-backed or Cloudflare WAF rate limiting.
 */

interface RateLimitEntry {
    count: number;
    resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 60 seconds
const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
    const now = Date.now();
    if (now - lastCleanup < CLEANUP_INTERVAL) return;
    lastCleanup = now;
    for (const [key, entry] of store) {
        if (now > entry.resetAt) {
            store.delete(key);
        }
    }
}

export interface RateLimitConfig {
    /** Maximum requests allowed in the window */
    limit: number;
    /** Window size in seconds */
    windowSeconds: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
    limit: 60,
    windowSeconds: 60,
};

/**
 * Returns a NextResponse with 429 status if rate limit is exceeded,
 * or null if the request is allowed.
 */
export function rateLimit(
    request: NextRequest,
    config: RateLimitConfig = DEFAULT_CONFIG
): NextResponse | null {
    cleanup();

    const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        'unknown';

    const key = `${ip}:${request.nextUrl.pathname}`;
    const now = Date.now();
    const windowMs = config.windowSeconds * 1000;

    let entry = store.get(key);

    if (!entry || now > entry.resetAt) {
        entry = { count: 1, resetAt: now + windowMs };
        store.set(key, entry);
        return null;
    }

    entry.count++;

    if (entry.count > config.limit) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
        return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            {
                status: 429,
                headers: {
                    'Retry-After': String(retryAfter),
                    'X-RateLimit-Limit': String(config.limit),
                    'X-RateLimit-Remaining': '0',
                    'X-RateLimit-Reset': String(Math.ceil(entry.resetAt / 1000)),
                },
            }
        );
    }

    return null;
}

/**
 * Wraps an API route handler with rate limiting.
 * Usage:
 *   export const GET = withRateLimit(async (request) => { ... });
 */
export function withRateLimit(
    handler: (request: NextRequest) => Promise<NextResponse> | NextResponse,
    config?: RateLimitConfig
) {
    return async (request: NextRequest) => {
        const rateLimitResponse = rateLimit(request, config);
        if (rateLimitResponse) return rateLimitResponse;
        return handler(request);
    };
}
