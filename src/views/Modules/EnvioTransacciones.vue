<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-0 pb-100">
    <h1 class="title-center font-titulo font-bold pb-4">Envió de transacciones a Operador de Telepeaje</h1>
    <div class="flex flex-wrap bg-blue">
      <div class="flex-none filter-style">
        <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza()"></FormTramoPlaza>
      </div>
      <div class="flex-none filter-style">
        Fecha:
        <input v-model="fecha" type="date" class="rounded" />
      </div>
      <div class="flex-none filter-style-2">
        <input class="inp-icon text-center text-white" placeholder="IMDM000000" type="text" />
      </div>
      <div class="flex-none filter-style">
        <button @click="recibir_tramo_plaza" class="btn-buscar">Buscar</button>
      </div>
      <div class="flex-1">
        <button class="btn-carriles ml-right">Descargar Excel</button>
      </div>
    </div>
    <TablaTransacciones :dataTransacciones="transacciones"></TablaTransacciones>
  </div>
  <Footer></Footer>
</template>
<script>
import TablaTransacciones from "../../components/Tabla-transacciones.vue";
import FormTramoPlaza from '../../components/Form-tramoplaza.vue';
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
export default {
  name: "EnvioTransacciones",
  components: { TablaTransacciones, Navbar, Footer,FormTramoPlaza },
  data() {
    return {
      transacciones: [
        {
          plaza: "Aeropuerto",
          num_tag: "A01",
          fecha_envio: "2021/01/01 14:00:00",
          carril: "IMD1000000",
          tipo_vehiculo: "Auto",
          tarifa: "$65",
        },
      ],
      tramo: '',
      plaza: '',
      fecha: '',
    };
  },
  methods:{
    buscar: function(){
      if(this.tramo != undefined && this.plaza != undefined && this.fehca != ''){
        console.log([this.tramos, this.plaza, this.fecha]);
      }else{
        alert('No buscar')
      }
    },
    recibir_tramo_plaza(value){
      this.tramo = value.tramo
      this.plaza = value.plaza
    }
  },
};
</script>
<style scoped>
.filter-style-2 {
  color: white;
  font-size: 16px;
  margin-left: 10px;
}
.filter-style-2 input {
  margin-left: 20px;
  color: black;
  border-bottom: 1px solid black;
  padding: 0px 5px;
  color: white;
}
.inp-icon {
  background: url("~@/assets/search.png") no-repeat 100%;

  background-size: 16px;
}

.pb-100 {
  padding-bottom: 100px;
}
.title-center {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
}
.bg-blue {
  background-color: #2c5282;
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
