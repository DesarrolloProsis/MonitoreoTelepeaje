<template>
  <Navbar></Navbar>
  <div class="bg-gray-100 flex flex-wrap items-center full-height">
    <ModulosComp
      v-for="(modulo, index) in modulos"
      :key="index"
      :titulo="modulo.titulo"
      :imagen="modulo.imagen"
      :ruta="modulo.ruta"
      :nombre="modulo.nombre"
      :isInactive="modulo.isInactive"
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
          nombre:"Monitoreo Servicios",
          isInactive:false
        },
        {
          titulo: "Monitoreo de Carriles",
          imagen: "Menu/monitoreo-carriles.png",
          ruta: "/inicio/monitoreo-carriles",
          nombre:"Monitoreo Carriles",
           isInactive:false
        },
        {
          titulo: "Monitoreo de Cruces",
          imagen: "Menu/monitoreo-cruces.png",
          ruta: "/inicio/monitoreo-cruces",
          nombre:"Monitoreo Cruces",
          isInactive:false
        },
        {
          titulo: "Envío de Transacciones",
          imagen: "Menu/envio-transacciones.png",
          ruta: "/inicio/envio-transacciones",
          nombre:"Envio Transacciones",
           isInactive:false
        },
        {
          titulo: "Búsqueda de Cruces",
          imagen: "Menu/busqueda-cruces.png",
          ruta: "/inicio/busqueda-cruces",
          nombre:"Busqueda Cruces",
           isInactive:false
        },
        /* {
          titulo: "Bitácora de Accesos",
          imagen: "Menu/bitacora-accesos.png",
          ruta: "/inicio/bitacora-accesos",
          nombre:"Bitacora Accesos",
           isInactive:false
        }, */
        {
          titulo: "Bitácoras",
          imagen: "Menu/bitacora-accesos.png",
          ruta: "/bitacoras",
          nombre:"Bitacora",
           isInactive:false
        },
        {
          titulo: "Estatus de TAGs",
          imagen: "Menu/estatus-tags.png",
          ruta: "/inicio/estatus-tags",
          nombre:"Estatus Tag",
           isInactive:false
        },
        {
          titulo: "Configuración",
          imagen: "Menu/configuracion.png",
          ruta: "/configuracion",
          nombre:"Configuracion",
           isInactive:false
        },
      ],
    };
  },
};
</script>
<style scoped>
.full-height {
  height: calc(100vh - 85px);
  min-height: 700px;
  margin-bottom: 10px;
}
@media (max-width: 765px) {
  .full-height {
    height: 100%;
    margin-bottom: 80px;
  }
}
</style>

/// mandar eltipo de rol y que me retorne los modulos
//para el router un endpoint donde le envio un dato y me retorna si puedo entrar o no a la ruta