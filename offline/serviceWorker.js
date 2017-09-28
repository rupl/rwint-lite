// /* global caches, importScripts, Request, self, toolbox */
// importScripts('/static/sw-toolbox.js')

// var cacheName = 'static-v1.1'
// var expectedCaches = [cacheName]
// var cacheFiles = [
//   './static/rw-logo.svg',
//   './static/rw-logo-mobile.svg',
//   './static/offline.html',
//   './static/favicon-16x16.png',
//   './static/favicon-32x32.png'
// ]

// self.addEventListener('install', function (e) {
//   e.waitUntil(
//     caches.open(cacheName).then(function (cache) {
//       return cache.addAll(cacheFiles.map(url => new Request(url, {credentials: 'same-origin'})))
//     })
//   )
// })

// self.addEventListener('activate', event => {
//   // delete any caches that aren't in expectedCaches
//   event.waitUntil(
//     caches.keys().then(keys => Promise.all(
//       keys.map(key => {
//         if (!expectedCaches.includes(key)) {
//           return caches.delete(key)
//         }
//       })
//     ))
//   )
// })

// toolbox.router.get('/(.*)', function (req, vals, opts) {
//   return toolbox.cacheFirst(req, vals, opts)
//     .catch(function (error) {
//       console.log('catch')
//       if (req.method === 'GET' && req.headers.get('accept').includes('text/html')) {
//         return caches.match('./static/offline.html')
//       }
//       throw error
//     })
// })

// toolbox.router.post(/^https:\/\/api.reliefweb.int\//, function (req, vals, opts) {
//   return toolbox.networkFirst(req, vals, opts)
// })
