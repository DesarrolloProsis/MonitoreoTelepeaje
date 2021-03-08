import { createRouter, createWebHistory } from "vue-router"
import Login from '@/views/Login.vue'
import Menu from '@/views/Menu.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path:'/inicio',
        name: 'Menu',
        component: Menu
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;