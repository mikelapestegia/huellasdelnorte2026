# Configuración del Túnel de Cloudflare para HuellasdelNorte V2
# Infraestructura HuellasdelNorte V2 - Febrero 2026
#
# ARQUITECTURA:
#   - Frontend (root, www) → Cloudflare Pages (automático, no necesita tunnel)
#   - Backend (api.*)      → Cloudflare Tunnel → OCI ARM (Docker, puerto 30080)
#
# Los DNS records para root/www/app son gestionados por Cloudflare Pages.
# Este tunnel SOLO encamina tráfico API al backend en OCI.

resource "random_id" "tunnel_secret" {
  byte_length = 32
}

resource "cloudflare_tunnel" "huellas_v2_tunnel" {
  account_id = data.cloudflare_zone.main_zone.account_id
  name       = "huellas-v2-tunnel"
  secret     = base64encode(random_id.tunnel_secret.b64_std)
}

data "cloudflare_zone" "main_zone" {
  zone_id = var.cloudflare_zone_id
}

resource "cloudflare_tunnel_config" "huellas_v2_config" {
  account_id = data.cloudflare_zone.main_zone.account_id
  tunnel_id  = cloudflare_tunnel.huellas_v2_tunnel.id

  config {
    # Solo API backend — Cloudflare Pages maneja el frontend
    ingress_rule {
      hostname = "api.${var.domain_name}"
      service  = "http://localhost:30080"
    }

    # Catch-all: todo lo demás devuelve 404
    ingress_rule {
      service = "http_status:404"
    }
  }
}

# DNS record SOLO para la API (el tunnel encamina api.* al backend OCI)
# Los records de root/www son gestionados automáticamente por Cloudflare Pages.
resource "cloudflare_record" "api_cname" {
  zone_id = var.cloudflare_zone_id
  name    = "api"
  value   = "${cloudflare_tunnel.huellas_v2_tunnel.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
}
