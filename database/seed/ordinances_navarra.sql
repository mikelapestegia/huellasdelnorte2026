-- Additional real data for ordinances in Navarra

INSERT INTO ordinances (region, municipality, summary, source_url, last_verified_at, geom) VALUES
('Navarra', 'Pamplona', 'Ordenanza reguladora de la tenencia de animales de compañía', 'https://www.pamplona.es/ayuntamiento/ordenanzas-municipales', '2026-02-09', ST_GeomFromText('POINT(-1.6433 42.8167)', 4326)),
('Navarra', 'Tudela', 'Normativa sobre tenencia responsable de animales de compañía', 'https://www.tudela.es/servicios/ordenanzas/tenencia-animales', '2026-02-09', ST_GeomFromText('POINT(-1.6167 42.5333)', 4326)),
('Navarra', 'Estella-Lizarra', 'Ordenanza reguladora de la tenencia de animales de compañía', 'https://www.estella-lizarra.com/wp-content/uploads/2024/08/Ordenanza_reguladora_de_la_tenencia_de_animales_de_compania_2024.pdf', '2026-02-09', ST_GeomFromText('POINT(-2.1500 42.7000)', 4326)),
('Navarra', 'Olite', 'Normativa sobre obligatoriedad de microchip y cartilla sanitaria para animales de compañía', 'https://www.olite.es/wp-content/uploads/2017/12/Borrador-aprobacion-incial-ORDENANZA-MUNICIPALtenencia-animales2017.pdf', '2026-02-09', ST_GeomFromText('POINT(-1.6500 42.4667)', 4326)),
('Navarra', 'Barañain', 'Ley Foral 19/2019 de protección de animales de compañía', 'https://www.lexnavarra.navarra.es/detalle.asp?r=51449', '2026-02-09', ST_GeomFromText('POINT(-1.6667 42.8000)', 4326));