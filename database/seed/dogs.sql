-- Seed data for dogs table
INSERT INTO dogs (owner_id, name, breed, sex, birth_date, microchip_id, riac_id, assistance_type) VALUES
((SELECT id FROM users WHERE email = 'maria.gonzalez@example.com'), 'Max', 'Labrador Retriever', 'male', '2020-05-15', 'ES123456789012345', 'RIAC-001', 'guide'),
((SELECT id FROM users WHERE email = 'carlos.ruiz@example.com'), 'Luna', 'Golden Retriever', 'female', '2019-08-22', 'ES123456789012346', 'RIAC-002', 'assistance'),
((SELECT id FROM users WHERE email = 'ana.sanchez@example.com'), 'Rocky', 'German Shepherd', 'male', '2021-03-10', 'ES123456789012347', 'RIAC-003', 'therapy'),
((SELECT id FROM users WHERE email = 'pablo.diaz@example.com'), 'Bella', 'Poodle', 'female', '2018-11-30', 'ES123456789012348', 'RIAC-004', 'none'),
((SELECT id FROM users WHERE email = 'lucia.martinez@example.com'), 'Charlie', 'Border Collie', 'male', '2020-01-18', 'ES123456789012349', 'RIAC-005', 'assistance'),
((SELECT id FROM users WHERE email = 'javier.hernandez@example.com'), 'Daisy', 'Beagle', 'female', '2019-07-05', 'ES123456789012350', 'RIAC-006', 'none'),
((SELECT id FROM users WHERE email = 'carmen.lopez@example.com'), 'Cooper', 'Boxer', 'male', '2021-09-12', 'ES123456789012351', 'RIAC-007', 'therapy'),
((SELECT id FROM users WHERE email = 'david.moreno@example.com'), 'Zoe', 'Cocker Spaniel', 'female', '2020-12-25', 'ES123456789012352', 'RIAC-008', 'guide'),
((SELECT id FROM users WHERE email = 'patricia.alvarez@example.com'), 'Toby', 'Bulldog', 'male', '2019-04-02', 'ES123456789012353', 'RIAC-009', 'none'),
((SELECT id FROM users WHERE email = 'raul.torres@example.com'), 'Molly', 'Rottweiler', 'female', '2020-10-08', 'ES123456789012354', 'RIAC-010', 'assistance');