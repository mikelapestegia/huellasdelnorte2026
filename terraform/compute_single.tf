# Instancia ARM Única de Alto Rendimiento (Always Free)
# HuellasdelNorte V2 - Febrero 2026

resource "oci_core_instance" "single_instance" {
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
  compartment_id      = var.compartment_ocid
  display_name        = "HuellasV2-ARM-200GB"
  shape               = var.instance_shape

  shape_config {
    ocpus         = var.instance_ocpus
    memory_in_gbs = var.instance_memory_gb
  }

  create_vnic_details {
    subnet_id        = local.subnet_id
    display_name     = "primaryvnic"
    assign_public_ip = false # Acceso vía Bastion y Cloudflare Tunnel
    hostname_label   = "huellas-arm"
  }

  source_details {
    source_type             = "image"
    source_id               = data.oci_core_images.oracle_linux.images[0].id
    boot_volume_size_in_gbs = var.boot_volume_size_gb
  }

  metadata = {
    ssh_authorized_keys = var.ssh_public_key
    user_data           = base64encode(file("${path.module}/../scripts/bootstrap_node.sh"))
  }

  freeform_tags = var.project_tags

  lifecycle {
    ignore_changes = [
      source_details[0].source_id # Ignorar cambios en la imagen
    ]
  }
}

# Obtener Availability Domains
data "oci_identity_availability_domains" "ads" {
  compartment_id = var.tenancy_ocid
}

# Obtener Imagen de Oracle Linux para ARM
data "oci_core_images" "oracle_linux" {
  compartment_id           = var.compartment_ocid
  operating_system         = "Oracle Linux"
  operating_system_version = "8"
  shape                    = var.instance_shape
  sort_by                  = "TIMECREATED"
  sort_order               = "DESC"
}
