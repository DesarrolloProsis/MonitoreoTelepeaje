import { createRouter, createWebHistory } from "vue-router";
//import axios from "axios";
import Login from "@/views/Login.vue";
import Menu from "@/views/Menu.vue";
import MonitoreoServicios from "@/views/Modules/MonitoreoServicios.vue";
import MonitoreoCarriles from "@/views/Modules/MonitoreoCarriles.vue";
import BitacoraAlarmas from "@/views/Modules/BitacoraAlarmas.vue";
import MonitoreoCruces from "@/views/Modules/MonitoreoCruces.vue";
import EnvioTransacciones from "@/views/Modules/EnvioTransacciones.vue";
import BusquedaTransacciones from "@/views/Modules/BusquedaTransacciones.vue";
import BitacoraAccesos from "@/views/Modules/BitacoraAccesos.vue";
import EstatusTags from "@/views/Modules/EstatusTags.vue";
import Configuracion from "@/views/Modules/Configuracion.vue";
import AdminPerfiles from "@/views/Modules/AdminPerfiles.vue";
import ListaUsuarios from "@/views/Modules/ListaUsuarios.vue";
import Bitacoras from "@/views/Modules/Bitacoras.vue";
import BitacoraAntifraude from "@/views/Modules/BitacoraAntifraude.vue";
import BitacoraListas from "@/views/Modules/BitacoraListas.vue"
import Servicio from "@/servicios/Token-Services.js"
const routes = [{
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      requiresCookie: false
    },
    beforeEnter: (to, from, next) => {
      if (Servicio.obtenerToken()) {
        next()
      } else {        
        document.cookie = "TipoUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "SameSite=None; Secure;";
        document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "SameSite=None; Secure;";
        next();
      }
    }
  },
  {
    path: "/inicio",
    name: "Menu",
    component: Menu,
    meta: {
      requiresCookie: true,
    }
  },
  {
    path: "/inicio/monitoreo-servicios",
    name: "MonitoreoServicios",
    component: MonitoreoServicios,
    meta: {
      requiresCookie: true,
      nombre:"Monitoreo Servicios"
    }
  },
  {
    path: "/inicio/monitoreo-carriles",
    name: "MonitoreoCarriles",
    component: MonitoreoCarriles,
    meta: {
      requiresCookie: true,
      nombre:"Monitoreo Carriles"
    }
  },
  {
    path: "/inicio/monitoreo-carriles/bitacora-alarmas",
    name: "BitacoraAlarmas",
    component: BitacoraAlarmas,
    meta: {
      requiresCookie: true,
      nombre:"Monitoreo Carriles"
    }
  },
  {
    path: "/inicio/monitoreo-cruces",
    name: "MonitoreoCruces",
    component: MonitoreoCruces,
    meta: {
      requiresCookie: true,
      nombre:"Monitoreo Cruces"
    }
  },
  {
    path: "/inicio/envio-transacciones",
    name: "MonitoreoTransacciones",
    component: EnvioTransacciones,
    meta: {
      requiresCookie: true,
      nombre:"Envio Transacciones"
    }
  },
  {
    path: "/inicio/busqueda-transacciones",
    name: "BusquedaTransacciones",
    component: BusquedaTransacciones,
    meta: {
      requiresCookie: true,
      nombre:"Busqueda Transacciones"
    }
  },
  {
    path: "/inicio/bitacora-accesos",
    name: "Bitacora Accesos",
    component: BitacoraAccesos,
    meta: {
      requiresCookie: true,
      nombre:"Bitacora Accesos"
    }
  },
  {
    path: "/inicio/bitacora-antifraude",
    name: "Bitacora Antifraude",
    component: BitacoraAntifraude,
    meta: {
      requiresCookie: true,
      nombre:"BitacoraAntifraude"
    }
  },
  {
    path: "/inicio/bitacora-listas",
    name: "Bitacora Listas",
    component: BitacoraListas,
    meta: {
      requiresCookie: true,
      nombre:"BitacoraListas"
    }
  },
  {
    path: "/inicio/estatus-tags",
    name: "EstatusTags",
    component: EstatusTags,
    meta: {
      requiresCookie: true,
      nombre:"Estatus Tag"
    }
  },
  {
    path: "/bitacoras",
    name: "Bitacoras",
    component: Bitacoras,
    meta: {
      requiresCookie: true,
      nombre:"Bitacoras"
    }
  },
  {
    path: "/configuracion",
    name: "Configuracion",
    component: Configuracion,
    meta: {
      requiresCookie: true,
      nombre:"Configuracion"
    }
  },
  {
    path: "/configuracion/administracion-perfiles",
    name: "AdministracionPerfilUsuario",
    component: AdminPerfiles,
    meta: {
      requiresCookie: true
    }
  },
  {
    path: "/configuracion/lista-usuarios",
    name: "ListaUsuarios",
    component: ListaUsuarios,
    meta: {
      requiresCookie: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.matched.some(record => record.meta.requiresCookie)) {    
    //if (getCookie("TipoUser") != "" && getCookie("Token") != "") {
    if (Servicio.obtenerToken()) {
        next()
    } else {        
      //document.cookie = "TipoUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "SameSite=None; Secure;";
      //document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "SameSite=None; Secure;";
      next('/')      
    }
  } else {    
    next();
  }
})

export default router;