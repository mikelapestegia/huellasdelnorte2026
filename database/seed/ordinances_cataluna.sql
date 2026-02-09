-- Additional real data for ordinances in Cataluña

INSERT INTO ordinances (region, municipality, summary, source_url, last_verified_at, geom) VALUES
('Cataluña', 'Barcelona', 'Ordenanza de Convivencia que obliga a limpiar los excrementos de los perros en entornos urbanos', 'https://www.barcelona.cat/', '2026-02-09', ST_GeomFromText('POINT(2.1540 41.3902)', 4326)),
('Cataluña', 'Barcelona', 'Ley 10/1999 sobre la tenencia de perros considerados potencialmente peligrosos', 'https://boncan.com/legislacion-perros-catalunya/', '2026-02-09', ST_GeomFromText('POINT(2.1540 41.3902)', 4326)),
('Cataluña', 'Girona', 'Normativa sobre control de animales abandonados y protección animal', 'https://www.girona.cat', '2026-02-09', ST_GeomFromText('POINT(2.8250 41.9833)', 4326)),
('Cataluña', 'Tarragona', 'Ordenanza reguladora de la protección y tenencia de animales', 'https://www.tarragona.cat', '2026-02-09', ST_GeomFromText('POINT(1.2445 41.1189)', 4326)),
('Cataluña', 'Lleida', 'Normativa sobre obligatoriedad de microchip y cartilla sanitaria para animales de compañía', 'https://www.llag.es', '2026-02-09', ST_GeomFromText('POINT(0.6247 41.6172)', 4326));