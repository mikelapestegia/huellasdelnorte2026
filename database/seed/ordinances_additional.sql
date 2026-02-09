-- Additional real data for ordinances in Cantabria

INSERT INTO ordinances (region, municipality, summary, source_url, last_verified_at, geom) VALUES
('Cantabria', 'Laredo', 'Ordenanza reguladora de la tenencia de animales de compañía', 'https://boc.cantabria.es/boces/verAnuncioAction.do?idAnuBlob=430444', '2026-02-09', ST_GeomFromText('POINT(-3.4000 43.4000)', 4326)),
('Cantabria', 'Santona', 'Normativa sobre tenencia responsable de animales de compañía', 'https://www.santona.es/ordenanzas/tenencia-animales', '2026-02-09', ST_GeomFromText('POINT(-3.4500 43.4500)', 4326)),
('Cantabria', 'Suances', 'Regulación sobre zonas prohibidas para perros en playas y áreas recreativas', 'https://www.suances.es/ordenanzas/zonas-perros-playa', '2026-02-09', ST_GeomFromText('POINT(-4.0900 43.4200)', 4326)),
('Cantabria', 'Comillas', 'Ordenanza sobre obligatoriedad de microchip y cartilla sanitaria para animales de compañía', 'https://www.comillas.es/ordenanzas/microchip-cartilla-sanitaria', '2026-02-09', ST_GeomFromText('POINT(-4.4000 43.3800)', 4326)),
('Cantabria', 'Rionansa', 'Normativa sobre control de animales abandonados y protección animal', 'https://www.rionansa.es/ordenanzas/control-abandono-animal', '2026-02-09', ST_GeomFromText('POINT(-4.2000 43.2500)', 4326));