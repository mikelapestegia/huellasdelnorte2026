# 🔒 SECURITY AUDIT REPORT — HuellasdelNorte V2

**Date**: 2026-02-08  
**Auditor**: Automated Code Review  
**Scope**: Full codebase (`web/`, `terraform/`, `scripts/`, `database/`, `docs/`)  
**Severity Scale**: 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low · ℹ️ Info

---

## Executive Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | 2 |
| 🟠 High | 4 |
| 🟡 Medium | 5 |
| 🟢 Low | 3 |
| ℹ️ Info | 2 |

The application has **solid infrastructure-level security** (Terraform hardening, SSH hardening, Cloudflare tunnel, mTLS for DB) but suffers from **critical application-layer gaps**, primarily around authentication being entirely mocked and the complete absence of security headers and rate limiting.

---

## 🔴 CRITICAL Findings

### C-1: Authentication is Fully Mocked — No Real Auth

**File**: [`AuthContext.tsx`](web/src/context/AuthContext.tsx:37)  
**Description**: The `login()` and `signUp()` functions accept **any email/password** combination and create a fake user. There is no server-side validation, no password hashing, no JWT/session token, and no backend authentication endpoint.

```typescript
// Line 42-43: Only checks password length >= 6, accepts ANY credentials
if (password.length < 6) {
    reject(new Error("La contraseña es demasiado corta"));
}
```

**Impact**: Anyone can "log in" as any user. There is zero authentication enforcement.

**Recommendation**:
- Implement a real authentication backend (NextAuth.js, Supabase Auth, or custom JWT)
- Hash passwords with bcrypt/argon2 server-side
- Use HTTP-only secure cookies for session management
- Add CSRF protection

---

### C-2: Session Stored in localStorage as Plain JSON

**File**: [`AuthContext.tsx`](web/src/context/AuthContext.tsx:55)  
**Description**: User session data (including role) is stored in `localStorage` as plain JSON. Any XSS vulnerability would allow full session hijack. The `role` field can be trivially modified to `'admin'` via browser DevTools.

```typescript
localStorage.setItem('user_session', JSON.stringify(mockUser));
```

**Impact**: Privilege escalation, session hijacking via XSS.

**Recommendation**:
- Use HTTP-only, Secure, SameSite cookies for session tokens
- Never store role/permissions client-side as source of truth
- Validate roles server-side on every request

---

## 🟠 HIGH Findings

### H-1: No Security Headers Configured

