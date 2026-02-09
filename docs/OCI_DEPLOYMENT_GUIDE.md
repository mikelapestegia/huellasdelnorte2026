# Despliegue del Proyecto Web en Oracle Cloud Infrastructure (OCI)

## Requisitos Previos

1. Cuenta activa en Oracle Cloud Infrastructure
2. CLI de OCI instalado y configurado (`oci`)
3. Claves de API configuradas para autenticación
4. Comprensión básica de contenedores Docker y servicios OCI

## Opciones de Despliegue

### Opción 1: Oracle Functions (Serverless)

#### Paso 1: Preparar el proyecto para despliegue

1. Crear un archivo `Dockerfile` en el directorio raíz del proyecto web:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a54ddd653f8889d2793c8#nodealpine to understand why libc6-compat might be needed
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Disable telemetry collection
RUN npx next telemetry disable

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.mjs if you are NOT using the default configuration
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./


USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
```

2. Crear un archivo `.dockerignore`:

```
Dockerfile
.dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.nyc_output
.coverage
.next
out
dist
build
```

#### Paso 2: Configurar Oracle Functions

1. Crear un repositorio de contenedores en OCI Registry:

```bash
# Crear un repositorio para la aplicación
oci artifacts container repository create --compartment-id <compartment-ocid> --display-name huellasdelnorte-web --is-public false
```

2. Etiquetar y subir la imagen Docker:

```bash
# Obtener la URL del repositorio
export REPO_URL=<region>.ocir.io/<namespace>/huellasdelnorte-web

# Etiquetar la imagen
docker build -t $REPO_URL:latest .

# Autenticarse en OCI Registry
docker login <region>.ocir.io

# Subir la imagen
docker push $REPO_URL:latest
```

#### Paso 3: Crear la función

```bash
# Crear una función en OCI
oci fn application create --name huellasdelnorte-app --compartment-id <compartment-ocid>

# Crear una función dentro de la aplicación
oci fn function create --application-name huellasdelnorte-app --name web-function --image $REPO_URL:latest --memory-in-mbs 512
```

### Opción 2: Oracle Container Engine for Kubernetes (OKE)

#### Paso 1: Preparar el clúster OKE

1. Crear un clúster OKE desde la consola de OCI o con CLI:

```bash
oci ce cluster create --name huellasdelnorte-cluster --kubernetes-version v1.28.2 --vcn-id <vcn-ocid> --service-lb-subnet-ids '["<subnet-ocid>"]' --compartment-id <compartment-ocid>
```

2. Configurar kubectl para conectarse al clúster:

```bash
oci ce cluster create-kubeconfig --cluster-id <cluster-ocid> --file $HOME/.kube/config --region <region>
```

#### Paso 2: Desplegar la aplicación en OKE

1. Crear un archivo `deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: huellasdelnorte-web
  labels:
    app: huellasdelnorte-web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: huellasdelnorte-web
  template:
    metadata:
      labels:
        app: huellasdelnorte-web
    spec:
      containers:
      - name: web
        image: <region>.ocir.io/<namespace>/huellasdelnorte-web:latest
        ports:
        - containerPort: 3000
        env:
        - name: PORT
          value: "3000"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: huellasdelnorte-web-service
spec:
  selector:
    app: huellasdelnorte-web
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: huellasdelnorte-web-ingress
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
  - host: <tu-dominio>.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: huellasdelnorte-web-service
            port:
              number: 80
```

2. Aplicar la configuración:

```bash
kubectl apply -f deployment.yaml
```

### Opción 3: Oracle Cloud Compute Instances

#### Paso 1: Crear una instancia de compute

1. Crear una instancia de compute desde la consola de OCI con Ubuntu 22.04 o CentOS Stream 9

2. Conectarse a la instancia:

```bash
ssh -i <clave-privada> opc@<ip-instancia>
```

#### Paso 2: Configurar la instancia

1. Instalar Docker:

```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

2. Instalar Node.js y npm:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Clonar el repositorio y desplegar:

```bash
git clone <url-repositorio>
cd huellasdelnorte/web
npm install
npm run build
npm start
```

4. Configurar PM2 para mantener la aplicación en ejecución:

```bash
npm install -g pm2
pm2 start "npm start" --name "huellasdelnorte-web"
pm2 startup
pm2 save
```

## Configuración de Base de Datos

El proyecto también incluye un directorio de base de datos. Para desplegarlo en OCI:

1. Utilizar Autonomous Database (ADB) para la capa de datos
2. Configurar las credenciales y variables de entorno
3. Ejecutar los scripts de inicialización desde el directorio `/database/seed`

## Configuración de Cloudflare Tunnel

El proyecto incluye un archivo de configuración de Cloudflare Tunnel (`terraform/cloudflare_tunnel.tf`) que ya está configurado para enrutar el tráfico hacia la aplicación.

## Recomendaciones de Seguridad

1. Utilizar políticas de IAM para restringir permisos
2. Configurar redes privadas para los recursos sensibles
3. Habilitar el cifrado en reposo y en tránsito
4. Utilizar Vault para la gestión de secretos
5. Configurar WAF si se usa Application Load Balancer

## Monitoreo y Logs

1. Utilizar OCI Logging para recopilar logs
2. Configurar OCI Monitoring para métricas
3. Integrar con OCI Events para alertas

## Costos Estimados

- Oracle Cloud Free Tier: $200 de crédito por 30 días + recursos gratuitos perpetuos
- Compute Instance (VM.Standard.E4.Flex): Aprox. $0.096/hora (1 CPU, 8GB RAM)
- Autonomous Database: Aprox. $0.026/hora (2 OCPU, 40GB storage)
- Load Balancer: Aprox. $0.058/hora
- Storage: Aprox. $0.023/GB/mes

## Scripts de Automatización

Para automatizar el despliegue, se puede crear un script de CI/CD con GitHub Actions o GitLab CI que:

1. Construya la imagen Docker
2. Suba la imagen a OCI Registry
3. Actualice el despliegue en OKE o Functions
4. Ejecute pruebas de integración
5. Realice despliegue blue-green si es necesario