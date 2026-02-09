# locals.tf - Variables locales compartidas
# SEGURO PARA EJECUTAR - Solo define valores locales

locals {
  # Adapter para compatibilidad con código existente
  subnet_id = var.subnet_ocid

  # Naming convention
  project_prefix = "${var.project_name}-${var.environment}"

  # Tags estándar OBLIGATORIOS para auditoría
  common_tags = merge(
    var.project_tags,
    {
      ManagedBy              = "Terraform"
      CreatedDate            = formatdate("YYYY-MM-DD", timestamp())
      SecurityClassification = "Internal"
      BackupRequired         = "true"
      CostCenter             = "Tech-Operations"
      Owner                  = "mikelapestegia"
      ComplianceLevel        = "SOC2-Type1"
      DataClassification     = "Confidential"
      AuditTrail             = "Enabled"
    }
  )

  # Networking - NO CAMBIAR VALORES EXISTENTES
  vcn_cidr_block = "10.0.0.0/16"
  subnet_cidr    = "10.0.0.0/24"

  # Seguridad: IPs permitidas para SSH
  # IMPORTANTE: Actualizar con tu IP real o Bastion
  allowed_ssh_sources = [
    "10.0.0.0/24",  # Subnet interna (cambiar después a Bastion IP)
  ]

  # Puertos necesarios para ik3s-worker
  kubernetes_ports = {
    api_server = 6443
    kubelet    = 10250
  }

  # Puertos de salida seguros
  outbound_ports = {
    https = 443
    dns   = 53
    ntp   = 123
  }
}

# NOTAS DE SEGURIDAD:
# 1. Estos son valores LOCALES - no crean recursos
# 2. Se usan para consistencia en toda la configuración
# 3. NO TOCAR los valores de red (VCN, subnet)
# 4. Los tags se aplican a TODOS los recursos nuevos