**Files**: [`next.config.mjs`](web/next.config.mjs:6), [`middleware.ts`](web/src/middleware.ts:1)  
**Description**: The application has **zero security headers**. No `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, `Referrer-Policy`, or `Permissions-Policy` are set anywhere.

**Impact**: Vulnerable to clickjacking, MIME-type sniffing, XSS, and missing HSTS.

**Recommendation**: Add security headers in `next.config.mjs`:

```javascript
const nextConfig = {
    headers: async () => [{
        source: '/(.*)',
        headers: [
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
            { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
            { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.unsplash.com https://ui-avatars.com https://res.cloudinary.com https://lh3.googleusercontent.com;" },
        ],
    }],
};
```

---

### H-2: API Routes Have No Authentication or Rate Limiting

**Files**: All routes under [`web/src/app/api/`](web/src/app/api/)  
**Description**: All 12+ API routes are **completely open** — no authentication check, no rate limiting, no input validation. Any anonymous user or bot can scrape all data.

**Examples**:
- [`/api/health/triage`](web/src/app/api/health/triage/route.ts:4) — exposes triage sessions
- [`/api/health/telemed`](web/src/app/api/health/telemed/route.ts:4) — exposes telemedicine sessions
- [`/api/assistance/centers`](web/src/app/api/assistance/centers/route.ts:4) — exposes all centers

**Impact**: Data scraping, abuse, potential DoS.

**Recommendation**:
- Add authentication middleware for sensitive endpoints
- Implement rate limiting (e.g., `next-rate-limit` or Cloudflare WAF rules)
- Add input validation for any future POST/PUT endpoints

---

### H-3: Hardcoded Grafana Default Password in Bootstrap Script

**File**: [`bootstrap_node.sh`](scripts/bootstrap_node.sh:215)  
**Description**: The Grafana admin password is hardcoded as `huellas_admin_change_me` in the bootstrap script that gets committed to the repository.

```yaml
- GF_SECURITY_ADMIN_PASSWORD=huellas_admin_change_me
```

**Impact**: If the password is not changed post-deployment, anyone with access to port 3000 can access Grafana with admin privileges.

**Recommendation**:
- Replace with an environment variable: `${GRAFANA_ADMIN_PASSWORD}`
- Source the password from a secrets manager or `.env` file
- Add a post-bootstrap step that forces password change

---

### H-4: Wildcard DNS CNAME Record

**File**: [`cloudflare_tunnel.tf`](terraform/cloudflare_tunnel.tf:46)  
**Description**: A wildcard CNAME record (`*`) routes **all subdomains** through the Cloudflare tunnel. This means any subdomain (e.g., `admin.huellasdelnorte.com`, `internal.huellasdelnorte.com`) will resolve and be proxied.

**Impact**: Subdomain takeover risk, unintended service exposure.

**Recommendation**:
- Use explicit subdomain records instead of wildcard
- If wildcard is needed, add Cloudflare Access policies for sensitive subdomains

---

## 🟡 MEDIUM Findings

### M-1: Example Password in Documentation

**File**: [`MANUAL-MIGRACION-V1-A-V2.md`](docs/MANUAL-MIGRACION-V1-A-V2.md:235)  
**Description**: The migration guide contains `db_admin_password = "MySecurePass123!"` as an example. While clearly a placeholder, users may copy-paste it directly.

**Recommendation**: Use an obviously fake value like `"CHANGE-ME-s3cur3P@ss!"` and add a bold warning.

---

### M-2: No CSRF Protection

**Description**: The application has no CSRF tokens or SameSite cookie enforcement. When real authentication is implemented, form submissions will be vulnerable to cross-site request forgery.

**Recommendation**: Implement CSRF tokens for all state-changing operations, or use SameSite=Strict cookies.

---

### M-3: `next.config.mjs` Uses Deprecated `domains` for Images

**File**: [`next.config.mjs`](web/next.config.mjs:8)  
**Description**: The `images.domains` configuration is deprecated in Next.js 16. It should use `images.remotePatterns` instead. More importantly, `images.unsplash.com` and `ui-avatars.com` are allowed, which could be used for SSRF if image optimization is abused.

**Recommendation**:
```javascript
images: {
    remotePatterns: [
        { protocol: 'https', hostname: 'images.unsplash.com' },
        { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
},
```

---

### M-4: Database Schema Missing Row-Level Security (RLS)

**File**: [`schema.sql`](database/schema.sql:9)  
**Description**: The database schema has no Row-Level Security policies. Any authenticated database user can read/write all rows in all tables. The `users` table has no password hash column, suggesting auth hasn't been designed yet.

**Recommendation**:
- Add RLS policies when implementing real auth
- Add a `password_hash` column to the `users` table
- Ensure application connects with a least-privilege database role

---

### M-5: Grafana Port Exposed on Firewall

**File**: [`bootstrap_node.sh`](scripts/bootstrap_node.sh:238)  
**Description**: Port 3000 (Grafana) is opened on the instance firewall. The comment says "Optional - better use Tunnel" but the port is opened anyway.

**Recommendation**: Remove the firewall rule and access Grafana exclusively through the Cloudflare tunnel with Access policies.

---

## 🟢 LOW Findings

### L-1: No `robots.txt` or API Route Protection from Crawlers

**Description**: No `robots.txt` exists to prevent search engines from indexing API routes.

**Recommendation**: Add `web/public/robots.txt`:
```
User-agent: *
Disallow: /api/
```

---

### L-2: Registration Page Mentions reCAPTCHA but Doesn't Implement It

**File**: [`registro/page.tsx`](web/src/app/[locale]/registro/page.tsx:77)  
**Description**: The UI text says "Protegido por reCAPTCHA" but no reCAPTCHA integration exists.

**Recommendation**: Either implement reCAPTCHA/Turnstile or remove the misleading text.

---

### L-3: `console.error(err)` in Registration Handler

**File**: [`registro/page.tsx`](web/src/app/[locale]/registro/page.tsx:38)  
**Description**: Errors are logged to `console.error` which could leak information in production.

**Recommendation**: Use a proper error handling strategy; avoid logging raw errors in production.

---

## ℹ️ INFORMATIONAL

### I-1: Secrets Management is Well-Designed

The `.gitignore` files at root and `terraform/` level properly exclude:
- `*.tfvars`, `*.tfstate`, `.terraform/`
- `*.pem`, `*.key`, `*.p12`, `wallet.zip`
- `.env`, `.env.*`

The `SECRETS.md` provides excellent guidance on credential management.

### I-2: Infrastructure Security is Strong

- ✅ SSH hardened (root login disabled, password auth disabled)
- ✅ Cloudflare Tunnel (no public IP exposed)
- ✅ mTLS enabled for database by default
- ✅ `prevent_destroy` on database
- ✅ Automatic security updates enabled
- ✅ Dedicated service user for cloudflared
- ✅ Firewall enabled with minimal ports
- ✅ `sensitive = true` on Terraform password variables

---

## Priority Remediation Roadmap

| Priority | Finding | Effort | Impact |
|----------|---------|--------|--------|
| 1 | C-1: Implement real authentication | High | Critical |
| 2 | C-2: Replace localStorage sessions with secure cookies | Medium | Critical |
| 3 | H-1: Add security headers | Low | High |
| 4 | H-2: Add rate limiting to API routes | Medium | High |
| 5 | H-3: Remove hardcoded Grafana password | Low | High |
| 6 | H-4: Replace wildcard DNS with explicit records | Low | High |
| 7 | M-2: Add CSRF protection | Medium | Medium |
| 8 | M-4: Design RLS policies | Medium | Medium |
| 9 | M-5: Close Grafana port on firewall | Low | Medium |
| 10 | L-1/L-2/L-3: Minor fixes | Low | Low |

---

**Next Review**: Recommended after implementing real authentication (items 1-2).
