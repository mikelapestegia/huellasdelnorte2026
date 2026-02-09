docs/specs/api-layers.md
# API: Capas Norte 2026

Endpoints iniciales en Next.js (App Router) para servir capas del mapa.

## Base
- `GET /api/map/layers`
  - Respuesta: `{ layers: LayerConfig[], data: Record<LayerKey, FeatureCollection> }`

## Capas individuales
- `GET /api/restaurants`
- `GET /api/transport`
- `GET /api/ordinances`
- `GET /api/assistance/centers`

## Observaciones
- Los datos actuales son placeholders para desarrollo.
- La ingestión real alimentará las mismas rutas.
