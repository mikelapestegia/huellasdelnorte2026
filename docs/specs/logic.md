1. specs/logic.md
Este archivo define las reglas de negocio para el manejo de rutas, alertas y procesamiento de medios.
# 🧠 Lógica de Negocio (Business Logic Specs)

Este documento define las reglas invariables para el procesamiento de datos en "Huellas del Norte".

## 1. Gestión de Rutas y Geolocalización
*   **Fuente de Verdad:** Las rutas provienen de Wikiloc y scraping de usuarios. Se almacenan como `LINESTRING` o `MULTIPOLYGON` en formato geoespacial.
*   **Validación Pet-Friendly:** Una ruta solo se marca como `apta_perros` si:
    1.  Tiene el tag explícito "perros", "dogs" o "canino".
    2.  No cruza zonas de exclusión (Parques Nacionales con prohibición estricta) definidas en la tabla `zonas_restriccion`.
*   **Cálculo de Dificultad:** Si no hay dato de origen, calcular basado en: `desnivel_acumulado / distancia_total`.

## 2. Sistema de Alertas (Perros Perdidos/Adopción)
*   **Deduplicación Crítica:** Antes de insertar una nueva alerta (`alertas_perros`), el sistema debe ejecutar la función de matching:
    *   **Ventana temporal:** +/- 7 días desde el avistamiento.
    *   **Radio geográfico:** 5 km del punto de `ubicacion_hecho`.
    *   **Similitud Visual:** Distancia de vectores < 0.2 (usando embeddings de imagen).
    *   *Acción:* Si hay coincidencia, marcar como `posible_duplicado` y vincular al ID original; no crear alerta nueva activa.
*   **Anonimización:** Los datos de contacto en alertas públicas deben ser ofuscados (hash) o intermediados por el chat de la plataforma. Nunca exponer teléfonos reales en el frontend.

## 3. Procesamiento de Imágenes
*   **Almacenamiento:** Las imágenes **NUNCA** se guardan en la base de datos ni en el disco local de la instancia.
    *   Subir a **OCI Object Storage** (Bucket: `huellas-media`).
    *   Guardar solo la URL pública en la base de datos.
*   **Metadata IA:** Al subir una foto (avistamiento o lugar), se debe procesar para extraer:
    *   *Raza estimada* (para búsqueda).
    *   *Vector Embedding* (para búsqueda por similitud visual).
    *   *Tags automáticos* (ej. "playa", "bosque", "vallado").

## 4. Ingestión de Datos (Scrapers)
*   **Frecuencia:** Los scrapers (YouTube, Instagram, BOE) deben ejecutarse secuencialmente, nunca en paralelo, para respetar el límite de RAM.
*   **Furgoperfectos:** La ubicación de furgonetas itinerantes se infiere de hashtags recientes (#Bilbao, #Asturias) si no hay geo-tag explícito.
