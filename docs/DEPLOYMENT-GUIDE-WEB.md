# Web Deployment Guide - Huellas del Norte V2

## Overview

This guide outlines the deployment process for the Huellas del Norte V2 Next.js web application on the OCI instance `ik3s-worker` with Cloudflare integration for DNS, DDoS protection, and reverse proxy (Tunnel).

## Architecture

```
┌─────────────────┐
│   Domain        │
│ www.huellasdel   │
│ norte.com       │
└────────┬────────┘
         │
         v
┌──────────────────────┐
│  Cloudflare          │
│  - DNS (A record)    │
│  - DDoS Protection   │
│  - Tunnel (optional) │
└────────┬─────────────┘
         │
         v
┌──────────────────────────────────┐
│  OCI Instance: ik3s-worker       │
│  - IP: 10.0.0.221                │
│  - Port: 3000 (Next.js app)      │
│  - Port: 3001 (API)              │
│  - Reverse proxy: nginx/caddy    │
└──────────────────────────────────┘
```

## Prerequisites

- OCI Instance: `ik3s-worker` (ARM-based, 4 OCPUs, 24GB RAM)
- SSH access to the instance
- Node.js 18+ and npm installed
- PM2 for process management
- Cloudflare account with domain configured

## Deployment Steps

### 1. SSH into the OCI Instance

```bash
ssh -i your-ssh-key.pem ubuntu@10.0.0.221
```

### 2. Clone/Update the Repository

```bash
cd /opt
sudo git clone https://github.com/mikelapestegia/huellasdelnorte2026.git
cd huellasdelnorte2026
```

### 3. Run the Deployment Script

```bash
cd scripts
chmod +x deploy_web_oci.sh
./deploy_web_oci.sh
```

### 4. Verify the Deployment

```bash
# Check if the application is running
pm2 list

# Check logs
pm2 logs huellas-web

# Test local access
curl http://localhost:3000
```

### 5. Configure Cloudflare DNS

1. Log in to Cloudflare dashboard
2. Go to huellasdelnorte.com > DNS Records
3. Create/Update A record:
   - Name: www
   - Value: YOUR_OCI_PUBLIC_IP
   - TTL: Auto
   - Proxied: Yes (Orange Cloud)

### 6. Configure Reverse Proxy (Optional)

Use Nginx or Caddy to handle SSL and reverse proxy:

```nginx
server {
    listen 80;
    server_name www.huellasdelnorte.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 7. Set Up Cloudflare Tunnel (Optional for Private Access)

If the instance doesn't have a public IP:

```bash
# Install cloudflared
./scripts/install_cloudflared.sh

# Create tunnel configuration
cloudflared tunnel create huellas-web

# Configure routing
cloudflared tunnel route dns huellas-web www.huellasdelnorte.com

# Start the tunnel
cloudflared tunnel run huellas-web
```

## Environment Variables

Create `.env.production` in the web directory:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.huellasdelnorte.com
```

## Monitoring and Maintenance

### Check Application Status

```bash
pm2 status
pm2 monit  # Real-time monitoring
```

### View Logs

```bash
pm2 logs huellas-web
pm2 logs huellas-web --lines 100
pm2 logs huellas-web --err  # Error logs only
```

### Restart Application

```bash
pm2 restart huellas-web
pm2 reload huellas-web  # Graceful reload
```

### Stop/Start Application

```bash
pm2 stop huellas-web
pm2 start huellas-web
```

## Rollback Procedures

See `ROLLBACK_PROCEDURES.md` for detailed rollback steps if deployment fails.

## Security Considerations

1. **HTTPS**: Cloudflare provides free SSL/TLS certificates
2. **DDoS Protection**: Enabled via Cloudflare
3. **Rate Limiting**: Configure in Cloudflare Rules
4. **API Security**: Use API tokens and environment variables
5. **Access Control**: Restrict SSH to known IPs

## Troubleshooting

### Application won't start

```bash
# Check Node version
node --version

# Check npm dependencies
cd /opt/huellas-web
npm install --production
```

### Port already in use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process if needed
kill -9 <PID>
```

### DNS not resolving

```bash
# Check DNS propagation
nslookup www.huellasdelnorte.com
dig www.huellasdelnorte.com
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [PM2 Documentation](https://pm2.keymetrics.io/docs)
- [Cloudflare DNS Guide](https://developers.cloudflare.com/dns/)
- [OCI Instance Access](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeinstances.htm)
