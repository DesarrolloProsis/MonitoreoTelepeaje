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
import axios from "axios";
import moment from 'moment'
export default {
  name: "MonitoreoCruces",
  components: { TablaCruces, Navbar, Footer, FormTramoPlaza},
  data() {
    return {
      tramo:'',
      plaza:'',
      carril:'',
      cruces: [],
      tiempo:'',
      contador:'',
      seconds: 180,
      formato:''
    };
  },
  beforeMount(){
    this.contador = moment.utc(this.seconds).format('HH:mm:ss');
    this.expires_in = this.seconds;
    axios.get(`${API}/Transacciones/Last20Transaccions/${this.plaza}/${this.carril}`)
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
      this._setInterval()
  },
  methods:{
    buscar(plaza,carril){
      this.cruces = []
      console.log([plaza,carril]);
      if(carril == undefined){
        let carril = null
        axios.get(`${API}/Transacciones/Last20Transaccions/${plaza}/${carril}`)
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
      }else{
        this.cruces = []
        axios.get(`${API}/Transacciones/Last20Transaccions/${plaza}/${carril}`)
        .then((result)=>{
          console.log(result);
          if((result.data.status == 'Ok') && (result.data.body.length > 0)){
            result.data.body.forEach((e) =>{
              let obj = {
                carril: e.carril,
                clase: e.claseCajero,
                fecha: e.fechaDeCruce,
                tag: e.idTag
              }
              this.cruces.push(obj)
            })
          }else{
            this.$notify({
                title:'Sin Información',
                text:'No se encontraron transacciones',
                type: 'warn'
              });
          }
        })
      }
    },
    tiempos(minutos){
      if(minutos == 'tres'){
        this.seconds = 180
        this.expires_in = this.seconds
      }else if(minutos == 'seis'){
        this.seconds = 360
        this.expires_in = this.seconds
      }else if(minutos == 'nueve'){
        this.seconds = 540
        this.expires_in = this.seconds
      }else if(minutos == 'quince'){
        this.seconds = 900
        this.expires_in = this.seconds
      }else if(minutos == 'treinta'){
        this.seconds = 1800
        this.expires_in = this.seconds
      }
    },
    actualizar(plaza,carril){
      if(plaza != undefined && carril != undefined){
        this.cruces = []
        axios.get(`${API}/Transacciones/Last20Transaccions/${plaza}/${carril}`)
        .then((result)=>{
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
      }else if(plaza != undefined && carril == undefined){
        let crl = null
        this.cruces = []
        axios.get(`${API}/Transacciones/Last20Transaccions/${plaza}/${crl}`)
        .then((result)=>{
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
      }
    },
    recibir_tramo_plaza(value){
      this.tramo = value.tramo
      this.plaza = value.plaza
      this.carril = value.carril
    },
    _setInterval: function() {
      this.interval = setInterval(() => {
        if(this.expires_in === 1){
          this.expires_in = this.seconds
          this.actualizar(this.plaza,this.carril)         
          /* clearInterval(this.interval); */
        }
        else {
          this.expires_in -= 1;
          this.contador = moment.utc(this.expires_in * 1000).subtract(1, 'seconds').format('HH:mm:ss');                                       
        }
      }, 1000);
    },
    acciones_mapper(formato){
      if(formato == 'excel'){
        console.log('excel');
      }if(formato == 'csv'){
        console.log('csv');
      }if(formato == 'txt'){
        console.log('txt');
      }
      this.formato = ''
    },
    opticones_select_acciones(){
      let options= [
          {  value: 'excel', name: 'EXCEL'},//0
          {  value: 'csv', name: 'CSV'},//1
          {  value: 'txt', name: 'TXT'},//2
      ]
      let filtroOpciones = []
          filtroOpciones.push(options[0])
          filtroOpciones.push(options[1])
          filtroOpciones.push(options[2])
      return filtroOpciones
    }
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