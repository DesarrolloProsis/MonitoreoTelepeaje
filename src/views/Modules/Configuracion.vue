<template>
  <Navbar/>
  <h1 class="title font-bold font-titulo">Configuración</h1>
  <div class="container mx-auto px-auto pb-20 pt-0 md:px-48 md:pt-10 my-32">
    <div class="flex">
      <ModuloConfiguracion
        v-for="(modulo, index) in modulos"
        :key="index"
        :nombre="modulo.nombre"
        :img_src="modulo.img_src"
        :ruta="modulo.ruta"
      ></ModuloConfiguracion>
    </div>
  </div>
  <Footer/>
</template>
<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import { ref } from 'vue'
import ModuloConfiguracion from "../../components/Modulo-configuracion";
export default {
  components: {
    Navbar,
    Footer,
    ModuloConfiguracion,
  },
  setup() {
    const modulos = ref([
        {
          img_src: "Configuracion/lista-roles.png",
          nombre: "Administración de Roles",
          ruta: "/configuracion/administracion-perfiles",
        },
        {
          img_src: "Configuracion/lista-usuarios.png",
          nombre: "Lista de Usuarios",
          ruta: "/configuracion/lista-usuarios",
        },
         {
          img_src: "Configuracion/lista-usuarios.png",
          nombre: "Antenas",
          ruta: "/configuracion/antenas",
        },
      ])
    
    return {modulos}
  }
}
</script>
<style scoped>
.title {
  text-align: center;
  font-size: 55px;
  padding-top: 20px;
}
@media (max-width: 750px) {
  .title {
    font-size: 20px;
    padding-bottom: 20px;
  }
}
</style>
