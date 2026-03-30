import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Prevent FOUC in Vite dev mode.
// body starts hidden via inline CSS in index.html (visibility:hidden).
// Wait for UnoCSS to inject its <style> tags, then reveal the page.
const observer = new MutationObserver(() => {
  // UnoCSS injects at least 1 style tag with utility rules
  if (document.querySelectorAll('style').length > 1) {
    document.body.classList.add('uno-ready')
    observer.disconnect()
  }
})
observer.observe(document.head, { childList: true })
// Safety: reveal after 3s even if detection fails
setTimeout(() => {
  observer.disconnect()
  document.body.classList.add('uno-ready')
}, 3000)
