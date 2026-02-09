# Configuración del Túnel de Cloudflare para HuellasdelNorte V2
# Infraestructura HuellasdelNorte V2 - Febrero 2026

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
    ingress_rule {
      hostname = var.domain_name
      service  = "http://localhost:80"
    }
    ingress_rule {
      hostname = "www.${var.domain_name}"
      service  = "http://localhost:80"
    }
    ingress_rule {
      hostname = "app.${var.domain_name}"
      service  = "http://localhost:80"
    }
    ingress_rule {
      hostname = "api.${var.domain_name}"
      service  = "http://localhost:80"
    }
    ingress_rule {
      service = "http_status:404"
    }
  }
}

# Registros DNS para el Túnel
resource "cloudflare_record" "root_cname" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  value   = "${cloudflare_tunnel.huellas_v2_tunnel.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
}

resource "cloudflare_record" "www_cname" {
  zone_id = var.cloudflare_zone_id
  name    = "www"
  value   = "${cloudflare_tunnel.huellas_v2_tunnel.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
}

resource "cloudflare_record" "app_cname" {
  zone_id = var.cloudflare_zone_id
  name    = "app"
  value   = "${cloudflare_tunnel.huellas_v2_tunnel.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
}

resource "cloudflare_record" "api_cname" {
  zone_id = var.cloudflare_zone_id
  name    = "api"
  value   = "${cloudflare_tunnel.huellas_v2_tunnel.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
}
