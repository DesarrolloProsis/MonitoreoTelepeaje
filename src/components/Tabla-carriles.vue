<template>
  <div class="container mx-auto px-0 pt-4 py-8">
    <div class="mt-2 mx-2 p-10 md:mx-0">
      <p class="hidden">Filtros de Búsqueda:</p>
      <div class="flex flex-col bg-blue md:flex-row pb-0 mb-4 rounded-lg">
        <div class="flex-1 flex flex-col  md:flex-row md:space-x-2">
          <div class="mx-auto ">
            <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :tipo="'alarma'"></FormTramoPlaza>
          </div>
          <div class="flex-2 mx-20">
            <div class=" p-1 bg-white flex border border-gray-200 rounded btn-search">
              <button @click="buscar_carriles_plaza" class="p-1 px-2 appearance-none outline-none w-full text-white">
                Buscar
              </button>

                <!-- <button @click="agregar_item" class="p-1 px-2 appearance-none outline-none w-full text-white">
                agregar event
              </button> -->
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
    <div v-if="modalShow">
      <ModalCarriles @cerrar-modal="cerrar_modal"  :carril="'A01'" :modalOpen="modalShow" :tipoalarma="dataSocket"></ModalCarriles>
    </div>
    <div v-for="(carrilTramo, key) in carrilesTramos" :key="key" class="flex ta-center overflow-x-auto pt-6 p-10 mr-10">
      <div class="flex justify-center items-center flex-none bg-carriles-gray p-5">
        <div>Plaza:<br /><br />{{carrilTramo.nombreGare}}</div>
      </div>
      <div class="flex flex-col flex-none">
        <div class="flex-1 bg-carriles-gray mh-cuerpo lh-cuerpo">Carril</div>
        <div class="flex-1 bg-carriles-gray mh-other ">Último Cruce</div>
      </div>
      <Carril :carrilesdata="carrilTramo.carriles" :tipo="'alarma'"></Carril>
    </div>
  </div>
  <!-- MODAL CARGANDO -->
<Spinner :modalLoading="modalLoading"/>
</template>
<script>
import Carril from "../components/Carril";
import FormTramoPlaza from '../components/Form-tramoplaza.vue'
import Spinner from '../components/Spn.vue'
import { ref, computed, watch } from 'vue'
import axios from "axios";
import { MonitoreoAntenasStore  } from '../store/MonitoreoAntenas'
import ModalCarriles from "../components/Modal-carriles";

const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
  name: "TablaCarriles",
  components: {
    Carril,
    FormTramoPlaza,
    Spinner,
    ModalCarriles
  },
  setup(_, { emit }) {
    const plaza = ref('')
    const tramo = ref('')
    let dataSocket = ref({})
    let modalShow = ref(false)
    const carrilesTramos = ref([])
    const modalLoading = ref(false)  
    
    const monitoreoAntenasStore = MonitoreoAntenasStore()
    //Finción que busca los carriles con la plaza seleccionada
    function buscar_carriles_plaza(){
      modalLoading.value = true
      carrilesTramos.value = []            
      axios.get(`${API}/CarrilesMonitoreo/MultiPlaza/${6}`)
        .then((response) => {
          let tramos = []
          console.log(response)
          response.data.body.forEach((item) => {
            if(!tramos.some(tr => tr.id_gare == item.id_gare)){
              tramos.push({id_gare: item.id_gare, nombre: item.gare})
            }
          });
          let tramosCarril = []
          tramos.forEach((item2) => {
            let carriles = response.data.body.filter(itemfilter => itemfilter.id_gare == item2.id_gare)
            carriles.sort((a,b) => {          
                return parseInt(a.carril.substring(1,3)) - parseInt(b.carril.substring(1,3))
            })
            tramosCarril.push({
              nombreGare: item2.nombre,
              idGare: item2.id_gare,
              carriles: carriles            
            })
          })
          carrilesTramos.value = tramosCarril
          modalLoading.value = false                 
          emit('conectar-socket-plaza', plaza.value)
          
        })     
        .catch((error) => {
          console.log(error)
          modalLoading.value = false
        })      
    }
    //Función que recibe el id de la plaza y del tramo
    function recibir_tramo_plaza(value){
      tramo.value = value.tramo
      plaza.value = value.plaza
    }

    function cerrar_modal(){   
      monitoreoAntenasStore.deleteEventAntenaConcurrent()  
      dataSocket.value = {} 
      modalShow.value = false
    }
    // function agregar_item(){
    //   monitoreoAntenasStore.addEventAntenaConcurrent(new Date())
    // }
    //Computed para monitorear lo eventos de las antenas
    const MonitorearConcurrentEventAntena = computed(() => {
      return monitoreoAntenasStore.getEventAntenaConcurrent          
    })

    watch(MonitorearConcurrentEventAntena.value, async (newEventAntena) => {
      
      console.log(newEventAntena.length)      
      if(newEventAntena.length > 0){
        dataSocket.value = newEventAntena[0]
        console.log(dataSocket)
        //codigo para pruebas integracion socket
        monitoreoAntenasStore.deleteEventAntenaConcurrent()  
        dataSocket.value = {}
        //modalShow.value = true
      }
    })        
    return { plaza, tramo, MonitorearConcurrentEventAntena, modalShow, dataSocket, cerrar_modal, carrilesTramos, modalLoading, buscar_carriles_plaza, recibir_tramo_plaza}
  }
}
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
.bg-blue {
  background-color: #2c5282;
  padding: 10px 5px;
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
  background-color: #2c5282;
;
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
