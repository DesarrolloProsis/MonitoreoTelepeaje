<template>
  <Navbar></Navbar>
  <div class="flex flex-wrap items-center full-height">
    <ModulosComp
      v-for="(modulo, index) in modulos"
      :key="index"
      :titulo="modulo.titulo"
      :imagen="modulo.imagen"
      :ruta="modulo.ruta"
    ></ModulosComp>
  </div>
  <Footer></Footer>
</template>

<script>
import Navbar from "../components/Navbar";
import ModulosComp from "../components/Moldulo-menu";
import Footer from "../components/Footer-login";
export default {
  components: {
    Navbar,
    ModulosComp,
    Footer,
  },
  data() {
    return {
      modulos: [
        {
          titulo: "Monitoreo de Servicios",
          imagen: "Menu/monitoreo-servicios.png",
          ruta: "/inicio/monitoreo-servicios",
        },
        {
          titulo: "Monitoreo de Carriles",
          imagen: "Menu/monitoreo-carriles.png",
          ruta: "/inicio/monitoreo-carriles",
        },

        {
          titulo: "Monitoreo de Cruces",
          imagen: "Menu/monitoreo-cruces.png",
          ruta: "/inicio/monitoreo-cruces",
        },
        {
          titulo: "Envío de Transacciones",
          imagen: "Menu/envio-transacciones.png",
          ruta: "/inicio/envio-transacciones",
        },
        {
          titulo: "Búsqueda de Cruces",
          imagen: "Menu/busqueda-cruces.png",
          ruta: "/inicio/busqueda-cruces",
        },
        {
          titulo: "Bitácora de Accesos",
          imagen: "Menu/bitacora-accesos.png",
          ruta: "/inicio/bitacora-accesos",
        },
        {
          titulo: "Estatus de TAGs",
          imagen: "Menu/estatus-tags.png",
          ruta: "",
        },
        {
          titulo: "Configuración",
          imagen: "Menu/configuracion.png",
          ruta: "",
        },
      ],
    };
  },
};
</script>
<style scoped>
.full-height {
  height: calc(100vh - 88px);
  min-height: 700px;
  margin-bottom: 40px;
}
@media (max-width: 765px) {
  .full-height {
    height: 100%;
    margin-bottom: 80px;
  }
}
</style>