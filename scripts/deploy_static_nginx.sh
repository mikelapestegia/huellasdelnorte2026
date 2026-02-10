#!/bin/bash
# Deploy static Next.js build with nginx
# For Huellas del Norte 2026

set -e

echo "========================================"
echo "Huellas del Norte - Static Deployment"
echo "========================================"

# Configuration
REPO_DIR="/home/opc/huellasdelnorte2026"
WEB_DIR="$REPO_DIR/web"
OUT_DIR="$WEB_DIR/out"
NGINX_ROOT="/usr/share/nginx/html"

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

echo -e "${YELLOW}[3/6]${NC} Building static site..."
npm run build

if [ ! -d "$OUT_DIR" ]; then
    echo -e "${RED}Error: Build output directory not found${NC}"
    exit 1
fi

echo -e "${YELLOW}[4/6]${NC} Configuring nginx..."

# Create nginx config
sudo tee /etc/nginx/conf.d/huellas.conf > /dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name _;
    
    root /home/opc/huellasdelnorte2026/web/out;
    index index.html;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Next.js static files
    location /_next/static/ {
        alias /home/opc/huellasdelnorte2026/web/out/_next/static/;
        expires 1y;
        access_log off;
        add_header Cache-Control "public, immutable";
    }
    
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

echo -e "${YELLOW}[5/6]${NC} Testing nginx configuration..."
sudo nginx -t

echo -e "${YELLOW}[6/6]${NC} Restarting nginx..."
sudo systemctl restart nginx

echo -e "${GREEN}✓ Deployment completed successfully!${NC}"
echo "Site is now live at http://143.47.39.237"
echo "DNS: huellasdelnorte.com"
