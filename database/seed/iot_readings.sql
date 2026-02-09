-- Seed data for iot_readings table
INSERT INTO iot_readings (device_id, recorded_at, data) VALUES
((SELECT id FROM iot_devices WHERE serial_number = 'GPS-2026-MAX001'), '2026-02-09 08:00:00', '{"location": {"lat": 43.4623, "lng": -3.8039}, "battery_level": 85, "signal_strength": "good"}'),
((SELECT id FROM iot_devices WHERE serial_number = 'GPS-2026-MAX001'), '2026-02-09 12:00:00', '{"location": {"lat": 43.4650, "lng": -3.8100}, "battery_level": 78, "signal_strength": "good"}'),
((SELECT id FROM iot_devices WHERE serial_number = 'ACT-2026-LUN002'), '2026-02-09 09:00:00', '{"steps": 3420, "calories_burned": 285, "sleep_hours": 10.5, "heart_rate_avg": 95}'),
((SELECT id FROM iot_devices WHERE serial_number = 'ACT-2026-LUN002'), '2026-02-09 18:00:00', '{"steps": 6150, "calories_burned": 520, "sleep_hours": 0, "heart_rate_avg": 102}'),
((SELECT id FROM iot_devices WHERE serial_number = 'COL-2026-ROC003'), '2026-02-09 10:30:00', '{"temperature": 38.2, "activity_level": "moderate", "mood": "happy", "hydration_status": "adequate"}'),
((SELECT id FROM iot_devices WHERE serial_number = 'GPS-2026-BEL004'), '2026-02-09 11:15:00', '{"location": {"lat": 43.4640, "lng": -3.8090}, "battery_level": 65, "signal_strength": "fair"}'),
((SELECT id FROM iot_devices WHERE serial_number = 'ACT-2026-CHA005'), '2026-02-09 14:20:00', '{"steps": 4890, "calories_burned": 410, "sleep_hours": 0, "heart_rate_avg": 110}'),
((SELECT id FROM iot_devices WHERE serial_number = 'GPS-2026-COO007'), '2026-02-09 16:45:00', '{"location": {"lat": 43.4600, "lng": -3.8000}, "battery_level": 92, "signal_strength": "excellent"}'),
((SELECT id FROM iot_devices WHERE serial_number = 'ACT-2026-ZOE008'), '2026-02-09 07:30:00', '{"steps": 2100, "calories_burned": 180, "sleep_hours": 12.2, "heart_rate_avg": 88}'),
((SELECT id FROM iot_devices WHERE serial_number = 'GPS-2026-MOL010'), '2026-02-09 19:30:00', '{"location": {"lat": 43.4680, "lng": -3.7950}, "battery_level": 70, "signal_strength": "good"}');