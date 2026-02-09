docs/specs/map-data-model.md
# Modelo de datos (Capas Norte 2026)

Este documento define el modelo mínimo para las capas prioritarias:
playas aptas, veterinarios 24h, guarderías con ocupación, rutas con agua/sombra,
restaurantes pet friendly, transporte con perro, ordenanzas y tecnología canina.

## 1. Esquema relacional (PostgreSQL + PostGIS)

### beaches
- id (uuid, pk)
- name (text)
- region (text)
- type (enum: coastal, river)
- allowed_from (date)
- allowed_to (date)
- rules (text)
- source_url (text)
- source_license (text)
- last_verified_at (timestamp)
- geom (geometry(Point, 4326))

### vets
- id (uuid, pk)
- name (text)
- region (text)
- phone (text)
- is_24h (boolean)
- emergency (boolean)
- source_url (text)
- last_verified_at (timestamp)
- geom (geometry(Point, 4326))

### kennels
- id (uuid, pk)
- name (text)
- region (text)
- capacity_total (int)
- capacity_available (int)
- occupancy_level (enum: low, mid, high)
- occupancy_source (enum: api, panel, booking, manual)
- occupancy_updated_at (timestamp)
- source_url (text)
- last_verified_at (timestamp)
- geom (geometry(Point, 4326))

### routes
- id (uuid, pk)
- name (text)
- region (text)
- difficulty (text)
- water_points (int)
- shade_level (enum: low, mid, high)
- source_url (text)
- source_license (text)
- last_verified_at (timestamp)
- geom (geometry(LineString, 4326))

### restaurants
- id (uuid, pk)
- name (text)
- region (text)
- policy (text)
- source_url (text)
- last_verified_at (timestamp)
- geom (geometry(Point, 4326))

### transport_services
- id (uuid, pk)
- name (text)
- region (text)
- type (enum: train, bus, ferry, taxi, rideshare)
- rules (text)
- source_url (text)
- last_verified_at (timestamp)
- geom (geometry(Point, 4326))

### ordinances
- id (uuid, pk)
- region (text)
- municipality (text)
- summary (text)
- source_url (text)
- last_verified_at (timestamp)
- geom (geometry(Point, 4326))

### tech_products
- id (uuid, pk)
- name (text)
- category (text)
- description (text)
- brand (text)
- source_url (text)
- popularity_rank (int)
- last_verified_at (timestamp)

## 2. Descubrimiento y verificación

### Tabla de descubrimiento (no pública)
- source_id (uuid, pk)
- url (text)
- title (text)
- detected_region (text)
- detected_type (enum: beach, vet, kennel, route, product)
- status (enum: pending, rejected, approved)
- notes (text)
- created_at (timestamp)

Regla: en modo descubrimiento solo se almacena URL y metadatos de alto nivel,
sin copiar contenido protegido.

## 3. Actualización y licencias

- Todas las entidades deben guardar `source_url` y `source_license`.
- Para fuentes oficiales: actualización mínima anual antes del verano.
- Para ocupación de guarderías: actualización en tiempo real vía API/panel.
