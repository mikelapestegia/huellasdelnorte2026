# ============================================================================
# ORACLE AI DATABASE 26ai - Autonomous Database
# HuellasdelNorte V2 - Always Free Tier Configuration
# ============================================================================

# Oracle AI Database 26ai Autonomous Database (Always Free)
resource "oci_database_autonomous_database" "huellas_ai_db" {
  compartment_id = var.compartment_ocid
  
  # Database Configuration
  db_name              = var.db_name
  display_name         = var.db_display_name
  db_version           = var.db_version
  db_workload          = var.db_workload_type
  
  # Always Free Tier Configuration
  is_free_tier                = var.db_is_free_tier
  cpu_core_count              = var.db_cpu_core_count
  data_storage_size_in_tbs    = var.db_data_storage_size_in_tbs
  
  # Admin Credentials
  admin_password = var.db_admin_password
  
  # License Model (LICENSE_INCLUDED para Always Free)
  license_model = var.db_license_model
  
  # Auto Scaling (disponible en Always Free)
  is_auto_scaling_enabled = true
  
  # Oracle AI Database 26ai Features
  # AI Vector Search está habilitado por defecto en 26ai
  # Seguridad: mTLS habilitado por defecto. En dev puede desactivarse vía tfvars.
  is_mtls_connection_required = var.db_require_mtls
  
  # Backup Configuration
  is_auto_scaling_for_storage_enabled = true
  
  # Networking
  # En Always Free, la base de datos es pública por defecto
  # Se puede configurar Private Endpoint con configuración adicional
  
  # Tags
  freeform_tags = merge(
    var.project_tags,
    {
      "Component" = "Database"
      "Tier"      = "Always-Free"
      "Version"   = var.db_version
    }
  )
  
  lifecycle {
    # Prevenir destrucción accidental de la base de datos
    prevent_destroy = var.db_prevent_destroy
    
    # Ignorar cambios en el password después de la creación
    ignore_changes = [
      admin_password
    ]
  }
}

# Wallet Configuration (Descarga automática del wallet)
resource "oci_database_autonomous_database_wallet" "huellas_ai_db_wallet" {
  autonomous_database_id = oci_database_autonomous_database.huellas_ai_db.id
  password              = var.db_admin_password
  base64_encode_content = true
  
  # El wallet se genera automáticamente y se puede descargar
}

# ============================================================================
# OUTPUTS LOCALES
# ============================================================================

locals {
  # Connection Strings
  db_connection_high    = oci_database_autonomous_database.huellas_ai_db.connection_strings[0].high
  db_connection_medium  = oci_database_autonomous_database.huellas_ai_db.connection_strings[0].medium
  db_connection_low     = oci_database_autonomous_database.huellas_ai_db.connection_strings[0].low
  
  # Database URL
  db_url = oci_database_autonomous_database.huellas_ai_db.connection_urls[0].sql_dev_web_url
  
  # Wallet content (base64 encoded)
  wallet_content = oci_database_autonomous_database_wallet.huellas_ai_db_wallet.content
}

# ============================================================================
# NOTES:
# ============================================================================
# 1. Oracle AI Database 26ai incluye:
#    - AI Vector Search (built-in)
#    - JSON Duality Views
#    - SQL Firewall
#    - True Cache
#    - Property Graph
#
# 2. Always Free Tier incluye:
#    - 1 OCPU
#    - 20GB de almacenamiento
#    - Auto scaling habilitado
#    - Backups automáticos
#
# 2.1. Hardening recomendado (por defecto en este repo):
#    - db_require_mtls = true
#    - db_prevent_destroy = true
#    Para laboratorios/dev puedes sobrescribirlos en terraform.tfvars.
#
# 3. Para conectar desde aplicaciones, necesitarás:
#    - El wallet (descargado automáticamente)
#    - Connection strings (ver outputs)
#    - Admin password
#
# 4. El wallet se guarda automáticamente en:
#    - Local: ./wallet.zip
#    - GitHub Secrets: Usar GitHub Actions para almacenar
#
# ============================================================================
