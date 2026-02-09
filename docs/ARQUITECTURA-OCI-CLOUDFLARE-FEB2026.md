# Arquitectura de Infraestructura OCI + Cloudflare (Febrero 2026) - Modelo de Instancia Única

Este documento detalla la configuración técnica y la lógica detrás de la arquitectura simplificada para **huellasdelnortev2**, optimizada para el nivel Always Free de Oracle Cloud Infrastructure (OCI) y Cloudflare Zero Trust.

## 1. Configuración en el Lado de OCI (Infraestructura de Cómputo)

### A. Instancia de Cómputo (Single Node)
- **Recurso**: 1x Instancia ARM Ampere (4 OCPU / 24 GB RAM).
- **Disco**: 200 GB de Volumen de Arranque (Máximo permitido en Always Free).
- **Por qué**: Centralizar todo en un solo nodo maximiza el uso de disco y simplifica la gestión de red interna (localhost).

### B. Seguridad de Red (Security Lists / NSG)
- **Configuración Ingress**: BLOQUEAR todos los puertos de entrada (incluyendo 80 y 443).
- **Configuración Egress**: PERMITIR tráfico de salida (especialmente hacia los endpoints de Cloudflare).
- **Por qué**: Al usar Cloudflare Tunnel, la instancia no necesita estar expuesta directamente a Internet. Esto elimina el 100% de los ataques de escaneo de puertos.

### C. Agente cloudflared
- **Instalación**: Mediante el script `scripts/install_cloudflared.sh`.
- **Modo**: Servicio de Systemd.
- **Por qué**: El agente establece una conexión segura saliente (Outbound) hacia Cloudflare, actuando como un puente sin necesidad de IPs públicas estáticas.

## 2. Configuración en el Lado de Cloudflare (Zero Trust & DNS)

### A. Cloudflare Tunnel (Argo Tunnel)
- **Configuración**: Definida en `terraform/cloudflare_tunnel.tf`.
- **Rutas de Ingress**:
  - `api.huellasdelnorte.com` -> `http://localhost:30080` (Backend API)
  - `app.huellasdelnorte.com` -> `http://localhost:30081` (Frontend App)
- **Por qué**: Terraform garantiza que la configuración sea reproducible. El mapeo de puertos permite que Cloudflare sepa exactamente a qué puerto del contenedor enviar el tráfico una vez que llega a la instancia.

### B. DNS y Proxy
- **Registros**: CNAMEs apuntando a `<TUNNEL_ID>.cfargotunnel.com`.
- **Modo**: Proxied (Nube naranja).
- **Por qué**: Permite que Cloudflare aplique WAF (Web Application Firewall), protección contra DDoS y gestión de certificados SSL de forma automática.

## 3. Matriz de Conectividad y Flujo de Datos

1. **Usuario** solicita `api.huellasdelnorte.com`.
2. **Cloudflare DNS** resuelve hacia la red de Cloudflare Edge.
3. **Cloudflare WAF** inspecciona y filtra la petición.
4. El tráfico se envía a través del **Túnel Seguro** activo.
5. El agente **cloudflared** en OCI recibe la petición y la reenvía internamente a `localhost:30080`.
6. El servicio (K3s/Docker) responde de vuelta por el mismo canal.

---

**Última actualización**: 8 de febrero de 2026
**Estado**: Plan Técnico Validado v2.1
**Configuración**: Totalmente gestionada por Terraform para evitar deriva de configuración (Config Drift).
