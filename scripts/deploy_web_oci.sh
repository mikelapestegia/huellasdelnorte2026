#!/bin/bash
# Deployment script for Huellas del Norte V2 web app on OCI
# Deploys Next.js with nginx reverse proxy

set -e

echo "====================================="
echo "Huellas del Norte V2 - Web Deployment"
echo "====================================="

# Configuration
REPO_DIR="/home/opc/huellasdelnorte2026"
WEB_DIR="$REPO_DIR/web"
PORT=3000

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}[1/6]${NC} Updating repository..."
cd "$REPO_DIR"
git pull origin main

echo -e "${YELLOW}[2/6]${NC} Installing dependencies..."
cd "$WEB_DIR"
npm install

echo -e "${YELLOW}[3/6]${NC} Building Next.js application..."
NODE_ENV=production npm run build

echo -e "${YELLOW}[4/6]${NC} Configuring nginx reverse proxy..."

# Create nginx config
sudo tee /etc/nginx/conf.d/huellas.conf > /dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name _;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

echo -e "${YELLOW}[5/6]${NC} Starting Next.js with PM2..."
cd "$WEB_DIR"
pm2 delete huellas-web 2>/dev/null || true
NODE_ENV=production pm2 start npm --name "huellas-web" -- start
pm2 save

echo -e "${YELLOW}[6/6]${NC} Restarting nginx..."
sudo nginx -t
sudo systemctl restart nginx

echo -e "${GREEN}✓ Deployment completed successfully!${NC}"
echo "Application running at: http://143.47.39.237"
echo "Domain: http://huellasdelnorte.com"
echo ""
echo "To view logs: pm2 logs huellas-web"
echo "To restart: pm2 restart huellas-web"
