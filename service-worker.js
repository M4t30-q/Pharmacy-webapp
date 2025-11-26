const CACHE_NAME = "farmacia-pwa-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.svg",
  // Tus iconos y rutas clave:
  "/icons/pwa-192.png",
  "/icons/pwa-512.png",
  "/icons/pwa-maskable.png",
  "/src/style.css"
];

// Instalación y caché de recursos esenciales
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Elimina cachés antiguos en actualizaciones
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Intercepción de 'fetch' para recursos estáticos
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
