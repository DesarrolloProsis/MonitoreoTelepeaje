import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import Multiselect from 'vue-multiselect'
// Componente Multiselect
createApp.component('multiselect', Multiselect)
createApp(App).use(router).mount('#app')