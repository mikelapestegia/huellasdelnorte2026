-- Additional real data for services

INSERT INTO services (provider_id, name, category, duration_min, price_base, subscription_allowed) VALUES
((SELECT id FROM providers WHERE name = 'Hospital Veterinario Cantabria'), 'Consulta de especialista', 'veterinary', 45, 65.00, false),
((SELECT id FROM providers WHERE name = 'Hospital Veterinario Cantabria'), 'Urgencias 24 horas', 'veterinary', 30, 55.00, false),
((SELECT id FROM providers WHERE name = 'Hospital Veterinario Cantabria'), 'Cirugía menor', 'veterinary', 90, 180.00, false),
((SELECT id FROM providers WHERE name = 'Cecapa – Centro Canino Parayas'), 'Alojamiento premium', 'boarding', 1440, 35.00, true),
((SELECT id FROM providers WHERE name = 'Cecapa – Centro Canino Parayas'), 'Guardería diurna', 'boarding', 480, 22.00, false),
((SELECT id FROM providers WHERE name = 'Tienda Cecapa'), 'Alimentos premium', 'retail', 10, 25.00, false),
((SELECT id FROM providers WHERE name = 'Peluquería Canina Pupetes'), 'Peluquería baño completo', 'grooming', 120, 40.00, true),
((SELECT id FROM providers WHERE name = 'Peluquería Canina Pupetes'), 'Corte de pelo', 'grooming', 60, 28.00, false),
((SELECT id FROM providers WHERE name = 'Anny and Dogs'), 'Evaluación conductual', 'training', 90, 60.00, false),
((SELECT id FROM providers WHERE name = 'Anny and Dogs'), 'Clases grupales', 'training', 60, 20.00, true);