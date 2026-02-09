# Region Naming Convention

This document defines the standardized region naming conventions used throughout the Huellas del Norte application.

## Standard Region Names

| Standard Name | Local Name | Country | Notes |
|--------------|------------|---------|-------|
| `Euskadi` | País Vasco / Basque Country | Spain | Basque autonomous community |
| `Iparralde` | País Vasco Francés / French Basque Country | France | Northern Basque Country |
| `Navarra` | Navarra / Nafarroa | Spain | Navarre autonomous community |
| `Cantabria` | Cantabria | Spain | Autonomous community |
| `Asturias` | Asturias / Principáu d'Asturies | Spain | Principality of Asturias |
| `Galicia` | Galicia / Galiza | Spain | Autonomous community |
| `Aragón` | Aragón | Spain | Autonomous community |
| `Cataluña` | Catalunya | Spain | Autonomous community |
| `Castilla y León` | Castilla y León | Spain | Autonomous community |
| `La Rioja` | La Rioja | Spain | Autonomous community |

## Naming Rules

### Do's
- ✅ Use `Euskadi` instead of "País Vasco" or "Basque Country"
- ✅ Use `Iparralde` instead of "País Vasco Francés" or "French Basque Country"
- ✅ Use `Navarra` instead of "Navarre"
- ✅ Use `Asturias` instead of "Principado de Asturias"
- ✅ Use `Cataluña` instead of "Catalunya" or "Catalonia"
- ✅ Use `Castilla y León` instead of "CyL"
- ✅ Use `La Rioja` instead of "Rioja"

### Don'ts
- ❌ Don't mix Spanish and English names
- ❌ Don't use abbreviations like "CyL", "PV", "Nav"
- ❌ Don't use "País Vasco" for Spanish Basque Country
- ❌ Don't use "French Basque Country" - use `Iparralde`

## File-Specific Guidelines

### Data Files (`.ts`)
All region names in TypeScript data files should use the standard names defined above.

### Database Seed Files (`.sql`)
Database entries should also use the standard names for consistency.

### API Responses
API endpoints should return the standardized region names.

### Frontend Display
Frontend components should use translation files (`i18n`) for display purposes, but store and compare using the standard names.

## Examples

### Correct
```typescript
const dog = {
    region: "Euskadi",  // ✅ Correct
    shelterRegion: "Navarra"  // ✅ Correct
};
```

### Incorrect
```typescript
const dog = {
    region: "País Vasco",  // ❌ Incorrect - use "Euskadi"
    shelterRegion: "Navarre"  // ❌ Incorrect - use "Navarra"
};
```

## Related Files

- `web/src/data/adoptionDogs.ts`
- `web/src/data/kennels.ts`
- `web/src/data/hospitality.ts`
- `web/src/data/events.ts`
- `web/src/data/canineOrganizations.ts`
- `web/src/data/routesCatalog.ts`
- `database/schema.sql`
- `database/seed/*.sql`

## Version
1.0 - February 2026
