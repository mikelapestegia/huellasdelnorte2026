
# 🏗️ OCI Always Free Infrastructure - Documentación

## 📋 Resumen Ejecutivo

Esta documentación describe la configuración completa de una infraestructura en Oracle Cloud Infrastructure (OCI) bajo el tier Always Free, totalmente optimizada para alojar aplicaciones web, especialmente K3s (Kubernetes ligero).

**Fecha de configuración:** 18 de Febrero de 2026
**Región:** EU-Madrid-1 (España Central)
**Costo:** $0.00/mes ✅

---

## 🗂️ Tabla de Contenidos

1. [Arquitectura General](#arquitectura-general)
2. [Componentes de Red](#componentes-de-red)
3. [Instancias Compute](#instancias-compute)
4. [Almacenamiento](#almacenamiento)
5. [Load Balancer](#load-balancer)
6. [Acceso y Conexión](#acceso-y-conexión)
7. [Despliegue de Aplicaciones Web](#despliegue-de-aplicaciones-web)
8. [Security Groups](#security-groups)
9. [Monitoreo y Mantenimiento](#monitoreo-y-mantenimiento)
10. [Pasos Siguientes](#pasos-siguientes)

---

## 🏛️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                         INTERNET                            │
│                    143.47.37.202 (Pública)                  │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP/80
        ┌─────────────────▼─────────────────┐
        │   Load Balancer: k3s-load-balancer│
        │   - Público: 143.47.37.202        │
        │   - Protocolo: HTTP (Puerto 80)   │
        │   - Política: Round Robin         │
        │   - Ancho de banda: 10 Mbps       │
        └─────────────────┬─────────────────┘
                          │ 10.0.0.43:80
        ┌─────────────────▼────────────────────────────┐
        │      VCN: vcn-20260209-0201                  │
        │      CIDR: 10.0.0.0/16                       │
        │                                              │
        │  ┌──────────────────────────────────────┐   │
        │  │ Subnet: subnet-20260209-0201         │   │
        │  │ CIDR: 10.0.0.0/24                    │   │
        │  │                                      │   │
        │  │  ┌────────────────────────────────┐  │   │
        │  │  │ Instancia: ik3s-worker-2       │  │   │
        │  │  │ - Shape: VM.Standard.A1.Flex   │  │   │
        │  │  │ - vCPU: 1 (de 4 disponibles)   │  │   │
        │  │  │ - Memoria: 6GB (de 24GB)       │  │   │
        │  │  │ - IP Privada: 10.0.0.43        │  │   │
        │  │  │                                │  │   │
        │  │  │ ALMACENAMIENTO:                │  │   │
        │  │  │ ├─ Boot Volume: 50GB           │  │   │
        │  │  │ └─ Block Volume: 150GB (iSCSI)│  │   │
        │  │  │    Total: 200GB                │  │   │
        │  │  └────────────────────────────────┘  │   │
        │  │                                      │   │
        │  └──────────────────────────────────────┘   │
        │                                              │
        └──────────────────────────────────────────────┘
                          │
        ┌─────────────────▼──────────────────┐
        │   Object Storage (20GB Total)      │
        │                                    │
        │   ├─ ocidata-standard (10GB)      │
        │   │  └─ Almacenamiento estándar   │
        │   │                                │
        │   └─ ocidata-archive (10GB)       │
        │      └─ Acceso infrequente        │
        └────────────────────────────────────┘
```

---

## 🌐 Componentes de Red

### Virtual Cloud Network (VCN)

| Propiedad | Valor |
|-----------|-------|
| **Nombre** | vcn-20260209-0201 |
| **CIDR Block** | 10.0.0.0/16 |
| **Región** | eu-madrid-1 |
| **Estado** | Activa |
| **Always Free** | Sí ✅ |

### Subnet

| Propiedad | Valor |
|-----------|-------|
| **Nombre** | subnet-20260209-0201 |
| **VCN** | vcn-20260209-0201 |
| **CIDR Block** | 10.0.0.0/24 |
| **Tipo** | Pública |
| **Disponibilidad Dominio** | PmWx:EU-MADRID-1-AD-1 |
| **Rutas** | - 0.0.0.0/0 → Internet Gateway |
| **DHCP** | Activado |

### Rango de IPs Disponibles

```
Subnet CIDR: 10.0.0.0/24
Rango usable: 10.0.0.0 - 10.0.0.255

Reservadas por OCI:
- 10.0.0.0: Red
- 10.0.0.1: Gateway virtual
- 10.0.0.255: Broadcast

Disponibles para instancias: 10.0.0.2 - 10.0.0.254 (253 IPs)

Instancias actuales:
- 10.0.0.43: ik3s-worker-2 ✅
```

### Internet Gateway

| Propiedad | Valor |
|-----------|-------|
| **Función** | Conectar VCN a Internet |
| **Estado** | Activo |
| **Tráfico Entrante** | Permitido (HTTP/80) |
| **Tráfico Saliente** | Permitido |

---

## 💻 Instancias Compute

### Instancia Principal: `ik3s-worker-2`

#### Especificaciones

| Propiedad | Valor |
|-----------|-------|
| **Nombre** | ik3s-worker-2 |
| **Estado** | En ejecución (Running) ✅ |
| **Shape** | VM.Standard.A1.Flex |
| **Procesador** | ARM Ampere |
| **vCPUs** | 1 (de 4 disponibles en Always Free) |
| **Memoria RAM** | 6GB (de 24GB disponibles en Always Free) |
| **Región** | eu-madrid-1 |
| **Dominio de Disponibilidad** | PmWx:EU-MADRID-1-AD-1 |
| **Dominio de Errores** | FD-3 |
| **Creación** | 18 feb 2026, 14:00:49 UTC |
| **Always Free** | Sí ✅ |

#### Networking

| Propiedad | Valor |
|-----------|-------|
| **VCN** | vcn-20260209-0201 |
| **Subnet** | subnet-20260209-0201 |
| **IP Privada** | 10.0.0.43 |
| **IP Pública** | (Asignada dinámicamente si es necesaria) |
| **Security Group** | default |

#### Imagen del Sistema Operativo

| Propiedad | Valor |
|-----------|-------|
| **SO** | Oracle Linux 9 |
| **Versión** | 2026.01.29-0 |
| **Arquitectura** | ARM64 |
| **Licencia** | Gratuita |

---

## 💾 Almacenamiento

### Boot Volume

| Propiedad | Valor |
|-----------|-------|
| **Nombre** | ik3s-worker-2 (automático) |
| **Tamaño** | 50 GB |
| **Tipo** | Block Storage |
| **Performance** | Balanced (10 VPU/GB) |
| **Encriptación** | Gestionada por Oracle ✅ |
| **Backups** | 0 (0/5 disponibles) |
| **Estado** | Disponible |

### Block Volume Adjunto

| Propiedad | Valor |
|-----------|-------|
| **Nombre** | data-volume-150gb |
| **Tamaño** | 150 GB |
| **Tipo** | Block Storage |
| **Performance** | Balanced (10 VPU/GB) |
| **Asociación** | iSCSI |
| **Instancia** | ik3s-worker-2 (10.0.0.43) |
| **Puerto iSCSI** | 3260 |
| **Acceso** | Lectura/Escritura (compartible) |
| **Estado** | Asociado ✅ |
| **Encriptación** | Gestionada por Oracle ✅ |

### Almacenamiento Total en Instancia

```
Boot Volume:    50GB
Block Volume:  150GB
─────────────────────
TOTAL:        200GB ✅ (100% del Always Free)
```

### Object Storage

#### Bucket 1: `ocidata-standard`

| Propiedad | Valor |
|-----------|-------|
| **Nombre** | ocidata-standard |
| **Clase de Almacenamiento** | Standard |
| **Cuota** | 10 GB |
| **Región** | eu-madrid-1 |
| **Visibilidad** | Privado |
| **Cifrado** | Sí ✅ |
| **Uso Recomendado** | Datos frecuentes, backups activos |

#### Bucket 2: `ocidata-archive`

| Propiedad | Valor |
|-----------|-------|
| **Nombre** | ocidata-archive |
| **Clase de Almacenamiento** | Archive |
| **Cuota** | 10 GB |
| **Región** | eu-madrid-1 |
| **Visibilidad** | Privado |
| **Cifrado** | Sí ✅ |
| **Uso Recomendado** | Archivos antiguos, backups históricos |

### Almacenamiento de Objetos Total

```
Standard:  10GB
Archive:   10GB
─────────────────
TOTAL:    20GB ✅ (100% del Always Free)
```

---

## 🔀 Load Balancer

### Configuración General

| Propiedad | Valor |
|-----------|-------|
| **Nombre** | k3s-load-balancer |
| **Estado** | Activo ✅ |
| **Tipo** | Public Load Balancer (Layer 4/7) |
| **Región** | eu-madrid-1 |
| **Disponibilidad Dominio** | Múltiples (Regional) |
| **Creación** | 18 feb 2026, 14:20:12 UTC |
| **Always Free** | Sí ✅ |

### Networking

| Propiedad | Valor |
|-----------|-------|
| **VCN** | vcn-20260209-0201 |
| **Subnet** | subnet-20260209-0201 |
| **IP Pública** | **143.47.37.202** |
| **Tipo de IP Pública** | Efímera |
| **Ancho de Banda Mínimo** | 10 Mbps |
| **Ancho de Banda Máximo** | 10 Mbps |

### Listener

| Propiedad | Valor |
|-----------|-------|
| **Nombre** | listener_lb_2026-0218-1516 |
| **Protocolo** | HTTP |
| **Puerto** | 80 |
| **Tipo de Tráfico** | HTTP |
| **SSL/TLS** | No requerido |

### Backend Set (Juego de Backends)

| Propiedad | Valor |
|-----------|-------|
| **Política de Equilibrio** | Asignación en Rueda Ponderada (Round Robin) |
| **Backends** | 1 |
| **Backend Activo** | ik3s-worker-2 (10.0.0.43:80) |

### Health Check

| Propiedad | Valor |
|-----------|-------|
| **Protocolo** | HTTP |
| **Puerto** | 80 |
| **Ruta** | / |
| **Intervalo** | 10 segundos |
| **Timeout** | 3 segundos |
| **Reintentos Sanos** | 3 |
| **Reintentos No Sanos** | 3 |

### Logging

| Propiedad | Valor |
|-----------|-------|
| **Logs de Acceso** | No activados |
| **Logs de Error** | Activados ✅ |
| **Grupo de Logs** | Creado automáticamente |
| **Nombre de Log** | lb_2026-0218-1516_error |

---

## 🌍 Acceso y Conexión

### Acceso a tu Aplicación Web

```
URL Pública: http://143.47.37.202
Puerto: 80 (HTTP)
Protocolo: HTTP
```

### Arquitectura de Acceso

```
Cliente en Internet
         │
         │ HTTP (Puerto 80)
         ▼
143.47.37.202 (IP Pública del Load Balancer)
         │
         │ Reenvío interno
         ▼
10.0.0.43:80 (Instancia ik3s-worker-2 - IP Privada)
         │
         │ Localhost (127.0.0.1:80 o :3000, etc.)
         ▼
Tu Aplicación Web (K3s/Docker)
```

### Conectar via SSH
