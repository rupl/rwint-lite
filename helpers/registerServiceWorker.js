const registerServiceWorker = () => {
  const dev = process.env.NODE_ENV !== 'production'
  const staging = window.location && window.location.origin && window.location.origin.indexOf('dev.m.rwdev.org') !== -1
  if (!dev && !staging && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => console.error('Service worker registration failed', err))
  }
}
export default registerServiceWorker
