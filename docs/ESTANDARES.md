# Estándares de Diseño y Desarrollo - Huellas del Norte V2

Este documento establece las pautas para mantener la consistencia, la elegancia y la calidad técnica del proyecto **Huellas del Norte V2**.

## 1. Filosofía de Diseño

El objetivo es crear una experiencia de usuario **premium**, moderna y emocionalmente conectada, alejándonos de la estética genérica de "directorio".

### Principios Clave
*   **Minimalismo Elegante:** Uso de espacio negativo, tipografía limpia y jerarquía visual clara. Evitar el desorden.
*   **Glassmorphism & Profundidad:** Uso de fondos translúcidos (`backdrop-blur`), bordes sutiles (`border-white/10`) y sombras suaves para crear capas y profundidad sobre fondos oscuros.
*   **Paleta de Colores Oscura & Vibrante:**
    *   **Fondo:** Gradientes oscuros (`from-slate-900 via-slate-800 to-slate-900`).
    *   **Acentos:** Colores vibrantes pero integrados (Emerald para éxito/naturaleza, Amber para calidez/hoteles, Blue para confianza, Rose/Pink para cuidado).
    *   **Texto:** Blanco para títulos, Slate-300/400 para cuerpo. Evitar gris puro o negro puro.
*   **Micro-interacciones:** Hover effects suaves (`hover:scale-105`, `transition-all`), animaciones de entrada (`animate-fade-in-up`).

### Componentes Visuales Recurrentes
*   **Cards:** Fondo `bg-white/5`, borde `border-white/10`, backdrop-blur.
*   **Botones:** Gradientes sutiles o colores sólidos con `shadow-lg` del mismo color (`shadow-emerald-500/20`). Bordes redondeados agresivos (`rounded-xl` o `rounded-full`).
*   **Iconografía:** Uso exclusivo de **Lucide React** para consistencia. Trazos finos y limpios.

## 2. Estándares de Desarrollo (Frontend)

### Stack Tecnológico
*   **Framework:** Next.js 16+ (App Router).
*   **Estilos:** Tailwind CSS v4.
*   **Lenguaje:** TypeScript estricto.
*   **Mapas:** MapLibre GL JS (alternativa libre a Mapbox/Google Maps).

### Estructura de Directorios (Web)
```
src/
├── app/                 # Rutas (App Router)
│   ├── adopcion/       # Página de Adopción
│   ├── guarderias/     # Página de Guarderías
│   ├── apadrinar/      # Página de Apadrinamiento
│   └── globals.css     # Estilos globales
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base (si los hubiera)
│   ├── HomeMap.tsx     # Mapa interactivo principal
│   └── navbar.tsx      # Navegación principal
├── data/               # Datos estáticos (Mock DB)
│   ├── adoptionDogs.ts
│   ├── kennels.ts
│   └── sponsorship.ts
└── lib/                # Utilidades
```

### Convenciones de Código
1.  **Componentes Funcionales:** Siempre usar `export default function NombreComponente() {}`.
2.  **Server Components por defecto:** Usar `"use client"` solo cuando sea necesario (estado, hooks, interactividad del navegador).
3.  **Tipado:** Definir interfaces para todos los datos (ej. `AdoptionDog`, `Kennel`) y exportarlas desde el archivo de datos correspondiente.
4.  **Imports:** Usar alias `@/` para imports internos.

## 3. Guía de Mapas

Los mapas son una parte central de la experiencia. Usamos **MapLibre GL JS**.

### Implementación Estándar (`HomeMap.tsx`, `AdopcionMapPage`)
*   **Estilo:** Dark Matter de CartoDB (`https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json`) para integrar con el tema oscuro.
*   **Marcadores:** HTML Markers personalizados (no los default azules).
    *   Usar `div` con CSS para crear puntos brillantes (`box-shadow`) o iconos SVG.
    *   Colores semánticos: Rojo (Urgente/Peligro), Verde (Adopción/Verificado), Ámbar (Alojamientos).
*   **Interacción:**
    *   Popups al hacer clic con información resumida.
    *   Botón para "Ver Mapa Completo" si es un widget.
*   **Datos:** Todos los objetos mapeables deben tener una propiedad `coordinates: { lat: number, lng: number }`.

## 4. Gestión de Datos (Prototipado)

Mientras no haya backend, los datos residen en `src/data/`.
*   **Estructura:** Arrays de objetos constantes exportados.
*   **IDs:** Strings únicos descriptivos (`adopt-001`, `eusk-biz-001`).
*   **Imágenes:** Usar placeholders de alta calidad (Unsplash) o rutas a `public/images/`.

## 5. Checklist para Nuevas Funcionalidades

Antes de dar por terminada una tarea, verificar:
- [ ] ¿El diseño respeta el modo oscuro y la paleta de colores?
- [ ] ¿Es responsive (móvil/desktop)?
- [ ] ¿Tiene estados de carga/vacío (empty states) elegantes?
- [ ] ¿Los textos son legibles y con buen contraste?
- [ ] ¿Se han añadido tipos TypeScript correctos?
