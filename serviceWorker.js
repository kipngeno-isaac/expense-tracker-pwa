const staticExpenses = 'personal-expense-tracker-v1';
const assets = [
  "/",
  "/index.html",
  "/register.html",
  "/addExpense.html",
  "/login.html",
  "/app.js",
  "/style.css",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open('personal-expense-tracker-v1').then(cache => {
      cache.addAll(['/', 'app.js'])
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