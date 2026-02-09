# monitoring.tf - Configuración de Logging (GRATUITO - SIN COSTO)
# ESTADO: LISTO PARA APLICAR
# No afecta ni modifica recursos existentes

# Log Group para auditoría
resource "oci_logging_log_group" "prod_log_group" {
  compartment_id = var.compartment_ocid
  display_name   = "${local.project_prefix}-log-group"
  description    = "Grupo de logs para auditoría - ${local.project_prefix}"
  tags           = local.common_tags
}

# Log de auditoría del compartimento
resource "oci_logging_log" "audit_log" {
  display_name       = "${local.project_prefix}-audit-log"
  log_group_id       = oci_logging_log_group.prod_log_group.id
  log_type           = "SERVICE"
  source_resource_id = var.compartment_ocid
  is_enabled         = true
  tags               = local.common_tags
}

# Outputs para validación
output "log_group_id" {
  description = "ID del grupo de logs creado"
  value       = oci_logging_log_group.prod_log_group.id
}

output "audit_log_id" {
  description = "ID del log de auditoría"
  value       = oci_logging_log.audit_log.id
}
