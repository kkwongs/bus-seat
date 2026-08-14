import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useAuthStore } from './stores/auth.ts'

import './styles/index.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router)

const authStore = useAuthStore(pinia)

authStore.restoreAuth()

app.mount('#app')
