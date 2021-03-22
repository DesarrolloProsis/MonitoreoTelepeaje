<template>
  <Navbar></Navbar>
  <h1 class="title">Configuración</h1>
  <div class="container mx-auto px-auto pb-20 pt-0 md:px-48 md:pt-10 ">
    <div class="flex flex-wrap ">
      <ModuloConfiguracion
        v-for="(modulo, index) in modulos"
        :key="index"
        :nombre="modulo.nombre"
        :img_src="modulo.img_src"
        :ruta="modulo.ruta"
      ></ModuloConfiguracion>
    </div>
  </div>
  <Footer></Footer>
</template>
<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import ModuloConfiguracion from "../../components/Modulo-configuracion";
export default {
  components: {
    Navbar,
    Footer,
    ModuloConfiguracion
  },
  data() {
    return {
      modulos: [
        {
          img_src: "Configuracion/creacion-perfiles.png",
          nombre: "Creación de Perfiles",
          ruta: "/configuracion/perfil-usuario",
        },
        {
          img_src: "Configuracion/lista-perfiles.png",
          nombre: "Lista de Perfiles",
          ruta: "/configuracion/lista-perfiles",
        },
         {
          img_src: "Configuracion/registro-usuarios.png",
          nombre: "Registro de Usuarios",
          ruta: "/configuracion/registro-usuarios",
        },
         {
          img_src: "Configuracion/lista-usuarios.png",
          nombre: "Lista de Usuarios",
          ruta: "/configuracion/lista-usuarios",
        },
        
      ],
    };
  },
};
</script>
<style scoped>
.title {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
}
@media (max-width: 750px) {
  .title {
    font-size: 20px;
    padding-bottom: 20px;
  }
}
</style>