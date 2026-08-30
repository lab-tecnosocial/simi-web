# Mejoras de imágenes — pendientes para el futuro

Este documento junta lo que quedó **fuera de alcance a propósito** durante la migración de imágenes al pipeline de `astro:assets` (rama `feature/migracion-imagenes-astro`), para no perderlo de vista. No son bugs bloqueantes; son mejoras o decisiones que conviene tomar con más contexto/tiempo.

## 1. `biblioteca/` necesita un flujo de subida para no-técnicos

Hoy `public/assets/images/biblioteca/` (cómics y boletines, ~367 archivos) sigue siendo un árbol de archivos estáticos versionado en Git - deliberadamente **no** se migró al pipeline de Astro, porque hacerlo no resuelve el problema real: agregar un cómic nuevo sigue requiriendo un commit/PR.

Si el objetivo es que miembros no técnicos del equipo puedan sumar contenido sin tocar Git, vale la pena evaluar por separado (es una decisión de producto, no solo técnica):
- Un bucket con subida simple (ej. Cloudflare R2 + un formulario, o Cloudinary) y un pequeño índice/CMS que alimente `biblioteca.json` en vez de que el JSON se edite a mano.
- Quién administra el servicio, costo, y cómo se integra con el build de Astro (fetch en build time vs. en runtime).

## 2. Convenciones de nombres inconsistentes en `equipo/`

30 fotos en `src/assets/images/equipo/` mezclan varios estilos: `AdrianaMamani.webp` (PascalCase), `Alexis_Pelaez.webp` (Underscore_PascalCase), `DANTE_YUPANQUI.webp` (ALL_CAPS), `LOPEZ.webp` (solo apellido en mayúsculas), `nayely_vallejos.webp` (minúsculas). Además `AnaRosaSoriaMontaño.webp` tiene una `ñ` en el nombre de archivo, lo cual es un riesgo de portabilidad/URL-encoding aunque hoy funcione. Vale la pena unificar a un solo patrón (ej. `snake_case` sin tildes/ñ) cuando se toque esa carpeta de nuevo.

## 3. Cache-control / CDN a nivel de hosting

El sitio se despliega en GitHub Pages (servido por Fastly). PageSpeed Insights reportó ~1703 KiB de ahorro potencial en "tiempos de vida de caché eficientes" — esto depende de las cabeceras HTTP que entrega el hosting, no del código del sitio. GitHub Pages no permite configurar `Cache-Control` por archivo; si se quiere exprimir esto, la opción típica es poner Cloudflare (u otro CDN configurable) delante de GitHub Pages.

## 4. Revisar compresión de los banners más pesados

Con el pipeline de Astro ya activo, valdría la pena revisar si el *source* original de los héroes/banners más grandes (`juego/hero_1`, `juego/wawasjugando`, `juego/recursos/anexo`, `juego/zorrito1`, `juego/banner`) puede exportarse a menor peso sin perder calidad visible — Astro ya sirve WebP responsivo, pero el tamaño del archivo fuente sigue afectando tiempo de build y peso del repo.
