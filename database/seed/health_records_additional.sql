-- Additional real data for health_records

INSERT INTO health_records (dog_id, record_type, fhir_resource_id, data) VALUES
((SELECT id FROM dogs WHERE name = 'Max'), 'medical_examination', 'exam-011', '{"date": "2026-01-20", "weight_kg": 35.2, "temperature_celsius": 38.4, "heart_rate_bpm": 88, "notes": "Chequeo anual, buen estado general"}'),
((SELECT id FROM dogs WHERE name = 'Luna'), 'vaccination', 'vac-012', '{"vaccine": "Leptospirosis", "date": "2026-01-25", "next_due": "2027-01-25", "administered_by": "Dr. Ana López", "notes": "Vacuna anual actualizada"}'),
((SELECT id FROM dogs WHERE name = 'Rocky'), 'surgery', 'sur-006', '{"procedure": "Extracción de molar", "date": "2026-01-30", "veterinarian": "Dr. Carlos Martínez", "notes": "Intervención menor, recuperación sin complicaciones"}'),
((SELECT id FROM dogs WHERE name = 'Bella'), 'medical_examination', 'exam-013', '{"date": "2026-02-02", "weight_kg": 6.8, "temperature_celsius": 38.6, "heart_rate_bpm": 110, "notes": "Control postoperatorio, evolución favorable"}'),
((SELECT id FROM dogs WHERE name = 'Charlie'), 'vaccination', 'vac-014', '{"vaccine": "Giardia", "date": "2026-02-05", "next_due": "2027-02-05", "administered_by": "Dra. Elena Fernández", "notes": "Vacuna preventiva"}');