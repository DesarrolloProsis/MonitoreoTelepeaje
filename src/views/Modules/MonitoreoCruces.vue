<template>
  <Navbar/>
  <div class="container mx-auto px-0 pb-100">
    <h1 class="title-center font-titulo font-bold pb-4">Transacciones de Telepeaje en Tiempo Real</h1>
    <div class="flex flex-wrap bg-blue rounded-lg">
      <div class="flex-none ">
        <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :carrilesForm="true" :tipo="'Antifraude'"/>
      </div>
      <div class="flex-none mt-1 filter-style">
        <button @click="buscar(plaza, carril)" class="btn-buscar">Buscar</button>
      </div>
      <div class="flex-none mt-1 ml-right text-white">
        Tiempo de actualizacion
        <select v-model="tiempo" @change="tiempos(tiempo)" class="text-gray-800 w-16 rounded">
          <option value="tres">3 min</option>
          <option value="seis">6 min</option>
          <option value="nueve">9 min</option>
          <option value="quince">15 min</option>
          <option value="treinta">30 min</option>
        </select>
      </div>
    </div>
    <TablaCruces :dataCruces="cruces"/>
    <p class="mt-10">Próxima actualización en {{ contador.slice(3)  }}</p>
  </div>
  <Footer/>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import FormTramoPlaza from '../../components/Form-tramoplaza.vue';
import TablaCruces from "../../components/Tabla-cruces.vue";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import { notify } from "@kyvg/vue3-notification";
import { onMounted, ref } from 'vue'
import axios from "axios";
import moment from 'moment'
export default {
  name: "MonitoreoCruces",
  components: { TablaCruces, Navbar, Footer, FormTramoPlaza},
  setup() {
    const tramo = ref('')
    const plaza = ref('')
    const carril = ref('')
    const cruces = ref([])
    const tiempo = ref('')
    const contador = ref(0)
    const seconds = ref(180)
    const formato  = ref('')
    const expires_in = ref(0)
    const interval =ref('')

    contador.value = moment.utc(seconds.value).format('HH:mm:ss');
    expires_in.value = seconds.value;

    function setInterval_() {
      interval.value = setInterval(() => {
        if(expires_in.value === 1){
          expires_in.value = seconds.value
          actualizar(plaza.value,carril.value)         
        }
        else {
          expires_in.value -= 1;
          contador.value = moment.utc(expires_in.value * 1000).subtract(1, 'seconds').format('HH:mm:ss');                                       
        }
      }, 1000)
    }
    function actualizar(plaza,carril){
      if(plaza != undefined && carril != undefined){
        cruces.value = []
        axios.get(`${API}/Transacciones/Last20Transaccions/${plaza}/${carril}`)
        .then((result)=>{
          result.data.body.forEach((e) =>{
            let obj = {
              carril: e.carril,
              clase: e.claseCajero,
              fecha: e.fechaDeCruce,
              tag: e.idTag
            }
            cruces.value.push(obj)
          })
        })
      }else if(plaza != undefined && carril == undefined){
        let crl = null
        cruces.value = []
        axios.get(`${API}/Transacciones/Last20Transaccions/${plaza}/${crl}`)
        .then((result)=>{
          result.data.body.forEach((e) =>{
            let obj = {
              carril: e.carril,
              clase: e.claseCajero,
              fecha: e.fechaDeCruce,
              tag: e.idTag
            }
            cruces.value.push(obj)
          })
        })
      }
    }
    function buscar(plaza,carril){
      cruces.value = []
      if(carril == undefined){
        let carril = null
        axios.get(`${API}/Transacciones/Last20Transaccions/${plaza}/${carril}`)
        .then((result)=>{
          result.data.body.forEach((e) =>{
            let obj = {
              carril: e.carril,
              clase: e.claseCajero,
              fecha: e.fechaDeCruce,
              tag: e.idTag
            }
            cruces.value.push(obj)
          })
        })
      }else{
        cruces.value = []
        axios.get(`${API}/Transacciones/Last20Transaccions/${plaza}/${carril}`)
        .then((result)=>{
          if((result.data.status == 'Ok') && (result.data.body.length > 0)){
            result.data.body.forEach((e) =>{
              let obj = {
                carril: e.carril,
                clase: e.claseCajero,
                fecha: e.fechaDeCruce,
                tag: e.idTag
              }
              cruces.value.push(obj)
            })
          }else{
            notify({
              title:'Sin Información',
              text:'No se encontraron transacciones',
              type: 'warn'
            });
          }
        })
      }
    }
    function recibir_tramo_plaza(value){
      tramo.value = value.tramo
      plaza.value = value.plaza
      carril.value = value.carril
    }
    function tiempos(minutos){
      if(minutos == 'tres'){
        seconds.value = 180
        expires_in.value = seconds.value
      }else if(minutos == 'seis'){
        seconds.value = 360
        expires_in.value = seconds.value
      }else if(minutos == 'nueve'){
        seconds.value = 540
        expires_in.value = seconds.value
      }else if(minutos == 'quince'){
        seconds.value = 900
        expires_in.value = seconds.value
      }else if(minutos == 'treinta'){
        seconds.value = 1800
        expires_in.value = seconds.value
      }
    }


    onMounted(setInterval_)

    return { setInterval_, actualizar, recibir_tramo_plaza, buscar, tiempos, tramo, plaza, carril, cruces, tiempo, contador, seconds, formato, expires_in, interval}
}
}
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
  margin-left: 40px;
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