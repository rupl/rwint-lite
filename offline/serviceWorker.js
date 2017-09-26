/* global caches, importScripts, Request, self, toolbox */
importScripts('/static/sw-toolbox.js')

var cacheName = 'v1'
var cacheFiles = [
  './static/rw-logo.svg',
  './static/rw-logo-mobile.svg',
  './static/offline.html'
]

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(cacheFiles.map(url => new Request(url, {credentials: 'same-origin'})))
    })
  )
})

toolbox.router.get('/(.*)', function (req, vals, opts) {
  return toolbox.cacheFirst(req, vals, opts)
    .catch(function (error) {
      console.log('catch')
      if (req.method === 'GET' && req.headers.get('accept').includes('text/html')) {
        return caches.match('./static/offline.html')
      }
      throw error
    })
})

toolbox.router.post(/^https:\/\/api.reliefweb.int\//, function (req, vals, opts) {
  return toolbox.cacheFirst(req, vals, opts)
})
