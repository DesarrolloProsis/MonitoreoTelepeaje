import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import Notification from '@kyvg/vue3-notification'
import { createPinia } from 'pinia'




createApp(App)
.use(router)
.use(createPinia())
.use(Notification)
.mount('#app')

