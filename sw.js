// Offline support: serve the game from the cache, and refresh the cache in the background when online.
const CACHE = 'llama-rocket-v1';
const FILES = [
  './', 'index.html', 'manifest.webmanifest', 'icon.svg', 'js/version.js',
  'js/vendor/qrcode.js', 'js/vendor/jsQR.js',
  'js/core.js', 'js/data.js', 'js/art.js', 'js/house.js', 'js/bay.js', 'js/builder.js',
  'js/flight.js', 'js/planet.js', 'js/net.js', 'js/coop.js', 'js/main.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).pathname.endsWith('version.json')) return;   // always ask the network: used to spot new versions
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(e.request, { ignoreSearch: true });
    const fresh = fetch(e.request).then(res => { if (res.ok) cache.put(e.request, res.clone()); return res; }).catch(() => cached);
    return cached || fresh;
  }));
});
