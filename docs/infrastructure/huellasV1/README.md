# Estado de la Infraestructura HuellasV1

## Información General

**Proyecto:** Huellas del Norte V1
**Fecha de documentación:** 8 de febrero de 2026
**Estado:** Infraestructura en producción (Legacy)

## Descripción

Documentación del estado actual de la infraestructura de la versión 1 de Huellas del Norte, alojada en Oracle Cloud Infrastructure (OCI) bajo la capa Always Free.

## Arquitectura General

### Proveedor Cloud
- **Proveedor:** Oracle Cloud Infrastructure (OCI)
- **Región:** eu-frankfurt-1
- **Tier:** Always Free
- **Tenancy:** ocid1.tenancy.oc1...

### Componentes Principales

#### 1. Compute Instances

##### Instancia Principal
- **Nombre:** huellas-main-instance
- **Shape:** VM.Standard.E2.1.Micro (Always Free)
- **CPU:** 1 OCPU
- **RAM:** 1 GB
- **Sistema Operativo:** Oracle Linux 8
- **Propósito:** Servidor de aplicación y base de datos

#### 2. Almacenamiento

##### Block Volume
- **Nombre:** huellas-data-volume
- **Tamaño:** 50 GB (Always Free)
- **Tipo:** Block Volume (Performance)
- **Uso:** Almacenamiento de datos de aplicación y backups

##### Boot Volume
- **Tamaño:** 47 GB
- **Tipo:** Boot Volume
- **Backup:** Automático (política semanal)

#### 3. Networking

##### VCN (Virtual Cloud Network)
- **Nombre:** huellas-vcn
- **CIDR Block:** 10.0.0.0/16
- **DNS Label:** huellasvcn

##### Subnets
- **Subnet Pública:** 10.0.0.0/24
  - Internet Gateway habilitado
  - Security List configurado

##### Security Lists
**Reglas de Ingress:**
- Puerto 22 (SSH): 0.0.0.0/0
- Puerto 80 (HTTP): 0.0.0.0/0
- Puerto 443 (HTTPS): 0.0.0.0/0
- Puerto 3000 (App): 0.0.0.0/0

**Reglas de Egress:**
- Todo el tráfico permitido

##### IP Pública
- **Tipo:** Reserved Public IP
- **IP:** [Pendiente de documentar]

#### 4. Base de Datos

##### MySQL/MariaDB
- **Versión:** MariaDB 10.5
- **Ubicación:** Misma instancia compute
- **Puerto:** 3306 (solo acceso local)
- **Bases de datos:**
  - huellasdelnorte_prod
  - huellasdelnorte_dev

#### 5. Aplicación

##### Stack Tecnológico
- **Backend:** Node.js / Express
- **Frontend:** React/Next.js
- **Servidor Web:** Nginx como reverse proxy
- **Process Manager:** PM2

##### Puertos
- **Nginx:** 80, 443
- **Aplicación Node:** 3000
- **Base de datos:** 3306 (local)

#### 6. SSL/TLS

- **Certificado:** Let's Encrypt
- **Gestión:** Certbot
- **Renovación:** Automática (cron job)
- **Dominio:** huellasdelnorte.com

#### 7. DNS

- **Proveedor:** Cloudflare
- **Registros configurados:**
  - A record: huellasdelnorte.com → IP pública OCI
  - CNAME: www.huellasdelnorte.com → huellasdelnorte.com

## Limitaciones de Always Free Tier

### Límites Actuales
- **Compute:** 2 instancias VM.Standard.E2.1.Micro (usando 1)
- **Block Storage:** 200 GB total (usando 50 GB)
- **Boot Volumes:** 100 GB total (usando 47 GB)
- **VCN:** 2 VCNs disponibles (usando 1)
- **Load Balancers:** 1 LB micro disponible (no usado)
- **IP Públicas:** 2 reserved IPs (usando 1)

### Recursos Disponibles para V2
- 1 instancia VM.Standard.E2.1.Micro adicional
- 150 GB de Block Storage adicional
- 53 GB de Boot Volume adicional
- 1 VCN adicional
- 1 Load Balancer micro
- 1 Reserved IP adicional

## Backup y Recuperación

### Estrategia Actual
- **Boot Volume Backup:** Política automática semanal (7 días de retención)
- **Block Volume Backup:** Manual
- **Base de datos:** Mysqldump diario via cron
- **Código:** GitHub (repositorio privado)

### Ubicación de Backups
- Backups de volúmenes: Object Storage de OCI
- Backups de BD: Block Volume montado
- Código: GitHub

## Monitorización

### Herramientas
- **OCI Console:** Métricas básicas de instancia
- **Logs:** /var/log/ en la instancia
- **Application logs:** PM2 logs
- **Uptime monitoring:** Pendiente

## Seguridad

### Implementaciones Actuales
- Firewall: Security Lists de OCI
- SSH: Solo acceso con clave privada
- Aplicación: Variables de entorno para secrets
- HTTPS: Certificado SSL activo
- Base de datos: Solo acceso local (no expuesta)

### Pendientes de Mejora
- Implementar fail2ban
- Configurar WAF
- Auditoría de logs
- Escaneo de vulnerabilidades automatizado

## Costos

**Costo mensual actual:** €0.00 (Always Free Tier)

## Problemas Conocidos

1. **Recursos limitados:** 1 GB RAM puede ser insuficiente bajo alta carga
2. **Escalabilidad:** Arquitectura monolítica dificulta el escalado
3. **Alta disponibilidad:** Instancia única = SPOF (Single Point of Failure)
4. **Monitorización:** Falta de alertas proactivas
5. **Backups de BD:** No automatizados con retención adecuada

## Plan de Migración a V2

### Objetivos
1. Migrar a arquitectura de microservicios con Kubernetes (K3s)
2. Separar frontend, backend y base de datos
3. Implementar CI/CD con Argo CD
4. Mejorar monitorización con Grafana/Prometheus
5. Implementar backups automatizados con Velero
6. Configurar Cloudflare Tunnel para mayor seguridad

### Cronograma Estimado
- **Fase 1:** Preparación de infraestructura K3s (2 semanas)
- **Fase 2:** Migración de base de datos (1 semana)
- **Fase 3:** Despliegue de aplicación (1 semana)
- **Fase 4:** Pruebas y validación (1 semana)
- **Fase 5:** Switchover DNS (1 día)
- **Fase 6:** Monitorización post-migración (2 semanas)

## Contacto y Mantenimiento

- **Administrador:** [Tu nombre]
- **Última actualización:** 8 de febrero de 2026
- **Próxima revisión:** Tras migración a V2

## Referencias

- [Documentación OCI Always Free](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier.htm)
- [Documentación OCI Networking](https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/overview.htm)
- Repositorio V1: [Pendiente de enlazar]
- Repositorio V2: https://github.com/mikelapestegia/huellasdelnortev2

---

**Nota:** Este documento refleja el estado de la infraestructura V1 como base para la planificación de la V2. Debe actualizarse si se realizan cambios en V1 durante el proceso de migración.
