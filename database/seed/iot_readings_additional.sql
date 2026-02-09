-- Additional real data for iot_readings

INSERT INTO iot_readings (device_id, recorded_at, data) VALUES
((SELECT id FROM iot_devices WHERE serial_number = 'GPS-2026-MAX001'), '2026-02-09 20:00:00', '{"location": {"lat": 43.4600, "lng": -3.8050}, "battery_level": 72, "signal_strength": "good"}'),
((SELECT id FROM iot_devices WHERE serial_number = 'ACT-2026-LUN002'), '2026-02-09 22:00:00', '{"steps": 7200, "calories_burned": 610, "sleep_hours": 2.5, "heart_rate_avg": 98}'),
((SELECT id FROM iot_devices WHERE serial_number = 'COL-2026-ROC003'), '2026-02-09 21:00:00', '{"temperature": 38.4, "activity_level": "high", "mood": "excited", "hydration_status": "good"}'),
((SELECT id FROM iot_devices WHERE serial_number = 'GPS-2026-BEL004'), '2026-02-09 23:00:00', '{"location": {"lat": 43.4620, "lng": -3.8080}, "battery_level": 58, "signal_strength": "fair"}'),
((SELECT id FROM iot_devices WHERE serial_number = 'ACT-2026-CHA005'), '2026-02-09 23:30:00', '{"steps": 5750, "calories_burned": 485, "sleep_hours": 0, "heart_rate_avg": 105}'),
((SELECT id FROM iot_devices WHERE serial_number = 'ACT-2026-MAX011'), '2026-02-09 07:00:00', '{"steps": 1500, "calories_burned": 125, "sleep_hours": 8.2, "heart_rate_avg": 85}'),
((SELECT id FROM iot_devices WHERE serial_number = 'COL-2026-LUN012'), '2026-02-09 12:00:00', '{"temperature": 38.1, "activity_level": "moderate", "mood": "calm", "hydration_status": "adequate"}'),
((SELECT id FROM iot_devices WHERE serial_number = 'GPS-2026-ROC013'), '2026-02-09 15:00:00', '{"location": {"lat": 43.4700, "lng": -3.8100}, "battery_level": 88, "signal_strength": "excellent"}'),
((SELECT id FROM iot_devices WHERE serial_number = 'ACT-2026-BEL014'), '2026-02-09 17:00:00', '{"steps": 3800, "calories_burned": 320, "sleep_hours": 0, "heart_rate_avg": 92}'),
((SELECT id FROM iot_devices WHERE serial_number = 'COL-2026-CHA015'), '2026-02-09 19:00:00', '{"temperature": 38.6, "activity_level": "high", "mood": "playful", "hydration_status": "needs_water"}');