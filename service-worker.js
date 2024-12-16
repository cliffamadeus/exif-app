// service-worker.js

// Define the cache name
const CACHE_NAME = 'weather-exif-cache-v1';
const CACHE_URLS = [
    '/',
    '/index.html',
    '/styles.css',  // Add your CSS file
    '/script.js',    // Add your JavaScript file
    '/images/placeholder.png', // Add any placeholder images
    '/images/weather-icons/',  // Add weather icons if needed
    'https://openweathermap.org/img/wn/',  // If you want to cache the weather icons
    // Add any other resources you want to cache here
];

// Install the service worker and cache necessary files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(CACHE_URLS);
            })
            .catch((error) => {
                console.error('Failed to cache assets during service worker install:', error);
            })
    );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercept fetch requests and return cached assets if available
self.addEventListener('fetch', (event) => {
    // Handle all fetch requests and try to serve from cache first
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached response if available
                    return cachedResponse;
                }
                
                // Otherwise, fetch from network and cache the response
                return fetch(event.request).then((networkResponse) => {
                    if (event.request.url.startsWith('http')) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse.clone());
                        });
                    }
                    return networkResponse;
                });
            })
            .catch((error) => {
                console.error('Failed to fetch:', error);
            })
    );
});
