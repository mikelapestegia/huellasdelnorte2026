docs/specs/ingestion-car-rental.md
# Ingesta de politicas de alquiler de coche con mascotas

Objetivo: almacenar politicas oficiales (o editoriales) sobre mascotas en alquiler de coches.
Se guardan metadatos, no texto legal completo.

## Fuente editable
- `scripts/ingest/sources/car_rental_policies.json`

## Generacion
```bash
node scripts/ingest/car_rental_policies.mjs
```

Salida:
- `web/src/data/ingest/car_rental.ts`
- `GET /api/transport/car-rental`

## Campos
- `status`: allowed | conditional | not_allowed | unknown
- `scope`: pais o region de aplicacion
- `source`: official_faq | official_terms | official_site | editorial | operator
