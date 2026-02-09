# 📚 Manual de Migración HuellasdelNorte V1 → V2
## Terraform + OCI + Cloudflare - Guía Completa

**Fecha de Creación:** Febrero 2026  
**Estado:** Producción  
**Versión:** 2.1

---

## 🎯 Objetivo

Este manual proporciona los pasos detallados para migrar la infraestructura de **HuellasdelNorte desde v1 a v2** manteniendose en la capa Always Free de OCI, mejorando la seguridad con Cloudflare Tunnel y usando Terraform para la gestión de infraestructura como código.

**Importante:** Esta migración es NO-DESTRUCTIVA. Ambas versiones pueden coexistir durante la transición.

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Arquitectura Comparativa](#arquitectura-comparativa)
3. [Preparación del Entorno Local](#preparación-del-entorno-local)
4. [Gestión de Secretos y Credenciales](#gestión-de-secretos)
5. [Configuración de OCI Terraform](#configuración-oci-terraform)
6. [Configuración de Cloudflare](#configuración-cloudflare)
7. [Estructura de Terraform](#estructura-terraform)
8. [Despliegue de Infraestructura V2](#despliegue-v2)
9. [Validación y Testing](#validación-testing)
10. [Plan de Cutover](#plan-cutover)
11. [Troubleshooting](#troubleshooting)

---

## ✅ Requisitos Previos

### Software Necesario

- **Terraform** >= 1.0.0
- **OCI CLI** >= 3.0.0
- **Git** >= 2.30
- **OpenSSL** (para generar claves)
- **Bash** (Linux/macOS)
- **curl** y **wget**

### Cuentas y Accesos

**Oracle Cloud (OCI):**
- Cuenta Always Free activa
- Acceso a OCI Console
- Permisos para crear: Compute, Database, Networking

**Cloudflare:**
- Cuenta Cloudflare con dominio huellasdelnorte.com
- Acceso a API Tokens
- Permisos para crear Tunnels

**GitHub:**
- Repositorio privado
- GitHub Actions habilitado (opcional)

---

## 📊 Arquitectura Comparativa

### V1 (Actual)

```
┌─────────────────────────────┐
│   OCI Instance (Linux)      │
│  - Puertos abiertos (SSH)   │
│  - IP Pública expuesta       │
│  - Docker containers        │
│  - BD local o externa       │
└─────────────────────────────┘
        ↓
┌─────────────────────────────┐
│    DNS/Dominio manual       │
└─────────────────────────────┘
```

### V2 (Nueva - Terraform)

```
┌────────────────────────────────────┐
│   OCI VCN (10.0.0.0/16)           │
│ ┌──────────────────────────────┐  │
│ │ ARM Instance (No IP pública) │  │
│ │ - 4 OCPU / 24GB RAM          │  │
│ │ - 200GB SSD                  │  │
│ │ - Security Lists cerradas    │  │
│ └──────────────────────────────┘  │
│                                    │
│ ┌──────────────────────────────┐  │
│ │ Oracle AI Database 26ai      │  │
│ │ - Always Free (1 CPU/20GB)   │  │
│ │ - Vector Search               │  │
│ │ - Autonomous                 │  │
│ └──────────────────────────────┘  │
└────────────────────────────────────┘
        ↓ (Cloudflare Tunnel)
┌────────────────────────────────────┐
│      Cloudflare (Zero Trust)       │
│ - WAF/DDoS Protection              │
│ - DNS Management                   │
│ - API Gateway                      │
│ - Tunnels (encrypted outbound)     │
└────────────────────────────────────┘
        ↓
    Internet / Usuarios
```

**Ventajas de V2:**
- ✅ Sin IP pública = sin escaneo de puertos
- ✅ Cloudflare Tunnel = comunicación cifrada
- ✅ Always Free = sin costos
- ✅ Infrastructure as Code = reproducible y versionado
- ✅ Oracle AI Database = features avanzadas incluidas
- ✅ Security Lists restrictivas = defensa en profundidad

---

## 🔐 Gestión de Secretos y Credenciales

### IMPORTANTE: Guía de Seguridad

**NUNCA:**
- ❌ Commitear terraform.tfvars al repositorio
- ❌ Guardar API keys en archivos visibles
- ❌ Compartir secrets por email/chat
- ❌ Usar misma contraseña en múltiples servicios
- ❌ Commitear archivos de estado de Terraform
- ❌ Subir SSH private keys al repo

**SIEMPRE:**
- ✅ Usar GitHub Secrets para CI/CD
- ✅ Markear variables como `sensitive = true`
- ✅ Usar `terraform.tfvars.example` con valores falsos
- ✅ Mantener `.gitignore` actualizado
- ✅ Rotar credenciales cada 90 días
- ✅ Usar passwords únicos y complejos (min 12 caracteres)
- ✅ Habilitar 2FA en todas las cuentas
- ✅ Almacenar wallets localmente (NO en repo)

### Archivos a Proteger

```bash
# Agregar al .gitignore
terraform.tfvars
terraform.tfvars.json
*.pem
*.key
*.jks
*.p12
.terraform/
*.tfstate
*.tfstate.*
wallet.zip
wallet/
~/.oci/
~/.ssh/
.env
.env.local
```

### Generación Segura de Credenciales

```bash
# 1. Generar OCI API Key
mkdir -p ~/.oci
openssl genrsa -out ~/.oci/oci_api_key.pem 2048
openssl rsa -pubout -in ~/.oci/oci_api_key.pem -out ~/.oci/oci_api_key_public.pem
chmod 600 ~/.oci/oci_api_key.pem

# 2. Obtener fingerprint
openssl rsa -pubout -outform DER -in ~/.oci/oci_api_key.pem | openssl md5 -c

# 3. Generar SSH Key para Terraform
ssh-keygen -t rsa -b 4096 -f ~/.ssh/huellasdelnorte_key -C "huellas@oci"
chmod 600 ~/.ssh/huellasdelnorte_key

# 4. Generar contraseña fuerte para DB (min 12 chars: Mayús+minús+números)
openssl rand -base64 12 | tr -d '=' | cut -c1-12
# Ejemplo: AZ7kx9Qw2Lp
```

---

## 💫 Configuración OCI Terraform

### Paso 1: Instalar Terraform

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y wget unzip
wget https://releases.hashicorp.com/terraform/1.7.0/terraform_1.7.0_linux_amd64.zip
sudo unzip terraform_1.7.0_linux_amd64.zip -d /usr/local/bin
terraform version

# macOS
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
terraform version
```

### Paso 2: Instalar OCI CLI

```bash
bash -c "$(curl -L https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh)"
oci --version
```

### Paso 3: Configurar terraform.tfvars

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
nano terraform.tfvars  # o tu editor favorito
```

**Valores necesarios de OCI Console:**

```hcl
tenancy_ocid    = "ocid1.tenancy.oc1.."  # Profile → Tenancy Details
user_ocid       = "ocid1.user.oc1.."     # Profile → User Settings
compartment_ocid = "ocid1.compartment.." # Identity → Compartments
fingerprint     = "aa:bb:cc:dd:ee:ff"   # Generado con openssl
private_key_path = "~/.oci/oci_api_key.pem"
region          = "eu-madrid-1"

# SSH
ssh_public_key  = "ssh-rsa AAAAB3NzaC..."  # Cat ~/.ssh/huellasdelnorte_key.pub

# Database
db_admin_password = "CHANGE-ME-s3cur3P@ss!"  # ⚠️ CHANGE THIS! Min 12 chars, Mayús+minús+números

# Cloudflare
cloudflare_email = "tu@email.com"
cloudflare_api_key = "CHANGE-ME-your-api-key"
cloudflare_account_id = "account-id"
cloudflare_zone_id = "zone-id"
```

### Paso 4: Proteger el archivo

```bash
echo "terraform.tfvars" >> .gitignore
chmod 600 terraform.tfvars
git diff --cached
```

---

## 🚀 Despliegue de Infraestructura V2

### Paso 1: Inicializar Terraform

```bash
cd ~/projects/huellasdelnortev2/terraform
terraform init

# Output esperado:
# Terraform has been successfully initialized!
```

### Paso 2: Validar Configuración

```bash
terraform validate

# Output esperado:
# Success! The configuration is valid.
```

### Paso 3: Crear Plan (SIN APLICAR)

```bash
terraform plan -out=tfplan

# Revisar CUIDADOSAMENTE:
# - Cantidad de recursos
# - Nombres de instancias
# - Tamaños de almacenamiento
# - Configuración de base de datos
# - Cloudflare tunnel config
```

### Paso 4: Aplicar Cambios

```bash
terraform apply tfplan

# Esperar a que se complete (15-30 minutos)
# Ver outputs de:
# - Instance ID
# - Instance IP privada (10.0.x.x)
# - Database connection strings
# - Cloudflare tunnel ID
```

### Paso 5: Guardar Outputs Críticos

```bash
# Extraer información importante
terraform output -raw instance_id > instance_id.txt
terraform output -raw instance_private_ip > private_ip.txt
terraform output -raw database_connection_string > db_connection.txt
terraform output -raw cloudflare_tunnel_id > tunnel_id.txt

# Guardar en lugar seguro
chmod 600 *.txt
# Estas no deben commiterse al repo
```

---

## ✅ Validación y Testing

### 1. Verificar Instancia

```bash
# Desde OCI Console o CLI:
oci compute instance list --compartment-id <COMPARTMENT_ID> --query "data[?display-name==\`HuellasV2-ARM-200GB\`]"

# Debe mostrar:
# - lifecycle_state: RUNNING
# - shape: VM.Standard.A1.Flex
```

### 2. Verificar Base de Datos

```bash
# Desde OCI Console o CLI:
oci db autonomous-database list --compartment-id <COMPARTMENT_ID> --query "data[?display-name==\`HuellasdelNorte-AI-26ai\`]"

# Debe mostrar:
# - lifecycle_state: AVAILABLE
# - db_version: 26ai
```

### 3. Verificar Cloudflare Tunnel

```bash
# Conectar a la instancia (vía OCI console SSH o bastion)
# Luego instalar cloudflared:

sudo bash /opt/huellasdelnorte/scripts/install_cloudflared.sh

# Configurar tunnel (con credenciales de Terraform output)
# El tunnel debe estar en "CONNECTED" estado

cloudflared tunnel list
cloudflared tunnel info huellasdelnorte-tunnel
```

### 4. Probar Conectividad DNS

```bash
# Desde tu máquina local:
nslookup api.huellasdelnorte.com
nslookup app.huellasdelnorte.com

# Debe resolver a Cloudflare IPs
```

---

## 😀 Plan de Cutover (V1 → V2)

### Fase 1: Preparación (Antes del cutover)
- [ ] Backup completo de datos en V1
- [ ] Documentar configuración actual
- [ ] Probar migración en ambiente de staging
- [ ] Preparar rollback plan
- [ ] Notificar a usuarios

### Fase 2: Migración de Datos
- [ ] Exportar bases de datos desde V1
- [ ] Importar a Oracle AI Database 26ai
- [ ] Validar integridad de datos
- [ ] Verificar permisos y usuarios

### Fase 3: Actualizar DNS (ventana de bajo tráfico)
- [ ] Cambiar Cloudflare records a V2
- [ ] Reducir TTL antes del cambio
- [ ] Monitorear logs en tiempo real
- [ ] Estar listo para rollback en 15 minutos

### Fase 4: Validación Post-Cutover
- [ ] Probar todas las endpoints API
- [ ] Verificar aplicación móvil
- [ ] Verificar aplicación web
- [ ] Monitorear performance
- [ ] Revisar logs de errores

### Fase 5: Limpieza
- [ ] Mantener V1 por 48 horas más (rollback contingency)
- [ ] Desmontar V1 después de confirmación
- [ ] Archivar backups
- [ ] Documentar cambios

---

## 🔍 Troubleshooting

### Terraform falluó durante apply

```bash
# Ver error completo
terraform apply tfplan 2>&1 | tee apply.log

# Errores comunes:
# 1. "Fingerprint mismatch" → Verificar OCI API key
# 2. "Compartment not found" → Verificar OCID del compartment
# 3. "Insufficient capacity" → Probar con otra availability domain

# Recuperarse:
terraform refresh
terraform plan -out=tfplan  # Crear nuevo plan
```

### Instancia no inicia

```bash
# Verificar en OCI Console:
# - Instance Status
# - Boot Volume status
# - Availability Domain

# Ver logs:
oci compute instance-console-history get --instance-id <INSTANCE_ID> --file - | head -100
```

### Cloudflare Tunnel no conecta

```bash
# SSH a la instancia
sudo journalctl -u cloudflared -f  # Ver logs
sudo systemctl status cloudflared

# Reiniciar servicio:
sudo systemctl restart cloudflared
```

### Base de datos lenta

```bash
# Desde Oracle Database Console:
# - Verificar CPU usage
# - Revisar Active Sessions
# - Analizar Query Performance Insights

# Aumentar OCPU (si es necesario y créditos lo permiten)
```

---

## 🏗️ Soporte y Referencias

- **OCI Terraform Provider:** https://registry.terraform.io/providers/oracle/oci/latest/docs
- **Cloudflare Provider:** https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs
- **OCI Always Free:** https://www.oracle.com/cloud/free/
- **Cloudflare Tunnels:** https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/

---

**✨ Documento actualizado: Febrero 8, 2026**
