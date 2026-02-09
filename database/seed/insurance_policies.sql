-- Seed data for insurance_policies table
INSERT INTO insurance_policies (user_id, provider_name, policy_number, start_date, end_date, status, document_url) VALUES
((SELECT id FROM users WHERE email = 'maria.gonzalez@example.com'), 'Seguros Generales España', 'SGE-2026-001', '2026-01-01', '2026-12-31', 'active', 'https://example.com/docs/maria_gonzalez_policy.pdf'),
((SELECT id FROM users WHERE email = 'carlos.ruiz@example.com'), 'Mapfre Mascotas', 'MAP-2026-002', '2026-02-01', '2027-01-31', 'active', 'https://example.com/docs/carlos_ruiz_policy.pdf'),
((SELECT id FROM users WHERE email = 'ana.sanchez@example.com'), 'Allianz Mascotas', 'ALL-2026-003', '2026-01-15', '2026-12-31', 'active', 'https://example.com/docs/ana_sanchez_policy.pdf'),
((SELECT id FROM users WHERE email = 'pablo.diaz@example.com'), 'AXA Particulares', 'AXA-2026-004', '2026-02-10', '2027-02-09', 'active', 'https://example.com/docs/pablo_diaz_policy.pdf'),
((SELECT id FROM users WHERE email = 'lucia.martinez@example.com'), 'Generali Mascotas', 'GEN-2026-005', '2026-01-20', '2026-12-31', 'active', 'https://example.com/docs/lucia_martinez_policy.pdf'),
((SELECT id FROM users WHERE email = 'javier.hernandez@example.com'), 'Sanitas Mascotas', 'SAN-2026-006', '2026-02-05', '2027-02-04', 'active', 'https://example.com/docs/javier_hernandez_policy.pdf'),
((SELECT id FROM users WHERE email = 'carmen.lopez@example.com'), 'Casero Mascotas', 'CAS-2026-007', '2026-01-25', '2026-12-31', 'active', 'https://example.com/docs/carmen_lopez_policy.pdf'),
((SELECT id FROM users WHERE email = 'david.moreno@example.com'), 'Fiatc Mascotas', 'FIA-2026-008', '2026-02-12', '2027-02-11', 'active', 'https://example.com/docs/david_moreno_policy.pdf'),
((SELECT id FROM users WHERE email = 'patricia.alvarez@example.com'), 'Direct Seguros', 'DIR-2026-009', '2026-01-30', '2026-12-31', 'active', 'https://example.com/docs/patricia_alvarez_policy.pdf'),
((SELECT id FROM users WHERE email = 'raul.torres@example.com'), 'Helvetia Mascotas', 'HEL-2026-010', '2026-02-08', '2027-02-07', 'active', 'https://example.com/docs/raul_torres_policy.pdf');