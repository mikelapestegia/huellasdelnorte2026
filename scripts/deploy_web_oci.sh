#!/bin/bash
# Deployment script for Huellas del Norte V2 web app on OCI
# Deploys Next.js application to ik3s-worker instance

set -e

echo "====================================="
echo "Huellas del Norte V2 - Web Deployment"
echo "====================================="

# Configuration
NODE_ENV="production"
APP_DIR="/opt/huellas-web"
PORT=3000
API_PORT=3001

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}[1/5]${NC} Stopping existing application..."
sudo systemctl stop huellas-web || true

echo -e "${YELLOW}[2/5]${NC} Creating application directory..."
sudo mkdir -p "$APP_DIR"
sudo chown -R $USER:$USER "$APP_DIR"

echo -e "${YELLOW}[3/5]${NC} Installing dependencies..."
cd "$APP_DIR"
npm install --production

echo -e "${YELLOW}[4/5]${NC} Building Next.js application..."
RUNTIME_ENV=production npm run build

echo -e "${YELLOW}[5/5]${NC} Starting application with PM2..."
pm2 start "npm run start" --name "huellas-web" --env production
pm2 save
pm2 startup

echo -e "${GREEN}✓ Deployment completed successfully!${NC}"
echo "Application is running on port $PORT"
echo "Configure Cloudflare Tunnel to point to localhost:$PORT"
