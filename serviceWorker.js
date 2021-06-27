self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open('personal-expense-tracker-v1').then(cache => {
      cache.addAll(['./', 'app.js'])
    })
  )
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
});
