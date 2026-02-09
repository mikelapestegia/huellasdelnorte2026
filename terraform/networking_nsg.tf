# networking_nsg.tf - Network Security Groups
# LISTO PARA CREAR (sin aplicar a instancia)
resource "oci_core_network_security_group" "prod_nsg" {
  compartment_id = var.compartment_ocid
  vcn_id         = var.vcn_ocid
  display_name   = "${local.project_prefix}-nsg"
  description    = "NSG restrictivo"
  tags           = local.common_tags
}

resource "oci_core_network_security_group_security_rule" "ssh_ingress" {
  network_security_group_id = oci_core_network_security_group.prod_nsg.id
  direction                 = "INGRESS"
  protocol                  = "6"
  stateless                 = false
  source                    = "10.0.0.0/24"
  source_type               = "CIDR_BLOCK"
  tcp_options {
    destination_port_range { min = 22; max = 22 }
  }
}

resource "oci_core_network_security_group_security_rule" "https_egress" {
  network_security_group_id = oci_core_network_security_group.prod_nsg.id
  direction                 = "EGRESS"
  protocol                  = "6"
  stateless                 = false
  destination               = "0.0.0.0/0"
  destination_type          = "CIDR_BLOCK"
  tcp_options {
    destination_port_range { min = 443; max = 443 }
  }
}

output "nsg_id" {
  value = oci_core_network_security_group.prod_nsg.id
}
