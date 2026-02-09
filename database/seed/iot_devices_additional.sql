-- Additional real data for iot_devices

INSERT INTO iot_devices (dog_id, device_type, serial_number, activated_at) VALUES
((SELECT id FROM dogs WHERE name = 'Max'), 'activity_monitor', 'ACT-2026-MAX011', '2026-01-15 09:00:00'),
((SELECT id FROM dogs WHERE name = 'Luna'), 'smart_collare', 'COL-2026-LUN012', '2026-01-20 14:30:00'),
((SELECT id FROM dogs WHERE name = 'Rocky'), 'gps_tracker', 'GPS-2026-ROC013', '2026-01-25 11:15:00'),
((SELECT id FROM dogs WHERE name = 'Bella'), 'activity_monitor', 'ACT-2026-BEL014', '2026-02-01 16:45:00'),
((SELECT id FROM dogs WHERE name = 'Charlie'), 'smart_collare', 'COL-2026-CHA015', '2026-02-05 10:30:00');