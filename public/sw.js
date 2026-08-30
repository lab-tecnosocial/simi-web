const CACHE_NAME = 'simi-v1';

const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/assets/css/style.css',
  '/assets/images/brand/logo_simi2025.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo interceptar peticiones del mismo origen
  if (url.origin !== self.location.origin) return;

  // CacheFirst para assets estáticos (imágenes, CSS, fuentes locales)
  if (
    request.destination === 'image' ||
    request.destination === 'style' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached ||
        fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
      )
    );
    return;
  }

  // NetworkFirst para páginas HTML
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
  }
});
