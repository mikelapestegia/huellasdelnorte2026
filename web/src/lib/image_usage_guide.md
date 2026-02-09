# Uso de Imágenes en Huellas del Norte

## Organización de imágenes

Las imágenes se almacenan en la carpeta `public/images/` y están organizadas en las siguientes subcarpetas:

- `assistance-dogs/` - Imágenes de perros guía y de asistencia
- `breeds/` - Imágenes de razas de perros autóctonas del norte peninsular
- `outdoor/` - Imágenes de actividades al aire libre con perros
- `services/` - Imágenes de servicios veterinarios y caninos

## Cómo añadir nuevas imágenes

1. Guarda la imagen en la subcarpeta correspondiente
2. Asegúrate de que la imagen tenga una resolución adecuada para web (máximo 1920px de ancho)
3. Optimiza el tamaño de archivo (máximo 200KB cuando sea posible)
4. Usa formatos WebP o JPEG para imágenes fotográficas, PNG para gráficos con transparencias

## Componentes de imágenes

La aplicación incluye varios componentes para mostrar imágenes de forma efectiva:

- `CategoryImages.tsx` - Muestra imágenes por categorías
- `NorthernBreedsSection.tsx` - Muestra información sobre razas autóctonas
- `ServicesSection.tsx` - Muestra servicios caninos con imágenes
- `OutdoorActivitiesSection.tsx` - Muestra rutas y actividades con imágenes

## Fuentes de imágenes

Las imágenes deben provenir de fuentes con licencias apropiadas para uso comercial, como:

- Unsplash (Creative Commons Zero)
- Pixabay (licencia gratuita para uso comercial)
- Pexels (licencia gratuita para uso comercial)
- Imágenes propias con derechos claros

## Buenas prácticas

- Siempre verificar la licencia de una imagen antes de usarla
- Mantener las imágenes organizadas por categorías
- Usar nombres de archivo descriptivos y en minúsculas con guiones
- Incluir texto alternativo significativo para accesibilidad
- Considerar el tamaño de carga de imágenes para optimizar el rendimiento
