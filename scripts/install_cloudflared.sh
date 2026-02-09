#!/bin/bash
# ============================================================================
# CLOUDFLARED INSTALLATION SCRIPT - ARM64 Architecture
# HuellasdeLnorte V2 - Cloudflare Tunnel Setup
# ============================================================================

set -e  # Exit on error

# Debug trace opcional (evitar exposición accidental en logs)
if [ "${DEBUG_CLOUDFLARED_INSTALL:-false}" = "true" ]; then
  set -x
fi

LOGFILE="/var/log/install_cloudflared.log"
exec > >(tee -a $LOGFILE)
exec 2>&1

echo "[$(date)] ========================================"
echo "[$(date)] CLOUDFLARED INSTALLATION STARTED"
echo "[$(date)] ========================================"

# ============================================================================
# 1. DETECT ARCHITECTURE
# ============================================================================

ARCH=$(uname -m)
echo "[$(date)] Detected architecture: $ARCH"

if [ "$ARCH" != "aarch64" ]; then
    echo "[$(date)] WARNING: This script is optimized for ARM64 (aarch64)"
    echo "[$(date)] Current architecture: $ARCH"
fi

# ============================================================================
# 2. INSTALL CLOUDFLARED
# ============================================================================

echo "[$(date)] Step 1: Installing Cloudflared for ARM64..."

# Download cloudflared for ARM64
cd /tmp
curl --fail --show-error --silent --location --proto '=https' --tlsv1.2 \
  -o cloudflared-linux-arm64 \
  https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64

# Verificación opcional de integridad (recomendado en CI)
if [ -n "${CLOUDFLARED_SHA256:-}" ]; then
  echo "${CLOUDFLARED_SHA256}  cloudflared-linux-arm64" | sha256sum -c -
fi

# Make it executable and move to system path
sudo chmod +x cloudflared-linux-arm64
sudo mv cloudflared-linux-arm64 /usr/local/bin/cloudflared

# Verify installation
cloudflared --version

echo "[$(date)] Cloudflared installed successfully"

# ============================================================================
# 3. CREATE SERVICE USER
# ============================================================================

echo "[$(date)] Step 2: Creating cloudflared service user..."

if ! id -u cloudflared > /dev/null 2>&1; then
    sudo useradd -r -s /bin/false -d /opt/cloudflared cloudflared
    echo "[$(date)] User 'cloudflared' created"
else
    echo "[$(date)] User 'cloudflared' already exists"
fi

# ============================================================================
# 4. CREATE DIRECTORIES
# ============================================================================

echo "[$(date)] Step 3: Creating directories..."

sudo mkdir -p /opt/cloudflared
sudo mkdir -p /etc/cloudflared
sudo mkdir -p /var/log/cloudflared

sudo chown cloudflared:cloudflared /opt/cloudflared
sudo chown cloudflared:cloudflared /etc/cloudflared
sudo chown cloudflared:cloudflared /var/log/cloudflared

echo "[$(date)] Directories created"

# ============================================================================
# 5. CREATE TUNNEL CONFIGURATION
# ============================================================================

echo "[$(date)] Step 4: Creating tunnel configuration template..."

cat <<'EOF' | sudo tee /etc/cloudflared/config.yml.example
# Cloudflare Tunnel Configuration
# Replace values with your actual credentials

tunnel: YOUR_TUNNEL_ID
credentials-file: /etc/cloudflared/credentials.json

ingress:
  # Backend API (K3s service)
  - hostname: api.huellasdelnorte.com
    service: http://localhost:30080
  
  # Frontend (K3s service)
  - hostname: app.huellasdelnorte.com
    service: http://localhost:30081
  
  # Catch-all rule (required)
  - service: http_status:404
EOF

sudo chown cloudflared:cloudflared /etc/cloudflared/config.yml.example

echo "[$(date)] Configuration template created at /etc/cloudflared/config.yml.example"
echo "[$(date)] IMPORTANT: Copy this to config.yml and add your tunnel credentials"

# ============================================================================
# 6. CREATE SYSTEMD SERVICE
# ============================================================================

echo "[$(date)] Step 5: Creating systemd service..."

