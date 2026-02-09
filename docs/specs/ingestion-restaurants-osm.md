docs/specs/ingestion-restaurants-osm.md
# Ingesta OSM: Restaurantes pet friendly

Este script consulta Overpass con tags de OSM:
- `amenity=restaurant|cafe|fast_food`
- `dog=yes|outside|leashed` o `pets=yes|allowed`

Salida: `web/src/data/ingest/restaurants.ts`

Notas:
- Respeta la política de uso de Overpass.
- Usa backoff y ejecución secuencial por región.
- En producción, mover a un servidor propio o usar Overpass dedicado.
