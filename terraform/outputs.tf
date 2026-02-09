# Database Outputs
output "db_connection_strings" {
  description = "Connection strings for the Autonomous Database"
  value = {
    high   = try(local.db_connection_high, "N/A")
    medium = try(local.db_connection_medium, "N/A")
    low    = try(local.db_connection_low, "N/A")
  }
}

output "db_sql_web_url" {
  description = "URL for SQL Developer Web"
  value       = try(local.db_url, "N/A")
}

# Compute Outputs
output "instance_private_ip" {
  description = "Private IP address of the compute instance"
  value       = oci_core_instance.single_instance.private_ip
}

output "instance_id" {
  description = "OCID of the compute instance"
  value       = oci_core_instance.single_instance.id
}

# Cloudflare Outputs
output "tunnel_id" {
  description = "ID of the Cloudflare Tunnel"
  value       = cloudflare_tunnel.huellas_v2_tunnel.id
  sensitive   = true
}

output "tunnel_name" {
  description = "Name of the Cloudflare Tunnel"
  value       = cloudflare_tunnel.huellas_v2_tunnel.name
}

output "dns_records" {
  description = "DNS records created"
  value = [
    cloudflare_record.root_cname.hostname,
    cloudflare_record.www_cname.hostname,
    cloudflare_record.app_cname.hostname,
    cloudflare_record.api_cname.hostname
  ]
}
