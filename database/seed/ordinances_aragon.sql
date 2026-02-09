-- Additional real data for ordinances in Aragón

INSERT INTO ordinances (region, municipality, summary, source_url, last_verified_at, geom) VALUES
('Aragón', 'Zaragoza', 'Ordenanza reguladora de la tenencia de animales de compañía en Zaragoza', 'https://www.zaragoza.es/ciudadania/servicios/ordenanzas/tenencia-animales', '2026-02-09', ST_GeomFromText('POINT(-0.8764 41.6561)', 4326)),
('Aragón', 'Huesca', 'Reglamento sobre tenencia responsable de animales en Huesca', 'https://www.huesca.es/ordenanzas/tenencia-responsable-animales', '2026-02-09', ST_GeomFromText('POINT(-0.4089 42.1361)', 4326)),
('Aragón', 'Teruel', 'Normativa sobre control de animales abandonados y protección animal', 'https://www.teruel.es/ordenanzas/control-abandono-animal', '2026-02-09', ST_GeomFromText('POINT(-1.1068 40.3456)', 4326)),
('Aragón', 'Utebo', 'Ordenanza reguladora de la protección y tenencia de animales', 'https://utebo.es/sites/default/files/ordenanza_proteccion_y_tenencia_animales.pdf', '2026-02-09', ST_GeomFromText('POINT(-0.9667 41.6833)', 4326)),
('Aragón', 'Calatayud', 'Normativa sobre obligatoriedad de microchip y cartilla sanitaria para animales de compañía', 'https://www.calatayud.es/ordenanzas/microchip-cartilla-sanitaria', '2026-02-09', ST_GeomFromText('POINT(-1.7167 41.3500)', 4326));