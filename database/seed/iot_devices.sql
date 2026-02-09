-- Seed data for iot_devices table
INSERT INTO iot_devices (dog_id, device_type, serial_number, activated_at) VALUES
((SELECT id FROM dogs WHERE name = 'Max'), 'gps_tracker', 'GPS-2026-MAX001', '2025-12-01 10:00:00'),
((SELECT id FROM dogs WHERE name = 'Luna'), 'activity_monitor', 'ACT-2026-LUN002', '2025-11-15 14:30:00'),
((SELECT id FROM dogs WHERE name = 'Rocky'), 'smart_collare', 'COL-2026-ROC003', '2026-01-10 09:15:00'),
((SELECT id FROM dogs WHERE name = 'Bella'), 'gps_tracker', 'GPS-2026-BEL004', '2025-10-20 16:45:00'),
((SELECT id FROM dogs WHERE name = 'Charlie'), 'activity_monitor', 'ACT-2026-CHA005', '2026-01-25 11:20:00'),
((SELECT id FROM dogs WHERE name = 'Daisy'), 'smart_collare', 'COL-2026-DAI006', '2025-12-30 13:10:00'),
((SELECT id FROM dogs WHERE name = 'Cooper'), 'gps_tracker', 'GPS-2026-COO007', '2026-01-05 08:30:00'),
((SELECT id FROM dogs WHERE name = 'Zoe'), 'activity_monitor', 'ACT-2026-ZOE008', '2025-11-28 15:55:00'),
((SELECT id FROM dogs WHERE name = 'Toby'), 'smart_collare', 'COL-2026-TOB009', '2026-02-01 12:40:00'),
((SELECT id FROM dogs WHERE name = 'Molly'), 'gps_tracker', 'GPS-2026-MOL010', '2025-12-18 17:25:00');