-- Additional real data for ordinances in Galicia

INSERT INTO ordinances (region, municipality, summary, source_url, last_verified_at, geom) VALUES
('Galicia', 'A Coruña', 'Ordenanza reguladora de la tenencia de animales de compañía en A Coruña', 'https://www.coruna.gal/descarga/9001022850865661269/ORDENANZA-PROTECCION-Y-TENENCIA-ANIMALES_castellano.pdf', '2026-02-09', ST_GeomFromText('POINT(-8.4089 43.3713)', 4326)),
('Galicia', 'Santiago de Compostela', 'Reglamento sobre tenencia responsable de animales en Santiago', 'https://www.santiagodecompostela.org', '2026-02-09', ST_GeomFromText('POINT(-8.5444 42.8806)', 4326)),
('Galicia', 'Vigo', 'Normativa sobre control de animales abandonados y protección animal', 'https://www.vigo.org', '2026-02-09', ST_GeomFromText('POINT(-8.7226 42.2328)', 4326)),
('Galicia', 'Pontevedra', 'Ordenanza reguladora de la protección y tenencia de animales', 'https://www.pontevedra.org', '2026-02-09', ST_GeomFromText('POINT(-8.6453 42.4313)', 4326)),
('Galicia', 'Ferrol', 'Normativa sobre obligatoriedad de microchip y cartilla sanitaria para animales de compañía', 'https://www.ferrol.es', '2026-02-09', ST_GeomFromText('POINT(-8.2467 43.4854)', 4326));