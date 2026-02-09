#!/bin/bash
# ============================================================================
# BOOTSTRAP SCRIPT - Oracle Linux 8 ARM Instance
# HuellasdelNorte V2 - Inicialización automática
# ============================================================================

set -e  # Exit on error

# Debug trace opcional (evitar exposición accidental en logs)
if [ "${DEBUG_BOOTSTRAP:-false}" = "true" ]; then
  set -x
fi

LOGFILE="/var/log/bootstrap_node.log"
exec > >(tee -a $LOGFILE)
exec 2>&1

echo "[$(date)] ========================================"
echo "[$(date)] BOOTSTRAP STARTED"
echo "[$(date)] ========================================"

# ============================================================================
# 1. SYSTEM UPDATE
# ============================================================================
echo "[$(date)] Step 1: Updating system packages..."
sudo dnf update -y
sudo dnf upgrade -y

# ============================================================================
# 2. INSTALL ESSENTIAL PACKAGES
# ============================================================================
echo "[$(date)] Step 2: Installing essential packages..."
sudo dnf install -y \
    curl \
    wget \
    git \
    vim \
    htop \
    net-tools \
    bind-utils \
    telnet \
    nc \
    jq \
    unzip \
    tar \
    gzip \
    openssl \
    ca-certificates

# ============================================================================
# 3. FIREWALL CONFIGURATION
# ============================================================================
echo "[$(date)] Step 3: Configuring firewall..."
sudo systemctl enable firewalld
sudo systemctl start firewalld

# Open necessary ports
sudo firewall-cmd --permanent --add-port=22/tcp    # SSH
sudo firewall-cmd --permanent --add-port=80/tcp    # HTTP
sudo firewall-cmd --permanent --add-port=443/tcp   # HTTPS
sudo firewall-cmd --reload

echo "[$(date)] Firewall rules applied"

# ============================================================================
# 4. CONFIGURE TIMEZONE
# ============================================================================
echo "[$(date)] Step 4: Setting timezone to Europe/Madrid..."
sudo timedatectl set-timezone Europe/Madrid
echo "Current time: $(date)"

# ============================================================================
# 5. INSTALL DOCKER (for future use)
# ============================================================================
echo "[$(date)] Step 5: Installing Docker..."
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io
sudo systemctl enable docker
sudo systemctl start docker

# Add opc user to docker group
sudo usermod -aG docker opc

echo "[$(date)] Docker installed: $(docker --version)"

# ============================================================================
# 6. INSTALL DOCKER COMPOSE
# ============================================================================
echo "[$(date)] Step 6: Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
echo "[$(date)] Docker Compose installed: $(docker-compose --version)"

# ============================================================================
# 7. SETUP SWAP (Opcional para instancias con poca RAM)
# ============================================================================
echo "[$(date)] Step 7: Configuring swap space..."
if [ ! -f /swapfile ]; then
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    echo "[$(date)] Swap configured: $(free -h | grep Swap)"
else
    echo "[$(date)] Swap already exists"
fi

# ============================================================================
# 8. CONFIGURE SSH
# ============================================================================
echo "[$(date)] Step 8: Hardening SSH configuration..."
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

# Security improvements
sudo sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart sshd

echo "[$(date)] SSH hardened"

# ============================================================================
# 9. CREATE APPLICATION DIRECTORIES
# ============================================================================
echo "[$(date)] Step 9: Creating application directories..."
sudo mkdir -p /opt/huellasdelnorte
sudo mkdir -p /opt/huellasdelnorte/{app,data,logs,backups}
sudo chown -R opc:opc /opt/huellasdelnorte
echo "[$(date)] Directories created"

# ============================================================================
# 10. INSTALL NODE.JS (if needed for frontend)
# ============================================================================
echo "[$(date)] Step 10: Installing Node.js..."
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs
echo "[$(date)] Node.js installed: $(node --version)"
echo "[$(date)] npm installed: $(npm --version)"

# ============================================================================
# 11. SYSTEM MONITORING SETUP (Prometheus + Grafana)
# ============================================================================
echo "[$(date)] Step 11: Setting up Prometheus & Grafana stack..."

