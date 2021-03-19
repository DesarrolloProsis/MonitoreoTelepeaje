import { createRouter, createWebHistory } from "vue-router"
import Login from '@/views/Login.vue'
import Menu from '@/views/Menu.vue'
import MonitoreoServicios from '@/views/Modules/MonitoreoServicios.vue'
import MonitoreoCarriles from '@/views/Modules/MonitoreoCarriles.vue'
import BitacoraAlarmas from "@/views/Modules/BitacoraAlarmas.vue"
import MonitoreoCruces from '@/views/Modules/MonitoreoCruces.vue'
import EnvioTransacciones from '@/views/Modules/EnvioTransacciones.vue'
import BusquedaCruces from '@/views/Modules/BusquedaCruces.vue'
import BitacoraAccesos from '@/views/Modules/BitacoraAccesos.vue'
import EstatusTags from '@/views/Modules/EstatusTags.vue'
import Configuracion from '@/views/Modules/Configuracion.vue'
import PerfilUsuario from '@/views/Modules/PerfilUsuario.vue'
import ListaPerfiles from '@/views/Modules/ListaPerfiles.vue'
import ListaUsuarios from '@/views/Modules/ListaUsuarios.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/inicio',
        name: 'Menu',
        component: Menu
    },
    {
        path: '/inicio/monitoreo-servicios',
        name:'MonitoreoServicios',
        component:MonitoreoServicios
    },
    {
        path: '/inicio/monitoreo-carriles',
        name:'MonitoreoCarriles',
        component:MonitoreoCarriles
    },
    {
        path: '/inicio/monitoreo-carriles/bitacora-alarmas',
        name:'BitacoraAlarmas',
        component:BitacoraAlarmas
    },
    {
        path: '/inicio/monitoreo-cruces',
        name:'MonitoreoCruces',
        component:MonitoreoCruces
    },
    {
        path: '/inicio/envio-transacciones',
        name:'MonitoreoTransacciones',
        component:EnvioTransacciones
    },
    {
        path: '/inicio/busqueda-cruces',
        name:'BusquedaCruces',
        component:BusquedaCruces
    },
    {
        path: '/inicio/bitacora-accesos',
        name:'BitacoraAccesos',
        component:BitacoraAccesos
    },
    {
        path: '/inicio/estatus-tags',
        name:'EstatusTags',
        component:EstatusTags
    },
    {
        path: '/configuracion',
        name:'Configuracion',
        component:Configuracion
    },
    {
        path: '/configuracion/perfil-usuario',
        name:'PerfilUsuario',
        component:PerfilUsuario
    },
    {
        path: '/configuracion/lista-perfiles',
        name:'ListaPerfilUsuario',
        component:ListaPerfiles
    },
    {
        path: '/configuracion/lista-usuarios',
        name:'ListaUsuarios',
        component:ListaUsuarios
    },
  

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;