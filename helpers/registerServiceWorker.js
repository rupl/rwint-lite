const registerServiceWorker = () => {
  const dev = process.env.NODE_ENV !== 'production'
  if (!dev && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => console.error('Service worker registration failed', err))
  }
}
export default registerServiceWorker
