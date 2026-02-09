# Workflow DevOps para Desarrollador Solo — HuellasdelNorte V2

> **Objetivo**: Que todo el flujo sea `git push` → el resto ocurre automáticamente.
> 
> **Stack**: Next.js (frontend) · Cloudflare Pages + Workers · OCI ARM (backend) · GitHub Actions · Terraform

---

## Arquitectura General

```
┌──────────────────────────────────────────────────────────────────────┐
│  TU PC (Windows)                                                     │
│  ┌────────────┐                                                      │
│  │  VS Code   │──── git push ────►  GitHub (main branch)             │
│  └────────────┘                         │                            │
│                                         ├────────────────────────┐   │
│                                         ▼                        ▼   │
│                              ┌──────────────────┐   ┌────────────────┐
│                              │ GitHub Actions    │   │ GitHub Actions │
│                              │ (Frontend CI/CD)  │   │ (Backend CI/CD)│
│                              └────────┬─────────┘   └───────┬────────┘
│                                       ▼                     ▼         │
│                              ┌──────────────────┐   ┌────────────────┐
│                              │ Cloudflare Pages  │   │   OCI ARM      │
│                              │ huellasdelnorte   │   │ Docker/Podman  │
│                              │ .com              │   │ api.huellas... │
│                              └──────────────────┘   └────────────────┘
│                                       │                     │         │
│                                       ▼                     ▼         │
│                              ┌──────────────────────────────────────┐ │
│                              │      Cloudflare CDN + WAF + SSL     │ │
│                              │      (Proxy, DDoS, Caché, certs)    │ │
│                              └──────────────────────────────────────┘ │
│                                              │                        │
│                                              ▼                        │
│                                        ┌──────────┐                   │
│                                        │ Usuarios │                   │
│                                        └──────────┘                   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 1. Frontend: GitHub → Cloudflare Pages (Automático)

### ¿Por qué Cloudflare Pages y NO el tunnel para el frontend?

| Aspecto | Cloudflare Pages | Tunnel a OCI |
|---------|-----------------|--------------|
| **Disponibilidad** | 99.99% (CDN global) | Depende de 1 instancia en Frankfurt |
| **Velocidad** | Edge caching en 300+ PoPs | Un solo origen geográfico |
| **Coste** | Gratis (100K req/día) | Consume CPU/RAM de tu instancia |
| **SSL** | Automático | Automático (via tunnel) |
| **SEO** | ⚡ TTFB < 50ms globalmente | TTFB variable 100-500ms |
| **Mantenimiento** | Zero-ops | Mantener Node.js, PM2, etc. |

### Configuración paso a paso

#### 1.1. Conectar el repo a Cloudflare Pages

1. Ir a [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create**
2. Seleccionar **Connect to Git** → autorizar GitHub → seleccionar `huellasdelnortev2`
3. Configurar:
   - **Production branch**: `main`
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`  
   - **Root directory**: `web`
4. Añadir variables de entorno:
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY = tu_clave
   NEXT_PUBLIC_API_URL = https://api.huellasdelnorte.com
   NODE_VERSION = 20
   ```

#### 1.2. Configurar dominio personalizado

En Cloudflare Pages → **Custom domains**:
- `huellasdelnorte.com` (raíz)
- `www.huellasdelnorte.com`

> [!IMPORTANT]
> Si ya tienes CNAME records del tunnel apuntando a `huellasdelnorte.com` y `www`, 
> deberás **eliminarlos** del `cloudflare_tunnel.tf` y reemplazarlos con los que 
> Cloudflare Pages crea automáticamente. El tunnel solo debe enrutar `api.huellasdelnorte.com`.

#### 1.3. Resultado

Cada `git push` a `main`:
1. Cloudflare Pages detecta el push automáticamente
2. Ejecuta `npm run build` en el directorio `web/`
3. Despliega a su CDN global
4. SSL automático, HTTP/3, compresión Brotli, caché inteligente
5. **Preview deploys** automáticos en cada pull request (rama distinta de `main`)

---

## 2. Backend: GitHub → OCI (Automático vía GitHub Actions + Docker)

### Estrategia de despliegue

El backend (API routes, bots, scrapers, AI) se ejecuta en tu instancia ARM de OCI como contenedores Docker. GitHub Actions construye la imagen y la despliega automáticamente.

#### 2.1. Dockerfile para el backend

Crear `backend/Dockerfile` (cuando tengas servicios backend separados):

```dockerfile
# Ejemplo para una API Node.js
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# No ejecutar como root (seguridad)
RUN addgroup --system app && adduser --system --ingroup app app
USER app

