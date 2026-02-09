-- Seed data for kennel_capacity_updates table
INSERT INTO kennel_capacity_updates (provider_id, capacity_total, capacity_available, occupancy_level, source, updated_at) VALUES
((SELECT id FROM providers WHERE name = 'Guardería Canina El Refugio'), 30, 8, 'medium', 'panel', '2026-02-09 10:00:00'),
((SELECT id FROM providers WHERE name = 'Guardería Canina El Refugio'), 30, 5, 'high', 'panel', '2026-02-09 14:00:00'),
((SELECT id FROM providers WHERE name = 'Guardería Canina El Refugio'), 30, 12, 'low', 'panel', '2026-02-09 18:00:00'),
((SELECT id FROM providers WHERE name = 'Guardería Canina El Refugio'), 30, 3, 'very_high', 'panel', '2026-02-10 08:00:00'),
((SELECT id FROM providers WHERE name = 'Guardería Canina El Refugio'), 30, 15, 'medium', 'panel', '2026-02-10 12:00:00');