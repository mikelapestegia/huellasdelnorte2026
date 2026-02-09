-- database/schema.sql
-- Esquema base inspirado en el documento "Plataforma Integral Servicios Caninos"
-- Motor recomendado: PostgreSQL 15+ con PostGIS

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1) Usuarios y perros
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'owner',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  breed TEXT,
  sex TEXT,
  birth_date DATE,
  microchip_id TEXT UNIQUE,
  riac_id TEXT,
  assistance_type TEXT DEFAULT 'none',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 2) Cumplimiento legal
CREATE TABLE IF NOT EXISTS legal_requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  enforcement_level TEXT,
  penalty_hint TEXT
);

CREATE TABLE IF NOT EXISTS responsible_courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  completed_at TIMESTAMP,
  certificate_url TEXT
);

CREATE TABLE IF NOT EXISTS insurance_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  provider_name TEXT NOT NULL,
  policy_number TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'active',
  document_url TEXT
);

-- 3) Proveedores y servicios
CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  provider_type TEXT NOT NULL,
  description TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  region TEXT,
  geom GEOMETRY(Point, 4326),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS provider_certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id),
  certification_code TEXT NOT NULL,
  issued_by TEXT,
  valid_until DATE
);

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  duration_min INT,
  price_base NUMERIC(10, 2),
  subscription_allowed BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id),
  user_id UUID REFERENCES users(id),
  dog_id UUID REFERENCES dogs(id),
  start_at TIMESTAMP,
  end_at TIMESTAMP,
  status TEXT DEFAULT 'pending'
);

-- 4) Guarderías con ocupación en tiempo real
CREATE TABLE IF NOT EXISTS kennel_capacity_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id),
  capacity_total INT NOT NULL,
  capacity_available INT NOT NULL,
  occupancy_level TEXT NOT NULL,
  source TEXT DEFAULT 'panel',
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 5) Salud digital y telemedicina
CREATE TABLE IF NOT EXISTS health_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dog_id UUID REFERENCES dogs(id),
  record_type TEXT NOT NULL,
  fhir_resource_id TEXT,
  data JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS telemed_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dog_id UUID REFERENCES dogs(id),
  user_id UUID REFERENCES users(id),
  provider_id UUID REFERENCES providers(id),
  status TEXT DEFAULT 'scheduled',
  scheduled_at TIMESTAMP,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS triage_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dog_id UUID REFERENCES dogs(id),
  user_id UUID REFERENCES users(id),
  symptoms JSONB,
  risk_level TEXT,
  recommendation TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 6) IoT y monitorización
CREATE TABLE IF NOT EXISTS iot_devices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dog_id UUID REFERENCES dogs(id),
  device_type TEXT NOT NULL,
  serial_number TEXT UNIQUE,
  activated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS iot_readings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id UUID REFERENCES iot_devices(id),
  recorded_at TIMESTAMP NOT NULL DEFAULT NOW(),
  data JSONB
);

-- 7) Ocio y rutas
CREATE TABLE IF NOT EXISTS routes_catalog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  route_type TEXT,
  distance_km_min NUMERIC(6, 2),
  distance_km_max NUMERIC(6, 2),
  highlight TEXT,
  geom GEOMETRY(LineString, 4326),
  source_url TEXT,
  last_verified_at TIMESTAMP
);

-- 8) Transporte pet-friendly
CREATE TABLE IF NOT EXISTS transport_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  operator_name TEXT NOT NULL,
  operator_type TEXT NOT NULL,
  region TEXT,
  rules TEXT,
  source_url TEXT,
  last_verified_at TIMESTAMP
);

-- 9) Ordenanzas
CREATE TABLE IF NOT EXISTS ordinances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  region TEXT NOT NULL,
  municipality TEXT NOT NULL,
  summary TEXT,
  source_url TEXT,
  last_verified_at TIMESTAMP,
  geom GEOMETRY(Point, 4326)
);

-- 10) Comunidad y seguridad
CREATE TABLE IF NOT EXISTS lost_pet_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dog_id UUID REFERENCES dogs(id),
  owner_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'active',
  last_seen_at TIMESTAMP,
  geom GEOMETRY(Point, 4326),
  description TEXT
);

CREATE TABLE IF NOT EXISTS qr_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dog_id UUID REFERENCES dogs(id),
  code TEXT UNIQUE NOT NULL,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by UUID REFERENCES users(id),
  title TEXT NOT NULL,
  event_type TEXT NOT NULL,
  starts_at TIMESTAMP,
  ends_at TIMESTAMP,
  geom GEOMETRY(Point, 4326),
  description TEXT
);

CREATE TABLE IF NOT EXISTS event_attendees (
  event_id UUID REFERENCES events(id),
  user_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'going',
  PRIMARY KEY (event_id, user_id)
);

-- 11) Contenido y tecnología
CREATE TABLE IF NOT EXISTS content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT,
  tags TEXT[],
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tech_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  brand TEXT,
  source_url TEXT,
  popularity_rank INT,
  last_verified_at TIMESTAMP
);


-- 12) Centros y asociaciones de perros de apoyo
CREATE TABLE IF NOT EXISTS assistance_centers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  entity_type TEXT,
  support_type TEXT NOT NULL,
  region TEXT,
  province TEXT,
  city TEXT,
  country TEXT,
  coverage TEXT,
  website TEXT,
  source_url TEXT,
  source_type TEXT,
  notes TEXT,
  last_verified_at TIMESTAMP,
  latitude NUMERIC(9, 6),
  longitude NUMERIC(9, 6),
  geocode_status TEXT,
  geocode_precision TEXT,
  geocode_source TEXT,
  geom GEOMETRY(Point, 4326)
);
