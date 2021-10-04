import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import Notifications from '@kyvg/vue3-notification'
createApp(App).use(router).mount('#app')
App.use(Notifications)