EXPOSE 8080
CMD ["node", "dist/server.js"]
```

#### 2.2. GitHub Actions para CI/CD del backend

Crear `.github/workflows/deploy-backend.yml`:

```yaml
name: Deploy Backend to OCI

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'    # Solo se ejecuta si cambia algo en backend/
      - 'scripts/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Docker image
        run: |
          docker build -t huellas-backend:${{ github.sha }} ./backend

      - name: Save Docker image
        run: |
          docker save huellas-backend:${{ github.sha }} | gzip > image.tar.gz

      - name: Deploy to OCI via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.OCI_HOST }}          # IP privada o hostname via tunnel
          username: opc
          key: ${{ secrets.OCI_SSH_PRIVATE_KEY }}
          proxy_host: ${{ secrets.BASTION_HOST }} # Si usas Bastion
          proxy_username: opc
          proxy_key: ${{ secrets.OCI_SSH_PRIVATE_KEY }}
          script: |
            cd /opt/huellas
            docker load < image.tar.gz
            docker compose up -d --force-recreate
            docker image prune -f
```

> [!NOTE]
> Alternativa más segura sin exponer SSH: usar **Cloudflare Tunnel** para acceso SSH 
> o **OCI DevOps Pipelines** (gratuito) con la instancia registrada como agente.

#### 2.3. docker-compose.yml para OCI

Crear `backend/docker-compose.yml` (en la instancia OCI):

```yaml
services:
  api:
    image: huellas-backend:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:30080:8080"   # Solo localhost, accesible via tunnel
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 8G

  # Bots y scrapers con auto-actualización
  ingest-bot:
    image: huellas-ingest:latest
    restart: unless-stopped
    environment:
      - DATABASE_URL=${DATABASE_URL}
    # Ejecutar cada 6 horas via cron interno o systemd timer

  # Watchtower: auto-actualiza contenedores cuando hay nueva imagen
  watchtower:
    image: containrrr/watchtower
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - WATCHTOWER_CLEANUP=true
      - WATCHTOWER_POLL_INTERVAL=300   # Comprueba cada 5 min
      - WATCHTOWER_NOTIFICATIONS=email  # Opcional
```

---

## 3. Automatización de Bots y Scrapers en OCI

### 3.1. Estrategia con Systemd Timers (más fiable que cron)

```bash
# /etc/systemd/system/huellas-ingest.service
[Unit]
Description=HuellasdelNorte Data Ingestion
After=docker.service

[Service]
Type=oneshot
ExecStart=/usr/bin/docker compose -f /opt/huellas/docker-compose.yml run --rm ingest-bot
User=opc
```

```bash
# /etc/systemd/system/huellas-ingest.timer
[Unit]
Description=Run ingestion every 6 hours

[Timer]
OnCalendar=*-*-* 00,06,12,18:00:00
Persistent=true

[Install]
WantedBy=timers.target
```

### 3.2. Auto-actualización del propio servidor

Añadir al `bootstrap_node.sh` o como timer separado:

```bash
# Auto-update del sistema (seguridad)
dnf -y update --security   # Solo parches de seguridad

# Auto-update de cloudflared
cloudflared update
```

---

## 4. Flujo de Trabajo Diario (Tu Día a Día)

```
┌────────────────────────────────────────────────────┐
│                TU FLUJO DE TRABAJO                  │
│                                                     │
│  1. Abrir VS Code                                   │
│  2. Programar cambios                               │
│  3. git add . && git commit -m "mensaje"            │
│  4. git push                                        │
│                                                     │
│  ✅ ¡LISTO! Todo lo demás es automático:            │
│     → Frontend se despliega en Cloudflare Pages     │
│     → Backend se construye y despliega en OCI       │
│     → Bots se actualizan solos                      │
│     → SSL, caché, CDN... todo automático            │
└────────────────────────────────────────────────────┘
```

### Comandos Git esenciales

```bash
# Tu flujo habitual
git add .
git commit -m "feat: añadir página de adopciones"
git push

# Ver estado
git status
git log --oneline -5

# Crear rama para experimentar (crea preview deploy automático)
git checkout -b feature/nueva-funcionalidad
# ... hacer cambios ...
git push -u origin feature/nueva-funcionalidad
# En Cloudflare Pages verás un preview URL automático

# Cuando esté listo, mergear a main
git checkout main
git merge feature/nueva-funcionalidad
git push
```

---

## 5. Seguridad — Mejores Prácticas

### 5.1. Secretos (NUNCA en el código)

| Secreto | Dónde guardarlo |
|---------|-----------------|
| API keys (OpenWeather, Anthropic) | Cloudflare Pages env vars + GitHub Secrets |
| Credenciales OCI | GitHub Secrets (para CI/CD) |
| Credenciales DB | GitHub Secrets → inyectar en Docker env |
| SSH keys | GitHub Secrets |
| Terraform secrets | `terraform.tfvars` (en `.gitignore`, NUNCA en git) |

### 5.2. Headers de seguridad (en Cloudflare)

Crear `web/public/_headers` para Cloudflare Pages:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(self)
  X-XSS-Protection: 1; mode=block
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:; connect-src 'self' https://api.huellasdelnorte.com https://api.openweathermap.org
```

### 5.3. Checklist de seguridad

- [x] Todos los puertos de ingress bloqueados en OCI (ya configurado)
- [x] Tráfico solo via Cloudflare Tunnel (ya configurado)
- [ ] `SECRETS.md` **debe** estar en `.gitignore` (verificar)
- [ ] Activar **Cloudflare WAF** managed rules (plan gratuito incluye básico)
- [ ] Activar **Bot Fight Mode** en Cloudflare
- [ ] Configurar **rate limiting** en la API
- [ ] Habilitar **2FA** en GitHub y Cloudflare
- [ ] Rotar API keys cada 90 días

