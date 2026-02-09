# 🚀 Migration Checklist: V1 → V2
## HuellasdelNorte Infrastructure Migration

**Date:** February 8, 2026  
**Status:** IN PROGRESS  
**Owner:** mikelapestegia  

---

## ✋ PRE-MIGRATION PHASE

### Security & Credentials
- [ ] Generate OCI API Key (openssl genrsa)
- [ ] Upload public key to OCI Console
- [ ] Get OCI fingerprint
- [ ] Generate SSH Key for Terraform
- [ ] Get Cloudflare API Global Key
- [ ] Get Cloudflare Account ID and Zone ID
- [ ] Generate strong DB password (min 12 chars)
- [ ] Verify all credentials are in secure location
- [ ] Add terraform.tfvars to .gitignore
- [ ] Ensure terraform.tfvars has 600 permissions (chmod 600)

### Infrastructure Assessment (V1)
- [ ] List all running instances in OCI
- [ ] Document current VM specifications
- [ ] List all attached storage volumes
- [ ] Document current database setup (if any)
- [ ] List current Cloudflare DNS records
- [ ] Document all security groups/rules
- [ ] Export current firewall rules
- [ ] Take screenshot of OCI Console

### Data Backup (V1)
- [ ] Full VM snapshot via OCI Console
- [ ] Export all application data
- [ ] Export all database data (if applicable)
- [ ] Export all secrets and keys
- [ ] Store backups in secure location
- [ ] Verify backup integrity
- [ ] Document backup location and access

---

## 🏗️ INFRASTRUCTURE SETUP PHASE

### Terraform Installation & Setup
- [ ] Install Terraform >= 1.0.0
- [ ] Install OCI CLI >= 3.0.0
- [ ] Verify Terraform and OCI CLI installation
- [ ] Clone huellasdelnortev2 repository
- [ ] Navigate to terraform/ directory
- [ ] Create terraform.tfvars from example
- [ ] Fill in all required variables
- [ ] Run `terraform validate`
- [ ] Run `terraform fmt -recursive .`

### Terraform Planning
- [ ] Run `terraform init`
- [ ] Run `terraform plan -out=tfplan`
- [ ] Review plan carefully:
  - [ ] Correct instance shape (VM.Standard.A1.Flex)
  - [ ] Correct OCPU count (4)
  - [ ] Correct memory (24GB)
  - [ ] Correct storage (200GB)
  - [ ] Correct database config (26ai)
  - [ ] Correct Cloudflare tunnel settings
- [ ] Verify no destructive changes to V1
- [ ] Document plan output

### Terraform Deployment
- [ ] Execute `terraform apply tfplan`
- [ ] Monitor deployment progress
- [ ] Wait for completion (15-30 minutes)
- [ ] Verify all resources created:
  - [ ] VCN created
  - [ ] Subnets created
  - [ ] Security Lists created
  - [ ] Instance launched (check lifecycle_state = RUNNING)
  - [ ] Database created (check lifecycle_state = AVAILABLE)
  - [ ] Cloudflare tunnel created

### Extract Critical Information
- [ ] Extract instance ID
- [ ] Extract instance private IP
- [ ] Extract database connection strings
- [ ] Extract Cloudflare tunnel ID
- [ ] Extract Cloudflare tunnel secret
- [ ] Save all outputs to secure files
- [ ] Verify terraform.tfstate is NOT in git

---

## ✅ VALIDATION PHASE (V2)

### Instance Validation
- [ ] Verify instance is RUNNING in OCI Console
- [ ] Check CPU usage (should be low on fresh start)
- [ ] Check memory usage
- [ ] Check storage allocation (200GB boot volume)
- [ ] Verify security list is RESTRICTIVE (ports closed)
- [ ] Verify instance has NO public IP
- [ ] SSH via OCI Console works (if needed for debugging)

### Database Validation
- [ ] Verify database is AVAILABLE
- [ ] Check database version (should be 26ai)
- [ ] Verify CPU cores (1 for Always Free)
- [ ] Verify storage size (0.02 TB = 20GB)
- [ ] Test connection with provided string
- [ ] Download wallet file
- [ ] Verify admin user access

