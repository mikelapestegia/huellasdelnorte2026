docs/specs/ingestion-boat-transport.md
# Ingesta Transporte en Barco con Mascotas

Objetivo: almacenar politicas oficiales o editoriales de transporte en barco con mascotas.
Solo se guardan metadatos y enlaces; no se copia texto legal completo.

## Fuente editable
- `scripts/ingest/sources/boat_transport_policies.json`

## Generacion
```bash
node scripts/ingest/boat_transport_policies.mjs
```

Salida:
- `web/src/data/ingest/boat_transport.ts`
- `GET /api/transport/boat`

## Campos
- `status`: allowed | conditional | not_allowed | unknown
- `scope`: rutas o region de aplicacion
- `source`: official_site | official_terms | official_newsroom | editorial | operator
