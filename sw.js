const CACHE_VERSION = "code-pretty-offline-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "https://esm.sh/prettier@3.6.2/standalone",
  "https://esm.sh/prettier@3.6.2/plugins/babel",
  "https://esm.sh/prettier@3.6.2/plugins/estree",
  "https://esm.sh/prettier@3.6.2/plugins/typescript",
  "https://esm.sh/prettier@3.6.2/plugins/html",
  "https://esm.sh/prettier@3.6.2/plugins/postcss",
  "https://esm.sh/prettier@3.6.2/plugins/markdown",
  "https://esm.sh/prosemirror-state@1.4.3",
  "https://esm.sh/prosemirror-view@1.41.0",
  "https://esm.sh/prosemirror-model@1.25.0",
  "https://esm.sh/prosemirror-schema-basic@1.2.4",
  "https://esm.sh/prosemirror-history@1.4.1",
  "https://esm.sh/prosemirror-keymap@1.2.3",
  "https://esm.sh/prosemirror-commands@1.7.1"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(cacheFirstThenNetwork(event.request));
});

async function cacheFirstThenNetwork(request) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    if (response && response.ok) {
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    const fallback = await cache.match("./index.html");

    if (request.mode === "navigate" && fallback) {
      return fallback;
    }

    throw error;
  }
}
