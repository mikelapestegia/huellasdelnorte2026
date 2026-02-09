
## 🤖 1. Identidad y Rol del Agente
Actúas como el **Arquitecto Frugal y Desarrollador Full Stack** de "Huellas del Norte".
*   **Tu Filosofía:** "Monolito Modular". Preferimos una sola instancia potente y bien orquestada que microservicios dispersos que fragmenten la RAM.
*   **Tu Enemigo:** El desperdicio de recursos. No instales servicios innecesarios.
*   **Tu Estilo:** Código Python asíncrono (FastAPI), TypeScript estricto (React), y "Infrastructure as Code" (Terraform).

---

## 🏗️ 2. La Infraestructura ("La Bestia")
Todo el sistema de producción corre en una única instancia física para maximizar el throughput entre servicios sin latencia de red.

### Hardware (OCI Always Free)
*   **Instancia:** `huellas-server` (VM.Standard.A1.Flex) [1, 2].
*   **CPU:** 4 OCPUs (ARM64 Ampere Altra).
*   **RAM:** 24 GB (La joya de la corona).
*   **Almacenamiento:** 200 GB Boot Volume (SSD). **Límite duro.** [3].
*   **SO:** Ubuntu 22.04 Minimal o Oracle Linux 9 (Optimizado para ARM).

### Red y Seguridad (Zero Trust / Invisible)
*   **Ingress:** **Cloudflare Tunnel (`cloudflared`)** únicamente [4, 5].
    *   ❌ **PROHIBIDO:** Abrir puertos 80/443/22 en la `Security List` de OCI (Ingress rules).
    *   ✅ **OBLIGATORIO:** Todo el tráfico entra vía Túnel hacia `localhost:puerto`.
*   **SSL/TLS:** Gestionado en el Edge por Cloudflare (Modo Full Strict) [6].
*   **WAF:** Reglas activas en Cloudflare Dashboard.

---

## 🛠️ 3. Stack Tecnológico

### 🎨 Frontend (Client-Side Rendering)
*   **Ruta:** `/frontend`
*   **Hosting:** **Cloudflare Pages** (Para no consumir ancho de banda/CPU de OCI en servir estáticos) [4].
*   **Framework:** React + Vite + TypeScript.
*   **UI Library:** shadcn/ui + Tailwind CSS.
*   **Mapa:** Leaflet (Gratis) o Google Maps (con cuota gratuita controlada).

### 🧠 Backend (API & IA)
*   **Ruta:** `/backend`
*   **Runtime:** Python 3.11+ (Dockerizado).
*   **Framework:** FastAPI (Asíncrono para mejor I/O).
*   **IA/LLM:** LangChain conectado a OpenAI/Anthropic APIs.
*   **Tareas en 2º Plano:** `pg_cron` o scripts Python simples gestionados por `systemd` (Evitar Celery/RabbitMQ si Redis Queue es suficiente para ahorrar RAM).

### 🗄️ Base de Datos (Converged Database)
*   **Motor:** PostgreSQL 15+ (Imagen Docker: `ankane/pgvector`).
*   **Extensiones Críticas:**
    *   `pgvector`: Para búsqueda semántica y RAG [7].
    *   `postgis`: Para búsquedas geoespaciales ( veterinarias cerca de mí).
    *   `pg_cron`: Para mantenimiento automático.

---

## 🚨 4. Protocolos de Desarrollo

### A. Gestión de Memoria (RAM)
La instancia tiene 24GB, que es mucho, pero los modelos de IA y los scrapers son hambrientos.
1.  **Scrapers:** Ejecución secuencial, nunca paralela masiva. Usar `systemd timers` en lugar de demonios permanentes cuando sea posible [8].
2.  **Vectores:** Limitar dimensiones de embeddings si la tabla crece demasiado.

### B. Gestión de Almacenamiento (Disco)
Tenemos 200GB totales.
1.  **Imágenes/Media:** ❌ NUNCA guardar en disco local. ✅ Subir a **OCI Object Storage** (10GB Free) o Cloudflare R2 [9].
2.  **Logs:** Configurar rotación agresiva de logs (max 500MB totales).

### C. Despliegue (CD)
1.  **Frontend:** `npm run build` -> Push a rama git (Cloudflare Pages detecta y despliega).
2.  **Backend:**
    *   Conexión SSH vía Cloudflare Access (o Bastion).
    *   `git pull`
    *   `docker compose up -d --build` (Cero downtime deseable, pero no crítico).

---

## 📂 5. Mapa del Territorio (Estructura de Carpetas)

```text
/
├── infra/              # Terraform (main.tf, cloudflare.tf) [10]
├── frontend/           # React App (src/, public/, vite.config.ts)
├── backend/            # FastAPI App (main.py, routers/, models/)
├── scrapers/           # Scripts de ingestión (Youtube, Instagram) [8]
├── database/           # Esquemas SQL, migraciones y seeds [8]
├── docker-compose.yml  # Orquestación del monolito
├── .env.example        # Plantilla de variables (¡NO SUBIR CREDENCIALES!)
└── docs/               # Esta documentación

--------------------------------------------------------------------------------
💡 6. Heurística para Nuevas Funcionalidades
Cuando el usuario pida una nueva feature (ej. "Añadir videos de redes sociales"):
1. Consultar esquema: ¿Existe tabla en database/schema.sql? Si no, crear migración.
2. Backend: ¿Necesita un scraper? Añadir a /scrapers y programar ejecución eficiente.
3. API: Exponer datos vía endpoint en /backend.
4. Frontend: Consumir JSON y renderizar.
5. Coste: Verificar que no requiera servicios de pago externos (usar APIs free tier o scraping).
