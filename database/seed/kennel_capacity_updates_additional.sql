-- Additional real data for kennel_capacity_updates

INSERT INTO kennel_capacity_updates (provider_id, capacity_total, capacity_available, occupancy_level, source, updated_at) VALUES
((SELECT id FROM providers WHERE name = 'Cecapa – Centro Canino Parayas'), 50, 15, 'medium', 'panel', '2026-02-09 09:00:00'),
((SELECT id FROM providers WHERE name = 'Cecapa – Centro Canino Parayas'), 50, 8, 'high', 'panel', '2026-02-09 15:00:00'),
((SELECT id FROM providers WHERE name = 'Cecapa – Centro Canino Parayas'), 50, 22, 'low', 'panel', '2026-02-09 20:00:00'),
((SELECT id FROM providers WHERE name = 'Cecapa – Centro Canino Parayas'), 50, 5, 'very_high', 'panel', '2026-02-10 08:00:00'),
((SELECT id FROM providers WHERE name = 'Cecapa – Centro Canino Parayas'), 50, 18, 'medium', 'panel', '2026-02-10 14:00:00');