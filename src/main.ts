import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useAuthStore } from './stores/auth.ts'

import './styles/index.css'

import { env } from '@/constants/env'

async function prepareApp() {
  if (!env.useMock) {
    return
  }

  const { worker } = await import('./mocks/browser')

  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  })
}

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router)

const authStore = useAuthStore(pinia)

authStore.restoreAuth()

prepareApp().then(() => {
  app.mount('#app')
})
