# Terraform Configuration

This README file provides an overview of the Terraform configuration for deploying infrastructure in the Huellas del Norte project.

## Architecture
- **Single 200GB ARM Architecture**: The project is optimized for a single 200GB ARM architecture instance to provide efficient and cost-effective performance.

## Database
- This project uses **Oracle 26ai Database** for persistent data storage, ensuring high availability and reliability.

## Cloudflare Configuration
- Cloudflare is configured in the project to manage DNS and provide additional security features.

## Environment Structure
The project maintains a structured environment setup suitable for both development (dev) and production (prod) environments.

### Development Environment
- Resource specifications:
  - ARM Architecture: 200GB
  - Database: Oracle 26ai
  - Additional Cloudflare settings as required for dev purposes.

### Production Environment
- Resource specifications:
  - ARM Architecture: 200GB
  - Database: Oracle 26ai
  - Cloudflare settings are configured to handle production-level traffic and security requirements.

## Usage
To initialize and apply the Terraform setup, run the following commands:

```bash
terraform init
terraform apply
```

Ensure that you have the necessary permissions and credentials configured for your cloud provider and resources.