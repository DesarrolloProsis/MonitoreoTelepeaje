<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-0 pb-100">
    <h1 class="title-center font-titulo font-bold pb-4">Transacciones de Telepeaje en Tiempo Real</h1>
    <div class="flex flex-wrap bg-blue">
      <div class="flex-none ">
        <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :tipo="'Antifraude'"></FormTramoPlaza>
      </div>
      <div class="flex-none mt-1 filter-style">
        <button class="btn-buscar">Buscar</button>
      </div>
      <div class="flex-none mt-1 ml-right text-white">
        Tiempo de actualizacion
        <input type="text" class="text-center" placeholder="3 min">
        No. Transacciones:
        <input type="text" class="text-center" placeholder="30">
        <!-- <button class="btn-carriles ml-right">Descargar Excel</button> -->
      </div>
    </div>
    <TablaCruces :dataCruces="cruces"></TablaCruces>
  </div>
  <Footer></Footer>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import FormTramoPlaza from '../../components/Form-tramoplaza.vue';
import TablaCruces from "../../components/Tabla-cruces.vue";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import axios from "axios";
export default {
  name: "MonitoreoCruces",
  components: { TablaCruces, Navbar, Footer, FormTramoPlaza},
  data() {
    return {
      tramo:'',
      plaza:'',
      cruces: [],
    };
  },
  beforeMount(){
    axios.get(`${API}/Transacciones/Last20Transaccions/3`)
      .then((result)=>{
        console.log(result);
        result.data.body.forEach((e) =>{
          let obj = {
            carril: e.carril,
            clase: e.claseCajero,
            fecha: e.fechaDeCruce,
            tag: e.idTag
          }
          this.cruces.push(obj)
        })
      })
  },
  methods:{
    recibir_tramo_plaza(value){
      this.tramo = value.tramo
      this.plaza = value.plaza
      console.log(this.plaza);
    },
  }
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
  margin-left: 230px;
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
