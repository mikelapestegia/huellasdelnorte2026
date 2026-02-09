# 🔄 PROCEDIMIENTOS DE ROLLBACK

## ESCENARIO 1: NSG rompió SSH

**SÍNTOMAS:**
- No puedes hacer SSH a ik3s-worker
- Timeouts

**SOLUCIÓN - INMEDIATA:**

1. Desde consola OCI web:
   - Compute → Instances → ik3s-worker
   - Networking → VNIC Primario
   - Edit → Quitar NSG
   - Save
   - Esperar 30 segundos
   - Reintentar SSH

2. Desde Terraform:
   ```bash
   terraform destroy -target=oci_core_network_security_group.prod_nsg
   terraform plan
   terraform apply
   ```

## ESCENARIO 2: Estado corrupto

**SOLUCIÓN:**
```bash
# 1. Backup
terraform state pull > backup-$(date +%s).json

# 2. Restaurar
cat backup-*.json | terraform state push -
```

## ESCENARIO 3: Desastre total

**ÚTIMO RECURSO:**
```bash
terraform destroy -auto-approve
```

Verificar en OCI que no existan:
- Grupos IAM
- Políticas
- Log groups
- NSGs

## CONTACTOS DE EMERGENCIA
- OCI Support: https://support.oracle.com
- Terraform Docs: https://registry.terraform.io/providers/oracle/oci/latest/docs
