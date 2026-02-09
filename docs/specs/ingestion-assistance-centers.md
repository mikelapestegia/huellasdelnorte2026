# Ingesta Centros/Asociaciones de Perros de Apoyo

Objetivo: almacenar asociaciones y centros de perros guía, perros de asistencia e intervenciones/terapia asistida.

## Fuente editable
- `scripts/ingest/sources/assistance_centers.json`
- `scripts/ingest/sources/assistance_centers_geocodes.json`

## Generacion
```bash
node scripts/ingest/assistance_centers.mjs
```

## Geocodificación (opcional)
```bash
node scripts/ingest/geocode_assistance_centers.mjs
node scripts/ingest/assistance_centers.mjs
```

Variables recomendadas:
- `NOMINATIM_URL` (default: `https://nominatim.openstreetmap.org/search`)
- `NOMINATIM_USER_AGENT`

Salida:
- `web/src/data/ingest/assistance_centers.ts`
- `data/exports/assistance_centers.csv`
- `database/seed/assistance_centers.sql`

## Campos
- `support_type`: guide | assistance | therapy | mixed
- `entity_type`: association | foundation | center | program | public_service
- `coverage`: local | regional | national
- `latitude`, `longitude`: coordenadas si están disponibles
- `geocode_status`: pending | verified
- `geocode_precision`: city | address | exact
