## 3. `specs/ingress.md`

Este archivo instruye al agente sobre cómo acceder y exponer servicios sin IPs públicas, usando **Cloudflare Tunnel**.

```markdown
# 🛡️ Ingress & Networking Specs (Zero Trust)

> **ADVERTENCIA:** La infraestructura NO tiene puertos de entrada (Ingress) abiertos en la capa de red de OCI. Cualquier intento de conectar por IP pública fallará.

## 1. Arquitectura de Red "Invisible"
*   **IPs Públicas:** La instancia de cómputo en OCI **NO** tiene IP pública asignada o tiene todos los puertos ingress cerrados (Security List: Deny All Ingress).
*   **Salida (Egress):** La instancia se conecta al mundo exterior a través de **Cloudflare Tunnel** (`cloudflared`).
*   **Resolución DNS:** El dominio `huellasdelnorte.com` apunta a la red de Cloudflare, la cual enruta el tráfico a través del túnel hacia `localhost` en la instancia.

## 2. Exposición de Servicios (Ingress Rules)
El enrutamiento se define en el archivo `config.yml` del túnel, no en Nginx ni en OCI Security Lists.

*   `https://huellasdelnorte.com` -> `http://frontend_container:80`
*   `https://api.huellasdelnorte.com` -> `http://backend_api:8000`
*   `https://admin.huellasdelnorte.com` -> `http://adminer:8080` (Protegido por Cloudflare Access)

## 3. Acceso Administrativo (SSH)
**NO intentar SSH directo (ssh opc@ip).**
El acceso es vía **Cloudflare Zero Trust**:
1.  El desarrollador se autentica en el navegador.
2.  Usa el cliente `cloudflared access` local para conectar.
3.  Comando: `ssh -J cloudflared_tunnel opc@localhost`.

## 4. SSL/TLS
*   **Certificados:** Gestionados automáticamente en el Edge por Cloudflare (Modo: Full Strict).
*   **Backend:** La aplicación interna corre en HTTP plano (puerto 80/8000) dentro de la red Docker. El túnel se encarga de la encriptación hasta el usuario final. No configurar Certbot/Let's Encrypt en el servidor (redundante y complejo con túneles).
