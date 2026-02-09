# 🔐 PLAN DE IMPLEMENTACIÓN DE MEJORAS DE SEGURIDAD
# HuellasdelNorte V2 - OCI Security Hardening

## 📋 OBJETIVO
Implementar mejoras de seguridad SIN PERDER ACCESO a recursos existentes.

## ⚠️ ESTADO ACTUAL (AUDITORÍA)
```
Instancia: ik3s-worker
IP Privada: 10.0.0.221
Subnet: subnet-20260209-0201 (10.0.0.0/24)
VCN: vcn-20260209-0201 (10.0.0.0/16)
Security List: Default (PERMISIVO)
NSGs: NINGUNO
Región: eu-madrid-1
Compartimento: prod
```

## 🚨 RIESGOS IDENTIFICADOS
1. Security Lists demasiado permisivas (egress 0.0.0.0/0)
2. Sin NSGs aplicados
3. Sin políticas IAM
4. Sin logging configurado
5. Sin validaciones en variables Terraform

## ✅ PLAN DEFENSIVO (5 FASES)

### FASE 1: PREPARACIÓN (SIN CAMBIOS EN OCI)
- [ ] Crear rama `security/hardening` en Git
- [ ] Crear archivos Terraform locales
- [ ] Validar sintaxis con `terraform validate`
- [ ] **IMPORTANTE: NO aplicar cambios aún**

### FASE 2: IAM (Reversible)
- [ ] Crear políticas IAM básicas
- [ ] `terraform plan` para revisar cambios
- [ ] `terraform apply` para crear políticas
- [ ] Rollback disponible: `terraform destroy`

### FASE 3: LOGGING (Sin impacto en runtime)
- [ ] Configurar OCI Logging (gratuito)
- [ ] Habilitar audit logs
- [ ] No afecta instancia

### FASE 4: NSGs (SIN APLICAR AÚN)
- [ ] Crear NSGs en Terraform
- [ ] NO aplicar a instancia
- [ ] Validar rules en consola

### FASE 5: APLICAR NSGs (CON VALIDACIÓN)
- [ ] Revisar security lists actuales
- [ ] Aplicar NSG a VNIC de forma gradual
- [ ] Monitorear acceso en cada paso
- [ ] ROLLBACK plan si hay problemas

## 🔄 PROCEDIMIENTO DE ROLLBACK

### Si algo se rompe:
```bash
# 1. VER ESTADO ACTUAL
terraform show

# 2. DESTRUIR CAMBIOS ESPECÍFICOS
terraform destroy -target=oci_core_network_security_group.prod_nsg

# 3. ROLLBACK COMPLETO (ÚLTIMO RECURSO)
terraform destroy
```

## 📝 ARCHIVOS A CREAR

1. `locals.tf` - Variables locales compartidas
2. `iam.tf` - Políticas IAM
3. `monitoring.tf` - Logging
4. `networking_nsg.tf` - Network Security Groups
5. `security_list_update.tf` - Mejoras a Security Lists
6. `terraform.tfvars.example` - Template de variables

## ⚡ EJECUCIÓN PASO A PASO

### Paso 1: Validar sintaxis
```bash
cd terraform
terraform init
terraform validate
```

### Paso 2: Ver qué va a cambiar (SIN APLICAR)
```bash
terraform plan -out=tfplan
```

### Paso 3: REVISAR PLAN EN CONSOLA OCI
ANTES de ejecutar, validar:
- [ ] No se borra la instancia
- [ ] No se modifica la subnet
- [ ] No se toca la tabla de rutas DEFAULT

### Paso 4: Aplicar cambios
```bash
terraform apply tfplan
```

### Paso 5: Validar en consola OCI
- [ ] Políticas IAM creadas
- [ ] NSGs creados pero no aplicados
- [ ] Logs activos

## 🛑 PUNTOS DE NO RETORNO

NO HACER ESTO SIN APROBACIÓN EXPLÍCITA:
- ❌ Eliminar Security Lists existentes
- ❌ Cambiar tabla de rutas default
- ❌ Modificar VCN CIDR
- ❌ Eliminar subnet
- ❌ Aplicar NSG sin validar primero

## ✨ MEJORAS SEGURAS (FASE 1-3)

Estas se pueden aplicar SIN RIESGO:
- ✅ Crear políticas IAM nuevas
- ✅ Crear logging
- ✅ Agregar tags
- ✅ Crear NSGs (sin aplicar)
- ✅ Mejorar variables

## 📊 CHECKLIST DE SEGURIDAD

- [ ] Terraform state respaldado
- [ ] Estado actual documentado
- [ ] Plan revisado antes de aplicar
- [ ] Acceso a OCI console verificado
- [ ] Rollback plan documentado
- [ ] Cambios aplicados en orden
- [ ] Validación en consola OCI

## 🔗 REFERENCIAS
- OCI Terraform Provider: https://registry.terraform.io/providers/oracle/oci/latest/docs
- Security Lists: https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/securitylists.htm
- NSGs: https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/nsg.htm

## ⏰ CRONOGRAMA ESTIMADO
- Fase 1: 1-2 horas
- Fase 2: 30 minutos
- Fase 3: 30 minutos
- Fase 4: 1 hora
- Fase 5: 1-2 horas (con validación)
- **Total: 4-6 horas**

---

**FECHA INICIO:** 10 Feb 2026
**ESTADO:** Preparación
**RESPONSABLE:** mikelapestegia
