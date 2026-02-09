docs/specs/ingestion-transport-operators.md
# Ingesta Transporte por Operador

Fuente: normativa oficial de cada operador. El pipeline no copia texto legal,
solo guarda metadatos y enlaces oficiales.

## Fuente editable
- `scripts/ingest/sources/transport_operators.json`

## Generación
```bash
node scripts/ingest/transport_operators.mjs
```

Salida:
- `web/src/data/ingest/transport.ts`

## Reglas
- `status=verified` solo si el enlace oficial está validado.
- El mapa representa puntos informativos (policy points), no estaciones reales.