MONITORING_DIR="/opt/huellasdelnorte/monitoring"
sudo mkdir -p $MONITORING_DIR/prometheus
sudo mkdir -p $MONITORING_DIR/grafana
sudo chown -R opc:docker $MONITORING_DIR
sudo chmod -R 770 $MONITORING_DIR

# 11.1 Create Prometheus Config
echo "[$(date)] Creating Prometheus configuration..."
cat << 'EOF' | sudo tee $MONITORING_DIR/prometheus/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['node-exporter:9100']
  
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
EOF

# 11.2 Create Docker Compose for Monitoring
echo "[$(date)] Creating Docker Compose for monitoring..."
cat << 'EOF' | sudo tee $MONITORING_DIR/docker-compose.yml
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    restart: unless-stopped
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--web.enable-lifecycle'
    expose:
      - 9090
    networks:
      - monitoring

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node_exporter
    restart: unless-stopped
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    expose:
      - 9100
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    restart: unless-stopped
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_USER=${GRAFANA_ADMIN_USER:-admin}
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_ADMIN_PASSWORD:?ERROR: Set GRAFANA_ADMIN_PASSWORD env var before deploying}
      - GF_USERS_ALLOW_SIGN_UP=false
    ports:
      - "3000:3000"
    networks:
      - monitoring

networks:
  monitoring:
    driver: bridge

volumes:
  prometheus_data:
  grafana_data:
EOF

# 11.3 Start Monitoring Stack
echo "[$(date)] Starting monitoring stack..."
cd $MONITORING_DIR
sudo /usr/local/bin/docker-compose up -d

# 11.4 Grafana access via Cloudflare Tunnel only (no direct port exposure)
# To access Grafana, configure a Cloudflare Tunnel ingress rule instead.
# sudo firewall-cmd --permanent --add-port=3000/tcp  # REMOVED for security
# sudo firewall-cmd --reload

echo "[$(date)] Monitoring stack deployed. Access Grafana via Cloudflare Tunnel only."


# ============================================================================
# 12. SETUP AUTOMATIC UPDATES (Security patches)
# ============================================================================
echo "[$(date)] Step 12: Configuring automatic security updates..."
sudo dnf install -y dnf-automatic
sudo sed -i 's/apply_updates = no/apply_updates = yes/' /etc/dnf/automatic.conf
sudo systemctl enable --now dnf-automatic.timer
echo "[$(date)] Automatic updates enabled"

# ============================================================================
# 13. MOTD (Message of the Day)
# ============================================================================
echo "[$(date)] Step 13: Creating custom MOTD..."
cat << 'EOF' | sudo tee /etc/motd

========================================
  HUELLASDELNORTE V2 - ARM INSTANCE
========================================

Hostname: $(hostname)
IP Address: $(hostname -I | awk '{print $1}')
OS: Oracle Linux 8 (ARM)

Application Directory: /opt/huellasdelnorte
Logs: /var/log/bootstrap_node.log

Run 'system_health.sh' for health check

========================================
EOF

# ============================================================================
# 14. FINAL CLEANUP
# ============================================================================
echo "[$(date)] Step 14: Cleaning up..."
sudo dnf clean all
sudo journalctl --vacuum-time=7d

# ============================================================================
# BOOTSTRAP COMPLETED
# ============================================================================
echo "[$(date)] ========================================"
echo "[$(date)] BOOTSTRAP COMPLETED SUCCESSFULLY"
echo "[$(date)] ========================================"
echo "[$(date)] System ready for deployment!"
echo "[$(date)] Next steps:"
echo "[$(date)]   1. Install Cloudflare Tunnel: /opt/huellasdelnorte/scripts/install_cloudflared.sh"
echo "[$(date)]   2. Deploy application"
echo "[$(date)]   3. Configure monitoring"
echo "[$(date)] ========================================"

# Create completion marker
sudo touch /var/lib/cloud/instance/bootstrap-complete
echo "[$(date)] Bootstrap marker created at /var/lib/cloud/instance/bootstrap-complete"