### Cloudflare Validation
- [ ] Verify tunnel is CONNECTED in Cloudflare Dashboard
- [ ] Verify DNS records created for api.huellasdelnorte.com
- [ ] Verify DNS records created for app.huellasdelnorte.com
- [ ] Verify records are PROXIED (orange cloud)
- [ ] Check SSL/TLS settings (Full)
- [ ] Verify WAF is enabled
- [ ] Verify DDoS protection is enabled

### Network Testing
- [ ] DNS resolve api.huellasdelnorte.com (should show Cloudflare IP)
- [ ] DNS resolve app.huellasdelnorte.com (should show Cloudflare IP)
- [ ] Ping both endpoints (may be blocked, that's OK)
- [ ] Test HTTP headers (curl -I)
- [ ] Verify no public IP scanning possible

---

## 🔄 CUTOVER PHASE (When Ready)

### Pre-Cutover (48 hours before)
- [ ] Announce maintenance window
- [ ] Reduce DNS TTL to 5 minutes
- [ ] Review cutover plan with team
- [ ] Prepare rollback procedure
- [ ] Test rollback procedure (dry run)
- [ ] Ensure team availability during cutover

### Data Migration
- [ ] Export all data from V1 database
- [ ] Transform data to V2 format (if needed)
- [ ] Import data to V2 database
- [ ] Validate data integrity
- [ ] Verify record counts match
- [ ] Check data relationships

### Cutover Window (Low Traffic Time)
- [ ] Set maintenance page
- [ ] Stop all V1 services (if needed)
- [ ] Final data sync/export
- [ ] Update Cloudflare DNS to V2 instance
- [ ] Monitor DNS propagation
- [ ] Test application endpoints
- [ ] Verify user access

### Post-Cutover Validation
- [ ] Test all API endpoints
- [ ] Test mobile app connectivity
- [ ] Test web app connectivity
- [ ] Monitor error logs
- [ ] Monitor performance metrics
- [ ] Check Cloudflare Analytics
- [ ] Verify no data loss

### Post-Cutover Support (24-48 hours)
- [ ] Monitor for issues
- [ ] Keep V1 online (contingency)
- [ ] Address any user reports
- [ ] Gradual reduction of monitoring
- [ ] Confirm stability

---

## 🧹 POST-MIGRATION CLEANUP

### V1 Decommissioning (After 48 hours)
- [ ] Confirm V2 is stable
- [ ] Announce V1 will be shut down
- [ ] Increase DNS TTL back to normal
- [ ] Delete V1 instance (OCI)
- [ ] Delete V1 volumes
- [ ] Delete V1 security lists
- [ ] Update documentation

### Documentation Updates
- [ ] Update README.md with V2 info
- [ ] Update ARCHITECTURE docs
- [ ] Document any custom changes
- [ ] Update runbooks
- [ ] Archive V1 documentation
- [ ] Update team wiki

### Monitoring Setup
- [ ] Configure OCI monitoring
- [ ] Setup Cloudflare alerting
- [ ] Configure log aggregation
- [ ] Setup performance monitoring
- [ ] Configure backup schedule
- [ ] Test backup restoration

### Security Hardening
- [ ] Enable OCI audit logging
- [ ] Configure Cloudflare firewall rules
- [ ] Setup rate limiting
- [ ] Enable 2FA on all accounts
- [ ] Rotate API keys (if needed)
- [ ] Setup WAF rules

---

## 📋 SIGN-OFF

- [ ] All checklist items completed
- [ ] V2 verified stable for 48+ hours
- [ ] Team sign-off obtained
- [ ] Documentation updated
- [ ] Monitoring configured
- [ ] Backups verified

**Migration Completed:** ___________  
**Approved By:** ___________  
**Date:** ___________  

---

## 📝 Notes & Issues

```
[Add any issues encountered and how they were resolved]

```
