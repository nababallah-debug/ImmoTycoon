const CACHE = 'space-mining-tycoon-v21';

const CORE = [
  './',
  './index.html',
  './style.css',
  './game.js',
  './manifest.webmanifest',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Pour les fichiers du jeu :
  // toujours essayer le serveur en premier.
  if (
    url.origin === self.location.origin &&
    (
      url.pathname.endsWith('/game.js') ||
      url.pathname.endsWith('/style.css') ||
      url.pathname.endsWith('/index.html') ||
      url.pathname.endsWith('/')
    )
  ) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(response => {
          const copy = response.clone();

          caches.open(CACHE).then(cache => {
            cache.put(event.request, copy).catch(() => {});
          });

          return response;
        })
        .catch(() => caches.match(event.request))
    );

    return;
  }

  // Pour les autres fichiers :
  // réseau d'abord, cache en secours.
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (url.origin === self.location.origin) {
          const copy = response.clone();

          caches.open(CACHE).then(cache => {
            cache.put(event.request, copy).catch(() => {});
          });
        }

        return response;
      })
      .catch(() =>
        caches.match(event.request)
          .then(response =>
            response || caches.match('./index.html')
          )
      )
  );
});
