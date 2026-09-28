# Simi Web 🐸

Sitio web oficial de **Simi**, un proyecto de revitalización cultural y lingüística que promueve el aprendizaje del **quechua de Cochabamba** de forma amigable, accesible y gratuita.

## ¿Qué es Simi?

Simi es una iniciativa voluntaria y multidisciplinaria (programación, lingüística y comunicación social) que busca fortalecer el quechua en contextos digitales. Su mascota es una ranita que ama difundir su lengua materna.

Este repositorio contiene el **sitio web** del proyecto. La aplicación móvil complementaria está disponible en [Google Play](https://play.google.com/store/apps/details?id=org.labtecnosocial.simi) con más de 10K descargas.

## Contenido del sitio

- **Inicio**: presentación del proyecto y enlace de descarga de la app.
- **Juegos educativos**:
  - *Salva a Simi*: juego del ahorcado con vocabulario en quechua.
  - *Tinkuchispa pukllay*: juego de emparejamiento palabra-imagen con temas como números, saludos, animales y familia.
  - *Sopa de letras* y *Glosario* con audio y filtrado por tema.
- **Simiwan Pukllana**: página del juego de mesa físico, con recursos descargables y los servicios del colectivo editorial Atuq Yachachiq (ilustración, talleres y traducción quechua-castellano).
- **Sobre nosotros**: misión, visión y equipo.
- **Apóyenos**: página de donaciones para Bolivia.

## Stack técnico

- **Astro** (páginas `.astro` con islas de React).
- **React** (componentes interactivos como los juegos).
- **Tailwind CSS** con tokens de marca propios: `qumir` (verde) y `futuro` (texto).
- **PWA**: `manifest.json` + service worker (`public/sw.js`) con estrategias CacheFirst para assets y NetworkFirst para documentos.
- **Analytics**: Google Analytics 4 y Google Tag Manager inyectados desde `src/layouts/PageLayout.astro`, con helper global `window.trackEvent`.
- **Imágenes**: pipeline de `astro:assets` con resolución dinámica vía `getImageModule` en `src/lib/images.js`.

## Estructura del proyecto

```
src/
  components/        # Componentes React (Header, Hero, juegos, secciones)
    juegos/          # Hangman, Glossary, MatchingGame, WordPuzzleGame, etc.
    simiwanpullkana/ # Componentes de la página del juego de mesa
    sobreNosotros/   # Contenido de la sección "Acerca de Simi"
  layouts/           # PageLayout.astro (shell global con analytics y PWA)
  pages/             # Rutas: index, apoyenos, simiwanpullkana, etc.
  data/              # JSONs de contenido (posts, participantes, vocabulario)
  assets/images/     # Imágenes procesadas por astro:assets
public/
  manifest.json      # Configuración PWA
  sw.js              # Service worker
  assets/            # Assets estáticos (CSS, imágenes públicas)
```

## Desarrollo

```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # build de producción
npm run preview    # previsualizar el build
```

## Despliegue

El sitio se despliega en **GitHub Pages** y está disponible en [simiquechua.app](https://simiquechua.app/).
