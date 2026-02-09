# iam.tf - Políticas IAM (REVERSIBLE - terraform destroy)
# ESTADO: LISTO PARA APLICAR - Crear grupos y asignaciones básicas

# GRUPO DE ADMINISTRADORES OCI
resource "oci_identity_group" "admin_group" {
  compartment_id = var.compartment_ocid
  name           = "${local.project_prefix}-admin"
  description    = "Grupo de administradores del proyecto ${local.project_prefix}"
}

# GRUPO DE DESARROLLADORES
resource "oci_identity_group" "dev_group" {
  compartment_id = var.compartment_ocid
  name           = "${local.project_prefix}-developers"
  description    = "Grupo de desarrolladores para ${local.project_prefix}"
}

# POLÍTICA: Acceso total a admins en compartimento prod
resource "oci_identity_policy" "admin_policy" {
  compartment_id = var.compartment_ocid
  name           = "${local.project_prefix}-admin-policy"
  description    = "Política para administradores - Acceso total"

  statements = [
    "Allow group ${oci_identity_group.admin_group.name} to manage all-resources in compartment prod",
  ]
}

# POLÍTICA: Acceso limitado para desarrolladores
resource "oci_identity_policy" "dev_policy" {
  compartment_id = var.compartment_ocid
  name           = "${local.project_prefix}-dev-policy"
  description    = "Política para desarrolladores - Acceso limitado"

  statements = [
    # Compute
    "Allow group ${oci_identity_group.dev_group.name} to manage instances in compartment prod",
    "Allow group ${oci_identity_group.dev_group.name} to use instance-images in compartment prod",
    # Network
    "Allow group ${oci_identity_group.dev_group.name} to use network-security-groups in compartment prod",
    "Allow group ${oci_identity_group.dev_group.name} to use virtual-network-family in compartment prod",
    # Inspect instances
    "Allow group ${oci_identity_group.dev_group.name} to read instances in compartment prod",
  ]
}

# NOTA:
# - Reemplazar "admin_group.name" y "dev_group.name" con nombres reales si usas grupos existentes
# - ROLLBACK: terraform destroy oci_identity_policy.admin_policy oci_identity_policy.dev_policy
# - Los grupos pueden incluir usuarios con: oci_identity_group_membership