cat <<'EOF' | sudo tee /etc/systemd/system/cloudflared.service
[Unit]
Description=Cloudflare Tunnel
After=network.target

[Service]
Type=simple
User=cloudflared
Group=cloudflared
ExecStart=/usr/local/bin/cloudflared tunnel --config /etc/cloudflared/config.yml run
Restart=always
RestartSec=10
StandardOutput=append:/var/log/cloudflared/cloudflared.log
StandardError=append:/var/log/cloudflared/cloudflared.log

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload

echo "[$(date)] Systemd service created"
echo "[$(date)] To enable: sudo systemctl enable cloudflared"
echo "[$(date)] To start: sudo systemctl start cloudflared"

# ============================================================================
# 7. CREATE CREDENTIALS TEMPLATE
# ============================================================================

echo "[$(date)] Step 6: Creating credentials template..."

cat <<'EOF' | sudo tee /etc/cloudflared/credentials.json.example
{
  "AccountTag": "YOUR_ACCOUNT_ID",
  "TunnelSecret": "YOUR_TUNNEL_SECRET",
  "TunnelID": "YOUR_TUNNEL_ID",
  "TunnelName": "huellasdelnorte-tunnel"
}
EOF

sudo chown cloudflared:cloudflared /etc/cloudflared/credentials.json.example

echo "[$(date)] Credentials template created"
echo "[$(date)] SECURITY: Never commit credentials.json to Git!"

# ============================================================================
# 8. FIREWALL CONFIGURATION
# ============================================================================

echo "[$(date)] Step 7: Configuring firewall..."

if command -v firewall-cmd &> /dev/null; then
    # Cloudflared connects outbound only, no inbound ports needed
    echo "[$(date)] Firewall detected: No inbound rules needed for Cloudflared"
    echo "[$(date)] Cloudflared uses outbound connections to Cloudflare"
else
    echo "[$(date)] No firewall detected"
fi

# ============================================================================
# 9. SETUP INSTRUCTIONS
# ============================================================================

echo "[$(date)] ========================================"
echo "[$(date)] CLOUDFLARED INSTALLATION COMPLETED"
echo "[$(date)] ========================================"
echo ""
echo "NEXT STEPS:"
echo ""
echo "1. Create a Cloudflare Tunnel (if not already done):"
echo "   cloudflared tunnel login"
echo "   cloudflared tunnel create huellasdelnorte-tunnel"
echo ""
echo "2. Copy tunnel credentials:"
echo "   sudo cp ~/.cloudflared/<tunnel-id>.json /etc/cloudflared/credentials.json"
echo "   sudo chown cloudflared:cloudflared /etc/cloudflared/credentials.json"
echo "   sudo chmod 600 /etc/cloudflared/credentials.json"
echo ""
echo "3. Configure the tunnel:"
echo "   sudo cp /etc/cloudflared/config.yml.example /etc/cloudflared/config.yml"
echo "   sudo nano /etc/cloudflared/config.yml"
echo "   # Update with your tunnel ID and hostnames"
echo ""
echo "4. Route DNS to tunnel:"
echo "   cloudflared tunnel route dns huellasdelnorte-tunnel api.huellasdelnorte.com"
echo "   cloudflared tunnel route dns huellasdelnorte-tunnel app.huellasdelnorte.com"
echo ""
echo "5. Enable and start service:"
echo "   sudo systemctl enable cloudflared"
echo "   sudo systemctl start cloudflared"
echo "   sudo systemctl status cloudflared"
echo ""
echo "6. Check logs:"
echo "   sudo journalctl -u cloudflared -f"
echo "   tail -f /var/log/cloudflared/cloudflared.log"
echo ""
echo "Configuration files:"
echo "  - /etc/cloudflared/config.yml (main config)"
echo "  - /etc/cloudflared/credentials.json (tunnel credentials)"
echo "  - /var/log/cloudflared/ (logs directory)"
echo ""
echo "[$(date)] ========================================"

# Create completion marker
sudo touch /var/lib/cloud/instance/cloudflared-install-complete
echo "[$(date)] Installation marker created at /var/lib/cloud/instance/cloudflared-install-complete"
