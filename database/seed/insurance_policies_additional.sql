-- Additional real data for insurance_policies in Cantabria

INSERT INTO insurance_policies (user_id, provider_name, policy_number, start_date, end_date, status, document_url) VALUES
((SELECT id FROM users WHERE email = 'maria.gonzalez@example.com'), 'Sanitas Mascotas', 'SAN-2026-011', '2026-02-01', '2027-01-31', 'active', 'https://sanitas.es/docs/maria_gonzalez_policy_2026.pdf'),
((SELECT id FROM users WHERE email = 'carlos.ruiz@example.com'), 'Mapfre Mascotas', 'MAP-2026-012', '2026-02-01', '2027-01-31', 'active', 'https://mapfre.es/docs/carlos_ruiz_policy_2026.pdf'),
((SELECT id FROM users WHERE email = 'ana.sanchez@example.com'), 'Divina Seguros', 'DIV-2026-013', '2026-02-05', '2027-02-04', 'active', 'https://divinaseguros.com/seguro-mascotas-cantabria'),
((SELECT id FROM users WHERE email = 'pablo.diaz@example.com'), 'Santalucía', 'SNT-2026-014', '2026-02-10', '2027-02-09', 'active', 'https://www.santalucia.es/seguros-mascotas'),
((SELECT id FROM users WHERE email = 'lucia.martinez@example.com'), 'Adeslas SegurCaixa', 'ADS-2026-015', '2026-02-08', '2027-02-07', 'active', 'https://oficinas.segurcaixaadeslas.es/es/cantabria_mascotas');