# ✅ CHECKLIST DE IMPLEMENTACIÓN SEGURA

## ANTES DE EMPEZAR
- [ ] Terraform state respaldado
- [ ] Acceso a OCI console verificado
- [ ] SSH a ik3s-worker funciona
- [ ] Documentar IPs actuales

## FASE 1: VALIDAR LOCALMENTE
- [ ] `cd terraform && terraform init`
- [ ] `terraform validate` (debe pasar)
- [ ] `terraform fmt` (formatear)

## FASE 2: VER CAMBIOS (SIN APLICAR)
```bash
terraform plan -out=tfplan
```

**DEBE CREAR:**
- ✅ oci_identity_group (admin, dev)
- ✅ oci_identity_policy (admin, dev)
- ✅ oci_logging_log_group
- ✅ oci_logging_log
- ✅ oci_core_network_security_group
- ✅ 8x oci_core_network_security_group_security_rule

**NO DEBE MODIFICAR:**
- ❌ oci_core_instance (ik3s-worker)
- ❌ oci_core_vcn
- ❌ oci_core_subnet

## FASE 3: REVISAR EN CONSOLA OCI
- [ ] IAM Grupos = vacío
- [ ] IAM Políticas = vacío
- [ ] Logging = vacío
- [ ] ik3s-worker = En ejecución (sin cambios)

## FASE 4: APLICAR CAMBIOS
```bash
terraform apply tfplan
```

## FASE 5: VALIDAR DESPUÉS
- [ ] SSH a ik3s-worker sigue funcionando
- [ ] `kubectl` responde
- [ ] Sin errores en OCI

## ROLLBACK SI FALLA
```bash
terraform destroy -target=oci_identity_policy.*
terraform destroy -target=oci_identity_group.*
terraform destroy  # Último recurso
```
