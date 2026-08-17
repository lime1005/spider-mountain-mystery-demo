importScripts('./demo-assets.js?v=trial-demo-0.1.0');

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  const scopePath = new URL(self.registration.scope).pathname;
  const appPrefix = `${scopePath}app/`;
  if (!requestUrl.pathname.startsWith(appPrefix)) {
    return;
  }

  const relativePath = decodeURIComponent(requestUrl.pathname.slice(appPrefix.length));
  const file = self.DEMO_FILES[relativePath];
  if (!file) {
    event.respondWith(new Response('Not found', { status: 404 }));
    return;
  }

  const bytes = Uint8Array.from(atob(file.data), (character) => character.charCodeAt(0));
  event.respondWith(new Response(bytes, {
    status: 200,
    headers: {
      'Content-Type': file.type,
      'Cache-Control': 'no-store',
    },
  }));
});
