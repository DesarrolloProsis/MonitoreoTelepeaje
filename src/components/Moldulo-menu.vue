<template>
  <div v-if="mostrar(nombre)" :class="{inactive:isInactive}"  class="w-1/2 md:w-1/4 p-5">
    <div class="bg-blue-100 m-2 rounded-lg animacion">
      <router-link :to="ruta" tag="div" class="">
      <img class="imagen-modulo  "  :src="require('@/assets/' + imagen)" />
    </router-link>
    <h1 class="text-center py-5 font-titulo font-bold">{{ titulo }}</h1>
    </div>
  </div>
</template>



<script>
//import jwt_decode from "jwt-decode";
import Servicio from '../servicios/Token-Services';
export default {
  name: "ModulosComp",
  props: ["titulo", "imagen", "ruta", "nombre", "isInactive"],
  methods: {
    // token: function (cname) {
    //   var name = cname + "=";
    //   var decodedCookie = decodeURIComponent(document.cookie);
    //   var ca = decodedCookie.split(";");
    //   for (var i = 0; i < ca.length; i++) {
    //     var c = ca[i];
    //     while (c.charAt(0) == " ") {
    //       c = c.substring(1);
    //     }
    //     if (c.indexOf(name) == 0) {
    //       return c.substring(name.length, c.length);
    //     }
    //   }
    //   return "";
    // },
    mostrar: function (nombre) {
      //let token = this.token("Token")
      var decoded = Servicio.obtenerInfoUser()//jwt_decode(token);
      if(decoded[nombre] !== "false"){
        return true;
      }else{
        return false;
      }
    },
  },
};
</script>
<style scoped>
.inactive{
  opacity: .3;
  pointer-events: none;
}
.titulo-modulo {
  text-align: center;
  padding-top: 5px;
  font-weight: 400;
}
.imagen-modulo {
  display: block;
  margin: auto;
  width: 200px;
  background-color:transparent;
}
@media (min-width: 1720px) {
  .imagen-modulo {
    display: block;
    margin: auto;
    width: 230px;
    padding: 15px ;
    background-color: transparent;
  }
}
</style>