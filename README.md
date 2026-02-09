# HuellasdelNorte V2 — huellasdelnorte2026

## System Architecture Overview

This documentation outlines the architecture for deploying a single 200GB ARM instance for the application **Huellas del Norte V2**. The architecture focuses on scalability, security, and ease of access.

## Instance Specifications
- **Instance Type**: ARM-based instance (VM.Standard.A1.Flex)
- **Storage**: 200GB SSD
- **OCPUs**: 4
- **Memory**: 24GB

## Cloudflare Integration
- **DNS Management**: The domain is managed through Cloudflare for enhanced security and performance.
- **CDN Configuration**: Utilize Cloudflare's CDN to deliver static content efficiently.
- **Security Features**: Enable Cloudflare's security features, such as DDoS protection and Web Application Firewall (WAF).
- **Frontend**: Deployed via Cloudflare Pages (automatic on `git push`)
- **Backend**: Accessible via Cloudflare Tunnel (`api.huellasdelnorte.com`)

## SSH Access Using Remmina
- **Remmina Configuration**: 
  - Open Remmina and create a new SSH connection.
  - Enter the **hostname** (e.g., `your-instance-ip`), **username**, and set the **SSH port** to 22.
  - Use SSH key authentication for increased security.
- **Connecting**: Simply click on the saved SSH connection in Remmina to access the instance securely.

## Application Development

For frontend development guidelines, setup, and design standards, please refer to:
- **[Web Project Documentation](web/README.md)**: Steps to run the Next.js application.
- **[Design & Development Standards](docs/ESTANDARES.md)**: Our philosophy on design and code quality.
- **[DevOps Workflow](docs/WORKFLOW-DEVOPS-SOLO-DEV.md)**: Solo-dev CI/CD workflow guide.

## Conclusion
This architecture aims to provide a robust and secure environment for hosting the application, ensuring optimal performance and user accessibility.
