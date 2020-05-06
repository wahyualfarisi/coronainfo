var cacheName = 'covid-19-update';
var filesToCache = [
    '/',
    '/index.html',
    '/dist/style.css',
    '/dist/main.js',
    'dist/bundle.js',
    'img/social-distancing.jpeg',
    'img/indonesia.svg'
];


self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return  cache.addAll(filesToCache)
        })
    )
})

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request)
        })
    )
})