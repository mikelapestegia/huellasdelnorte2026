# 🔐 SECRETS & CREDENTIALS MANAGEMENT

> **CRITICAL**: Este documento explica cómo gestionar de forma segura todas las credenciales, tokens y passwords del proyecto HuellasdelNorte V2.

## 📋 TABLA DE CONTENIDOS

1. [Secrets Necesarios](#secrets-necesarios)
2. [GitHub Secrets Configuration](#github-secrets)
3. [Local Development Setup](#local-setup)
4. [Best Practices](#best-practices)
5. [Password Requirements](#password-requirements)

---

## 🔑 SECRETS NECESARIOS

### **OCI (Oracle Cloud Infrastructure)**

| Secret Name | Descripción | Dónde Obtenerlo | Tipo |
|-------------|-------------|-----------------|------|
| `TF_VAR_tenancy_ocid` | OCID del tenancy | OCI Console → Profile → Tenancy | OCID |
| `TF_VAR_user_ocid` | OCID del usuario | OCI Console → Profile → User Settings | OCID |
| `TF_VAR_fingerprint` | Fingerprint de API Key | OCI Console → User → API Keys | String |
| `TF_VAR_private_key` | Private key completa | Generada localmente (.pem file) | Multi-line |
| `TF_VAR_compartment_ocid` | OCID del compartment | OCI Console → Identity → Compartments | OCID |

### **Oracle AI Database 26ai**

| Secret Name | Descripción | Requisitos | Tipo |
|-------------|-------------|------------|------|
| `TF_VAR_db_admin_password` | Password ADMIN de DB | Min 12 chars, Upper+Lower+Numbers | String |
| `DB_WALLET_PASSWORD` | Password para wallet | Mismo que admin o diferente | String |

### **Cloudflare**

| Secret Name | Descripción | Dónde Obtenerlo | Tipo |
|-------------|-------------|-----------------|------|
| `TF_VAR_cloudflare_api_token` | API Token con mínimo privilegio | Cloudflare → My Profile → API Tokens | String |
| `TF_VAR_cloudflare_account_id` | Account ID | Cloudflare Dashboard → Overview | String |
| `TF_VAR_cloudflare_zone_id` | Zone ID del dominio | Cloudflare → Domain → Overview | String |

### **SSH Keys**

| Secret Name | Descripción | Cómo Generarlo | Tipo |
|-------------|-------------|----------------|------|
| `TF_VAR_ssh_public_key` | SSH public key | `ssh-keygen -t rsa -b 4096` | String |
| `SSH_PRIVATE_KEY` | SSH private key | Archivo .pem generado | Multi-line |

---

## 🔧 GITHUB SECRETS

### Configurar en GitHub Repository

1. **Navegar a Settings**:
   ```
   Repository → Settings → Secrets and variables → Actions
   ```

2. **Click en "New repository secret"**

3. **Agregar cada secret** de la tabla anterior

### Ejemplo de Uso en GitHub Actions

```yaml
name: Terraform Deploy

on:
  push:
    branches: [main]

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2
      
      - name: Terraform Init
        run: terraform init
        env:
          TF_VAR_tenancy_ocid: ${{ secrets.TF_VAR_TENANCY_OCID }}
          TF_VAR_user_ocid: ${{ secrets.TF_VAR_USER_OCID }}
          # ... resto de variables
```

---

## 💻 LOCAL DEVELOPMENT SETUP

### 1. Crear `terraform/terraform.tfvars`

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

### 2. Editar con valores reales

⚠️ **NUNCA commitear `terraform.tfvars`** (está en `.gitignore`)

```hcl
# terraform/terraform.tfvars
tenancy_ocid     = "ocid1.tenancy.oc1..aaaaaaaa..."
user_ocid        = "ocid1.user.oc1..aaaaaaaa..."
fingerprint      = "aa:bb:cc:dd:ee:ff:00:11:22:33:44:55:66:77:88:99"
private_key_path = "~/.oci/oci_api_key.pem"
# ... resto de valores
```

### 3. Generar SSH Keys

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/huellasdelnorte_key -C "huellasdelnorte@oci"

# Public key para terraform.tfvars:
cat ~/.ssh/huellasdelnorte_key.pub
```

### 4. Generar OCI API Key

```bash
mkdir -p ~/.oci
cd ~/.oci

# Generar private key
openssl genrsa -out oci_api_key.pem 2048

# Generar public key
openssl rsa -pubout -in oci_api_key.pem -out oci_api_key_public.pem

# Ver fingerprint
openssl rsa -pubout -outform DER -in oci_api_key.pem | openssl md5 -c
```

**Luego subir `oci_api_key_public.pem` a OCI Console**:
- Profile → User Settings → API Keys → Add API Key

---

## ✅ BEST PRACTICES

### DO ✅

- ✅ Usar GitHub Secrets para CI/CD
- ✅ Marcar variables como `sensitive = true` en Terraform
- ✅ Usar `terraform.tfvars.example` con valores falsos
- ✅ Mantener `.gitignore` actualizado
- ✅ Rotar credenciales cada 90 días
- ✅ Usar passwords únicos y complejos
- ✅ Habilitar 2FA en todas las cuentas
- ✅ Almacenar wallets localmente (no en repo)

### DON'T ❌

- ❌ Commitear `terraform.tfvars`
- ❌ Hardcodear secrets en código
- ❌ Compartir API keys por email/chat
- ❌ Usar misma password para múltiples servicios
- ❌ Commitear archivos de estado Terraform
- ❌ Subir SSH private keys al repo
- ❌ Dejar credentials en logs
- ❌ Usar passwords débiles

---

## 🔒 PASSWORD REQUIREMENTS

### Oracle Database Admin Password

**Requisitos obligatorios**:
- ✅ Mínimo 12 caracteres
- ✅ Al menos 1 mayúscula
- ✅ Al menos 1 minúscula
- ✅ Al menos 1 número
- ✅ Sin espacios
- ✅ Puede incluir: `! # $ % & ( ) * + , - . / : ; < = > ? @ [ ] ^ _ { | } ~`

**Ejemplo válido**: `MySecureDb2026!Pass`

### Cloudflare API Key

- Obtener desde: https://dash.cloudflare.com/profile/api-tokens
- Usar **API Token scoped** (mínimo privilegio) en lugar de Global API Key
- Mantener en lugar seguro

### Cloudflare API Token (recomendado)

Permisos mínimos sugeridos para este proyecto:
- `Zone:DNS:Edit`
- `Zone:Zone:Read`
- `Account:Cloudflare Tunnel:Edit` (si gestionas túneles por Terraform)

Scope recomendado:
- Solo la zona objetivo (no todas las zonas)

---

## 🚨 QUÉ HACER SI UN SECRET SE FILTRA

### Respuesta Inmediata

1. **Revocar credencial inmediatamente**:
   - OCI: Eliminar API Key desde Console
   - Cloudflare: Revocar y regenerar API Token comprometido
   - Database: Cambiar password ADMIN

2. **Rotar todos los secrets relacionados**

3. **Revisar logs de acceso** para detectar uso no autorizado

4. **Actualizar secrets en GitHub** y localmente

5. **Re-deployar infraestructura** si es necesario

---

## 📞 CONTACTO

**¿Dudas sobre seguridad?**
- Revisar documentación oficial de cada servicio
- No compartir secrets por canales inseguros
- En caso de duda, regenerar credencial

---

**Última actualización**: Febrero 2026
