# Cloudflare Rate Limiting Rules
# Protege la API de abusos y ataques DDoS básicos

resource "cloudflare_ruleset" "rate_limiting_api" {
  zone_id     = var.cloudflare_zone_id
  name        = "Rate Limit API"
  description = "Limit requests to API endpoints"
  kind        = "zone"
  phase       = "http_ratelimit"

  rules {
    action = "block"
    action_parameters {
      response {
        status_code  = 429
        content      = "{\"error\": \"Too many requests\"}"
        content_type = "application/json"
      }
    }
    expression  = "(http.request.uri.path matches \"^/api/\")"
    description = "Block API abuse > 100 req/min"
    enabled     = true
    
    ratelimit {
      characteristics = ["ip.src"]
      period          = 60
      requests_per_period = 100
      mitigation_timeout  = 60
    }
  }
}