---

## 6. SEO — Mejores Prácticas Automatizadas

### 6.1. Lo que ya tienes bien ✅

- `robots.ts` — generación dinámica de robots.txt
- `sitemap.ts` — sitemap XML dinámico
- `next-intl` — URLs i18n con subfolder (`/es`, `/eu`, `/en`...)
- Next.js Image optimization
- Metadata en layout/page

### 6.2. Mejoras con Cloudflare Pages

| Mejora | Cómo |
|--------|------|
| **Speed** | CDN global, Brotli, HTTP/3 automáticos |
| **Caché** | Pages cachea estáticos automáticamente |
| **Redirects** | Crear `web/public/_redirects` para 301s |
| **i18n SEO** | Configurar `hreflang` en el `<head>` (ya lo hace next-intl) |
| **Core Web Vitals** | Edge rendering = mejor LCP, FID, CLS |

### 6.3. Archivo _redirects para SEO

Crear `web/public/_redirects`:

```
# Forzar www → sin www (o viceversa, elegir uno)
https://www.huellasdelnorte.com/* https://huellasdelnorte.com/:splat 301
```

---

## 7. Monitorización (Zero-Effort)

### 7.1. Gratuito y automático

| Herramienta | Qué monitoriza | Coste |
|-------------|----------------|-------|
| **Cloudflare Analytics** | Tráfico web, errores, velocidad | Gratis |
| **Cloudflare Pages** | Build logs, deploy status | Gratis |
| **GitHub Actions** | CI/CD logs, fallos de build | Gratis (2000 min/mes) |
| **OCI Monitoring** | CPU, RAM, disco de la instancia | Gratis |
| **UptimeRobot** | Ping a tu URL cada 5 min, alerta si cae | Gratis (50 monitores) |

### 7.2. Alertas recomendadas

- **UptimeRobot**: monitor HTTP en `https://huellasdelnorte.com` → te avisa por email/Telegram si cae
- **GitHub**: activar notificaciones de failed workflows
- **Cloudflare**: alertas de ataque DDoS (automáticas)

---

## 8. Modificaciones Necesarias en Terraform

### 8.1. Actualizar `cloudflare_tunnel.tf`

El tunnel solo debe enrutar el **backend** (`api.*`), ya que el frontend estará en Cloudflare Pages:

```diff
# ELIMINAR estas reglas del tunnel (Pages se encarga):
- ingress_rule {
-   hostname = var.domain_name
-   service  = "http://localhost:80"
- }
- ingress_rule {
-   hostname = "www.${var.domain_name}"
-   service  = "http://localhost:80"
- }
- ingress_rule {
-   hostname = "app.${var.domain_name}"
-   service  = "http://localhost:80"
- }

# MANTENER solo:
  ingress_rule {
    hostname = "api.${var.domain_name}"
    service  = "http://localhost:30080"
  }
  ingress_rule {
    service = "http_status:404"
  }
```

### 8.2. Eliminar DNS records redundantes

```diff
# ELIMINAR (Pages crea los suyos):
- resource "cloudflare_record" "root_cname" { ... }
- resource "cloudflare_record" "www_cname" { ... }
- resource "cloudflare_record" "app_cname" { ... }

# MANTENER:
  resource "cloudflare_record" "api_cname" { ... }
```

---

## 9. Resumen de Archivos a Crear/Modificar

| Archivo | Acción | Propósito |
|---------|--------|-----------|
| `.github/workflows/deploy-frontend.yml` | **Crear** (opcional) | CI checks (lint, test) — Pages despliega solo |
| `.github/workflows/deploy-backend.yml` | **Crear** | CI/CD backend a OCI |
| `web/public/_headers` | **Crear** | Headers de seguridad |
| `web/public/_redirects` | **Crear** | Redirects SEO |
| `terraform/cloudflare_tunnel.tf` | **Modificar** | Quitar frontend del tunnel |
| `backend/Dockerfile` | **Crear** | Cuando tengas backend separado |
| `backend/docker-compose.yml` | **Crear** | Orquestación en OCI |

---

## 10. Orden de Implementación Recomendado

1. **Ahora**: Conectar GitHub → Cloudflare Pages (frontend funcional en minutos)
2. **Ahora**: Crear `_headers` y `_redirects` (5 minutos, gran impacto en SEO/seguridad)
3. **Luego**: Actualizar Terraform para quitar frontend del tunnel
4. **Cuando tengas backend**: Crear Dockerfile + GitHub Actions + docker-compose
5. **Continuo**: Los bots y scrapers se auto-actualizan con Watchtower

---

> **Filosofía**: Un solo comando (`git push`) y todo el sistema se actualiza. 
> Sin servidores que mantener para el frontend. El backend en OCI se auto-gestiona.
> Tú te centras solo en **programar**.

**Última actualización**: 9 de febrero de 2026  
**Autor**: Generado para gestión solo-dev de HuellasdelNorte V2
