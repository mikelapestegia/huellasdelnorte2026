# Variables de Configuración - Infraestructura OCI + Cloudflare
# HuellasdelNorte V2 - Febrero 2026

# ===== Variables OCI =====

variable "tenancy_ocid" {
  description = "OCID de la tenencia de OCI"
  type        = string
}

variable "user_ocid" {
  description = "OCID del usuario de OCI"
  type        = string
}

variable "fingerprint" {
  description = "Fingerprint de la clave API de OCI"
  type        = string
}

variable "private_key_path" {
  description = "Ruta a la clave privada de OCI"
  type        = string
}

variable "region" {
  description = "Región de OCI"
  type        = string
  default     = "eu-frankfurt-1"
}

variable "compartment_ocid" {
  description = "OCID del compartimento donde se crearán los recursos"
  type        = string
}

# ===== Variables de Red Existente =====

variable "vcn_ocid" {
  description = "OCID de la VCN existente (fuente08022026)"
  type        = string
}

variable "subnet_ocid" {
  description = "OCID de la subnet existente"
  type        = string
}

# ===== Variables de Cómputo =====

variable "arm_instance_shape" {
  description = "Shape de la instancia ARM principal (VM.Standard.A1.Flex)"
  type        = string
  default     = "VM.Standard.A1.Flex"
}

variable "instance_shape" { # Alias para compatibilidad con código existente
  description = "Shape de la instancia (alias)"
  type        = string
  default     = "VM.Standard.A1.Flex"
}

variable "arm_instance_ocpus" {
  description = "Número de OCPUs para la instancia ARM"
  type        = number
  default     = 4
}

variable "instance_ocpus" { # Alias
  description = "OCPUs (alias)"
  type        = number
  default     = 4
}

variable "arm_instance_memory_gb" {
  description = "Memoria en GB para la instancia ARM"
  type        = number
  default     = 24
}

variable "instance_memory_gb" { # Alias
  description = "Memoria GB (alias)"
  type        = number
  default     = 24
}

variable "arm_boot_volume_size_gb" {
  description = "Tamaño del volumen de arranque ARM en GB"
  type        = number
  default     = 150
}

variable "boot_volume_size_gb" { # Alias
  description = "Boot Volume Size GB (alias)"
  type        = number
  default     = 150
}

variable "ssh_public_key" {
  description = "Clave pública SSH para acceso a las instancias"
  type        = string
}

# ===== Variables de Base de Datos =====

variable "db_admin_password" {
  description = "Contraseña del administrador de la base de datos"
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "Nombre de la base de datos"
  type        = string
  default     = "huellas26ai"
}

variable "db_display_name" {
  description = "Nombre visible de la base de datos en la consola OCI"
  type        = string
  default     = "Huellas del Norte AI DB"
}

variable "db_version" {
  description = "Versión de la base de datos (ej: 19c, 21c, 23ai)"
  type        = string
  default     = "19c" # OCI Free Tier suele ser 19c o 21c, ajusta según disponibilidad
}

variable "db_workload_type" {
  description = "Tipo de carga de trabajo (OLTP o DW)"
  type        = string
  default     = "OLTP"
}

variable "db_is_free_tier" {
  description = "Indica si se usa el nivel gratuito"
  type        = bool
  default     = true
}

variable "db_cpu_core_count" {
  description = "Número de núcleos CPU para la DB"
  type        = number
  default     = 1
}

variable "db_data_storage_size_in_tbs" {
  description = "Tamaño de almacenamiento en TBs"
  type        = number
  default     = 0.02 # 20GB para Always Free
}

variable "db_license_model" {
  description = "Modelo de licencia"
  type        = string
  default     = "LICENSE_INCLUDED"
}

variable "db_require_mtls" {
  description = "Si es true, la base de datos requiere mTLS (recomendado para producción)."
  type        = bool
  default     = true
}

variable "db_prevent_destroy" {
  description = "Protección contra destrucción accidental de la DB"
  type        = bool
  default     = true
}

# ===== Variables Cloudflare =====

variable "cloudflare_api_token" {
  description = "Token de API de Cloudflare"
  type        = string
  sensitive   = true
}

variable "cloudflare_zone_id" {
  description = "Zone ID del dominio en Cloudflare"
  type        = string
}

variable "domain_name" {
  description = "Nombre de dominio (ej: huellasdelnorte.com)"
  type        = string
}

# ===== Variables de Tags =====

variable "project_tags" {
  description = "Tags comunes para todos los recursos"
  type        = map(string)
  default = {
    "Project"     = "HuellasdelNorte-V2"
    "Environment" = "Production"
    "ManagedBy"   = "Terraform"
    "Version"     = "Feb2026"
  }
}
