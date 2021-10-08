<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-0 pb-100">
    <h1 class="title-center font-titulo font-bold pb-4">Transacciones de Telepeaje en Tiempo Real</h1>
    <div class="flex flex-wrap bg-blue">
      <div class="flex-none filter-style">
        <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza()"></FormTramoPlaza>
      </div>
      <div class="flex-none mt-1 filter-style">
        <button class="btn-buscar">Buscar</button>
      </div>
      <div class="flex-none mt-1 ml-right text-white">
        Tiempo
        <input type="text">
        
        <!-- <button class="btn-carriles ml-right">Descargar Excel</button> -->
      </div>
    </div>
    <TablaCruces :dataCruces="cruces"></TablaCruces>
  </div>
  <Footer></Footer>
</template>
<script>
import FormTramoPlaza from '../../components/Form-tramoplaza.vue';
import TablaCruces from "../../components/Tabla-cruces.vue";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
export default {
  name: "MonitoreoCruces",
  components: { TablaCruces, Navbar, Footer, FormTramoPlaza},
  data() {
    return {
      cruces: [
        {
          plaza: "Aeropuerto",
          carril: "A01",
          fecha_cruce: "2021/01/01 14:00:00",
          id_tag: "IMD1000000",
          clase_marcada: "Auto",
        },
        {
          plaza: "Aeropuerto",
          carril: "A01",
          fecha_cruce: "2021/01/01 14:00:00",
          id_tag: "IMD1000000",
          clase_marcada: "Auto",
        },
        {
          plaza: "Aeropuerto",
          carril: "A01",
          fecha_cruce: "2021/01/01 14:00:00",
          id_tag: "IMD1000000",
          clase_marcada: "Auto",
        },
        {
          plaza: "Aeropuerto",
          carril: "A01",
          fecha_cruce: "2021/01/01 14:00:00",
          id_tag: "IMD1000000",
          clase_marcada: "Auto",
        },
      ],
    };
  },
};
</script>
<style scoped>
.pb-100 {
  padding-bottom: 100px;
}
.title-center {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
}
.bg-blue {
  background-color: #0195b0;
  padding: 10px 5px;
}
.ml-right {
  display: block;
  margin-left: auto;
  margin-right: 10px;
}
.filter-style {
  color: white;
  font-size: 16px;
  margin-left: 10px;
}
.filter-style input {
  margin-left: 20px;
  color: black;
  border: 1px solid black;
  padding: 0px 5px;
}

.btn-carriles {
  background-color: #017296;
  color: white;
  font-size: 15px;
  height: 100%;
  padding: 0px 5px;
  border: 1px solid black;
  border-radius: 5px;
}
.btn-buscar {
  background-color: #017296;
  color: white;
  height: 100%;
  padding: 0px 10px;
  border-radius: 5px;
  border: 1px solid black;
}
.btn-buscar:focus {
  outline: 0;
}
.btn-carriles:focus {
  outline: 0;
}
.color-black {
  color: black !important;
}
.color-black:focus {
  outline: 0;
}
@media (max-width: 769px) {
  .filter-style {
    padding-top: 5px;
    padding-bottom: 15px;
  }
  .btn-carriles {
    background-color: #017296;
    color: white;
    font-size: 15px;
    padding: 10px 5px;
    border: 1px solid black;
    border-radius: 5px;
  }
}
</style>
