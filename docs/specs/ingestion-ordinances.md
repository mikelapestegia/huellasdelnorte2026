docs/specs/ingestion-ordinances.md
# Ingesta Ordenanzas (Boletines Oficiales)

Este pipeline registra fuentes oficiales por provincia/región. No realiza
scraping profundo de contenido legal; guarda URLs oficiales y metadatos.

## Fuente editable
- `scripts/ingest/sources/ordinances_sources.json`

## Generación
```bash
node scripts/ingest/ordinances_sources.mjs
```

Salida:
- `web/src/data/ingest/ordinances.ts`

## Notas
- `status=needs_review` indica que falta confirmar la fuente oficial.
