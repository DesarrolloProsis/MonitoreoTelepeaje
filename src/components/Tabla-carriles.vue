<template>
  <div class="container mx-auto px-0 pt-4 py-8">
    <div class="mt-2 mx-2 md:mx-0">
      <p>Filtros de Búsqueda:</p>
      <div class="flex flex-col md:flex-row border-gray-200 pb-0 mb-4">
        <div class="flex-1 flex flex-col md:flex-row md:space-x-2">
          <div class="w-full ">
            <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :tipo="'Transacciones'"></FormTramoPlaza>
          </div>

          <div class="flex-2">
            <div class="my-2 p-1 bg-white flex border border-gray-200 rounded btn-search">
              <button @click="buscar_carriles_plaza" class="p-1 px-2 appearance-none outline-none w-full text-white">
                Buscar
              </button>
            </div>
          </div>
          <div class="flex-2 hidden">
            <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
              <router-link to="/inicio/monitoreo-carriles/bitacora-alarmas" tag="div">
                <button class="p-1 px-2 appearance-none outline-none w-full text-gray-800 hidden">
                  Ir a Bitácora de Alarmas
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
    
    <div v-for="(carrilTramo, key) in carrilesTramos" :key="key" class="flex ta-center overflow-x-auto pt-6">
      <div class="flex justify-center items-center flex-none bg-carriles-gray p-5">
        <div>Plaza:<br />Tepozotlan<br />{{carrilTramo.nombreGare}}</div>
      </div>
      <div class="flex flex-col flex-none">
        <div class="flex-1 bg-carriles-gray mh-cuerpo lh-cuerpo">Carril</div>
        <div class="flex-1 bg-carriles-gray mh-other ">Último Cruce</div>
      </div>
      <Carril :carrilesdata="carrilTramo.carriles" :tipo="'alarma'"></Carril>
    </div>
    <!-- <div class="flex ta-center overflow-x-auto pt-6">
      <div class="flex justify-center items-center flex-none bg-carriles-gray p-5">
        <div>Plaza:<br />Tepozotlan<br />Cuerpo B</div>
      </div>
      <div class="flex flex-col flex-none">
        <div class="flex-1 bg-carriles-gray mh-cuerpo lh-cuerpo">Cuerpo</div>
        <div class="flex-1 bg-carriles-gray mh-other ">Último Cruce</div>
      </div>
      <Carril :carrilesB="carrilesB"></Carril>
    </div> -->
  </div>
  <!-- MODAL CARGANDO -->
<Spinner :modalLoading="modalLoading"/>
</template>
<script>
import Carril from "../components/Carril";
import FormTramoPlaza from '../components/Form-tramoplaza.vue'
import Spinner from '../components/Spn.vue'
import axios from "axios";
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
  name: "TablaCarriles",
  components: {
    Carril,
    FormTramoPlaza,
    Spinner
  },
  data() {
    return {
      plaza: '',
      tramo: '',
      carrilesTramos: [],
      modalLoading: true
    };    
  },
  beforeMount(){
    this.plaza = '184'
    this.buscar_carriles_plaza()
  },
  methods: {  
    buscar_carriles_plaza(){
      this.carrilesTramos = []
      axios.get(`${API}/CarrilesMonitoreo?PlazaId=${this.plaza}`)
        .then((response) => {
          console.log(response.data)
          let tramos = []
          response.data.forEach((item) => {
            console.log(item.id_gare)
            console.log(!tramos.some(tr => tr.id_gare == item.id_gare))
            if(!tramos.some(tr => tr.id_gare == item.id_gare)){
              tramos.push({id_gare: item.id_gare, nombre: item.gare})
            }
          });
          console.log(tramos)
          let tramosCarril = []
          tramos.forEach((item2) => {
            let carriles = response.data.filter(itemfilter => itemfilter.id_gare == item2.id_gare)
            carriles.sort((a,b) => {          
                console.log(parseInt(a.carril.substring(1,3)))      
                return parseInt(a.carril.substring(1,3)) - parseInt(b.carril.substring(1,3))
            })
            tramosCarril.push({
              nombreGare: item2.nombre,
              idGare: item2.id_gare,
              carriles: carriles            
            })
          })
          console.log(tramosCarril)
          this.carrilesTramos = tramosCarril
          this.modalLoading = false
          
        })     
        .catch((error) => {
          console.log(error)
          this.modalLoading = false
        })      
      
    }, 
    recibir_tramo_plaza(value){
      console.log(value)
      this.tramo = value.tramo
      this.plaza = value.plaza      
    }
  }
};
</script>
<style scoped>
.modal-container{
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.2);
}
.color-black {
  color: black !important;
}
.color-black:focus {
  outline: 0;
}
.ta-center {
  text-align: center;
}

.bg-carriles-gray {
  background-color: #d6e8eb;
  border: 1px solid black;
}

.mh-cuerpo {
  min-height: 80px;
  padding: 10px;
}
.lh-cuerpo {
  line-height: 59px;
}
.mh-other {
  min-height: 20px;
  line-height: 20px;
  padding: 10px;
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
.btn-search {
  background-color: #017296;
  color: white;
  
}
.btn-buscar:focus {
  outline: 0;
}
.btn-carriles:focus {
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
