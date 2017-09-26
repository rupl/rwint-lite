/* global importScripts, Request, toolbox */
importScripts('/static/sw-toolbox.js')
toolbox.router.default = toolbox.networkFirst
toolbox.router.get('/static/*', toolbox.cacheFirst)
toolbox.precache([
  '/',
  '/report/listing',
  '/country/listing',
  '/disaster/listing',
  '/job/listing',
  '/training/listing',
  '/static/rw-logo.svg',
  '/static/rw-logo-mobile.svg',
  '/static/offline.html'
])

toolbox.router.get('/(.*)', function (req, vals, opts) {
  if (req.url.indexOf('/static/') !== -1) {
    return toolbox.cacheOnly(req, vals, opts)
  }
  return toolbox.cacheFirst(req, vals, opts)
    .catch(function (error) {
      if (req.method === 'GET' && req.headers.get('accept').includes('text/html')) {
        return toolbox.cacheOnly(new Request('/static/offline.html'), vals, opts)
      }
      throw error
    })
})

toolbox.router.post(/^https:\/\/api.reliefweb.int\//, function (req, vals, opts) {
  return toolbox.cacheFirst(req, vals, opts)
})
