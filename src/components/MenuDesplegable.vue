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
            </div>
          </div>
          <div class="flex-2 mx-20">
            <div class=" p-1 flex border border-gray-200 rounded bg-green-500">
              <button @click="abrirmodalrail()" class="p-1 px-2 appearance-none outline-none w-full text-white">
                Agregar Rail
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <div v-if="modalShow">
      <ModalCarriles @cerrar-modal="cerrar_modal" :carril="'A01'" :modalOpen="modalShow" :tipoalarma="dataSocket"></ModalCarriles>
    </div>
    <Accordion v-for="(ray, index) in rays" :key="index" :title="ray.ipRay" :showAcordion="abrirrail" @abriracordion="mostrarrail(ray.idRay)" @abriraccion="abrirmodalantenas(ray)">
        <div v-if="mostrar == ray.idRay" class="p-4">
        <div class="w-full p-3 flex justify-between">
          <div>Plaza:{{ray.idPlaza}}</div>
          <div>Ip:{{ray.ipRay}}</div>
          <div><button class="bg-yellow-500 text-white border-2 rounded-md p-2" @click="abrirmodaleditarray(ray)">Editar Ray</button></div>  
        </div>
        <div v-if="AntenasRail.length > 0">
          <Accordion v-for="(antena, key) in AntenasRail" :key="key" :showAcordion="abrirantena" :title="antena.lineaCarril + ' ' + antena.numeroCapufeCarril + ' ' + '(' + antena.idFisico +')'" @abriracordion="mostrarantena(antena.idAntena)">
            <div v-if="mostrarinfoantena == antena.idAntena">
            <div class="w-full p-3 flex justify-between">
              <div>Id Antena: {{antena.idAntena}}</div>
              <div>Carril: {{antena.idGare}}</div>  
              <div>Ray: {{antena.idRay}}</div>
              <div><button class="bg-yellow-500 text-white border-2 rounded-md p-2" @click="abrirmodaleditarantenas(antena)">Editar Antena</button></div>
            </div>
            </div>
          </Accordion>
        </div>
        <div v-else class="w-full flex justify-center">
            Sin Antenas
        </div>
        </div>
    </Accordion>
  </div>
  <!-- MODAL CARGANDO -->
  <Modal :show="showModalRail" @cerrarmodal="cerramodalrail">
    <h1 class="text-4xl font-bold font-titulo text-center mt-4">Agregar Rail</h1>
            <div class="flex w-full justify-center gap-20 mt-10">
                <div class="flex flex-col gap-11">
                    <div>
                        <label for="">IP del Ray</label>
                    </div>
                </div>
                <div class="flex flex-col gap-10">
                    <div>
                        <input class="border border-gray-800"  type="text" v-model="ipray"/>
                    </div>
                </div>
            </div>
            <div class="flex w-full justify-center mt-10 mb-8">
                <div>
                    <button class="rounded-lg w-18 bg-green-500 text-white p-3" @click="agregarRay()">Agregar</button>
                </div>
            </div>
  </Modal>
  <Modal :show="showModalAntenas" @cerrarmodal="cerramodalantenas">
    <h1 class="text-4xl font-bold font-titulo text-center mt-4">Agregar Antena</h1>
            <div class="flex w-full justify-center gap-20 mt-10">
                <div class="flex flex-col gap-11">
                    <div>
                        <label for="">Numero Capufe Carril</label>
                    </div>
                    <div>
                        <label for="">Id Gare</label>
                    </div>
                    <div>
                        <label for="">Linea Carril</label>
                    </div>
                    <div>
                        <label>Id Fisico</label>
                    </div>  
                </div>
                <div class="flex flex-col gap-10">
                    <div>
                        <input class="border border-gray-800"  type="text" v-model="numerocapufecarril"/>
                    </div>
                    <div>
                        <input class="border border-gray-800" type="text" v-model="idgare"/>
                    </div>
                    <div>
                        <input class="border border-gray-800" type="text" v-model="lineacarril"/>
                    </div>
                    <div>
                        <input class="border border-gray-800" type="text" v-model="idFisico"/>
                    </div>
                </div>
            </div>
            <div class="flex w-full justify-center mt-10 mb-8">
                <div>
                    <button class="rounded-lg w-18 bg-green-500 text-white p-3" @click="agregarAntena()">Agregar</button>
                </div>
            </div>
  </Modal>
  <Modal :show="showModalEditarAntenas" @cerrarmodal="cerramodaleditarantenas">
    <h1 class="text-4xl font-bold font-titulo text-center mt-4">Editar Antena</h1>
      <div class="flex w-full justify-center gap-20 mt-10">
                <div class="flex flex-col gap-11">
                    <div>
                        <label for="">Id Antena</label>
                    </div>
                    <div>
                        <label for="">Numero Capufe Carril</label>
                    </div>
                    <div>
                        <label for="">Id Gare</label>
                    </div>
                    <div>
                        <label for="">Linea Carril</label>
                    </div>
                    <div>
                        <label>Id Fisico</label>
                    </div>
                    <div>
                        <label>Id Ray</label>
                    </div>   
                </div>
                <div class="flex flex-col gap-10">
                    <div>
                        <input class="border border-gray-800"  type="text" v-model="eidAntena"/>
                    </div>
                    <div>
                        <input class="border border-gray-800"  type="text" v-model="enumerocapufecarril"/>
                    </div>
                    <div>
                        <input class="border border-gray-800" type="text" v-model="eidgare"/>
                    </div>
                    <div>
                        <input class="border border-gray-800" type="text" v-model="elineacarril"/>
                    </div>
                    <div>
                        <input class="border border-gray-800" type="text" v-model="eidFisico"/>
                    </div>
                    <div>
                        <input class="border border-gray-800" type="text" v-model="eidRay"/>
                    </div>
                </div>
            </div>
            <div class="flex w-full justify-center mt-10 mb-8">
                <div>
                    <button class="rounded-lg w-18 bg-green-500 text-white p-3" @click="editarAntena()">Editar</button>
                </div>
            </div>
  </Modal>
  <Modal :show="showModalEditarRay" @cerrarmodal="cerramodalEditarRay">
    <h1 class="text-4xl font-bold font-titulo text-center mt-4">Editar Ray</h1>
      <div class="flex w-full justify-center gap-20 mt-10">
                <div class="flex flex-col gap-11">
                    <div>
                        <label for="">Id Ray</label>
                    </div>
                    <div>
                        <label for="">Ip Ray</label>
                    </div>  
                </div>
                <div class="flex flex-col gap-10">
                    <div>
                        <input class="border border-gray-800" type="text" v-model="editaridray"/>
                    </div>
                    <div>
                        <input class="border border-gray-800" type="text" v-model="editaripray"/>
                    </div>
                </div>
            </div>
            <div class="flex w-full justify-center mt-10 mb-8">
                <div>
                    <button class="rounded-lg w-18 bg-green-500 text-white p-3" @click="editarray()">Editar</button>
                </div>
            </div>
  </Modal>
<Spinner :modalLoading="modalLoading"/>
</template>
<script>
import FormTramoPlaza from '../components/Form-tramoplaza.vue'
import Modal from "../components/Modal.vue";
import Accordion from './Accordion.vue';
import Spinner from '../components/Spn.vue'
import { ref } from 'vue'
import axios from "axios";
import { MonitoreoAntenasStore  } from '../store/MonitoreoAntenas'
import ModalCarriles from "../components/Modal-carriles";

const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
  name: "TablaCarriles",
  components: {
    FormTramoPlaza,
    Spinner,
    Modal,
    Accordion,
    ModalCarriles
  },
  emits: ["updatedcount"],
  setup() {
    const plaza = ref('')
    const tramo = ref('')
    let dataSocket = ref({})
    let modalShow = ref(false)
    const rays = ref([])
    const modalLoading = ref(false)
    const showModalRail = ref(false)
    const showModalAntenas = ref(false)
    const showModalEditarAntenas = ref(false)
    const showModalEditarRay = ref(false) 
    const AntenasRail = ref([])
    const abrirrail = ref(false)  
    const abrirantena = ref(false)
    const mostrar = ref(0)
    const mostrarinfoantena = ref(0)
    const ipray = ref('')
    const numerocapufecarril = ref('')
    const idgare = ref('')
    const lineacarril = ref('')
    const idFisico = ref('')
    const idray = ref(0)
    const eidAntena = ref('')
    const enumerocapufecarril= ref('')
    const eidgare = ref('')
    const elineacarril = ref('')
    const eidFisico = ref('')
    const eidRay = ref('')
    const editaridray = ref('')
    const editaripray = ref('')
    const monitoreoAntenasStore = MonitoreoAntenasStore()
    //Finción que busca los carriles con la plaza seleccionada
    function abrirmodalrail(idray){
      console.log(idray)
      showModalRail.value = !showModalRail.value
    }
    function abrirmodaleditarray(ray){
      showModalEditarRay.value = !showModalEditarRay.value
      console.log(ray);
      editaridray.value = ray.idRay
      editaripray.value = ray.ipRay
    }
    function editarray(){
      let ray = {
        "idRay": editaridray.value,
        "ipRay": editaripray.value
      } 
      axios.post(`${API}/CrudMonitoreoAntena/ActualizarRay/${6}`,ray)
        .then((response) => {
          console.log(response)
          cerramodalEditarRay(false)
          buscar_carriles_plaza()
        })     
        .catch((error) => {
          console.log(error)
          modalLoading.value = false
        })  
    }
    function abrirmodalantenas(ray){
      console.log(ray);
      idray.value = ray.idRay
      console.log(idray.value)
      showModalAntenas.value = !showModalAntenas.value
    }
    function abrirmodaleditarantenas(antena){
      showModalEditarAntenas.value = !showModalEditarAntenas.value
      console.log(antena);
      eidAntena.value = antena.idAntena
      enumerocapufecarril.value =  antena.numeroCapufeCarril
      eidgare.value = antena.idGare
      elineacarril.value = antena.lineaCarril
      eidFisico.value = antena.idFisico
      eidRay.value = antena.idRay
    }
    const cerramodalrail = (modal) => {
      showModalRail.value = modal
      ipray.value = ''
    }
    const cerramodalantenas = (modal) => {
      showModalAntenas.value = modal
      numerocapufecarril.value = '' 
      idgare.value = '' 
      lineacarril.value = '' 
      idFisico.value = ''
    }
    const cerramodaleditarantenas = (modal) => {
      showModalEditarAntenas.value = modal
      eidAntena.value = ''
      enumerocapufecarril.value = ''
      eidgare.value = ''
      elineacarril.value = ''
      eidFisico.value = ''
      eidRay.value = ''
    }
    const cerramodalEditarRay = (modal) => {
      showModalEditarRay.value = modal
      editaridray.value = ''
      editaripray.value = ''
    }
    function mostrarrail(id){
      AntenasRail.value = []
      console.log(id);
      mostrar.value = id;
      abrirrail.value = !abrirrail.value
      axios.get(`${API}/CrudMonitoreoAntena/AntenaPlaza/6/${id}`)
        .then((response) => {
          console.log(response.data.body)
          AntenasRail.value = response.data.body
          modalLoading.value = false                 
        })     
        .catch((error) => {
          console.log(error)
          modalLoading.value = false
        })   
    }
    function mostrarantena(id){
      abrirantena.value = !abrirantena.value
      mostrarinfoantena.value = id
    }
    function buscar_carriles_plaza(){
      modalLoading.value = true
      rays.value = []            
      axios.get(`${API}/CrudMonitoreoAntena/RayPlaza/${6}`)
        .then((response) => {
          console.log(response.data.body)
          rays.value = response.data.body
          modalLoading.value = false                 
        })     
        .catch((error) => {
          console.log(error)
          modalLoading.value = false
        })      
    }
    //Función que recibe el id de la plaza y del tramo
    function recibir_tramo_plaza(value){
      console.log(value)
      tramo.value = value.tramo
      plaza.value = value.plaza
    }

    function cerrar_modal(){   
      monitoreoAntenasStore.deleteEventAntenaConcurrent()  
      dataSocket.value = {} 
      modalShow.value = false
    }
    function agregarRay(){
      let ray = {
        "ipRay": ipray.value
      } 
      axios.post(`${API}/CrudMonitoreoAntena/InsertarRay/${6}`,ray)
        .then((response) => {
          console.log(response)
          cerramodalantenas(false)
          buscar_carriles_plaza()
        })     
        .catch((error) => {
          console.log(error)
          modalLoading.value = false
        })  
    }
    function agregarAntena(){
      let antena =  {
      "numeroCapufeCarril": numerocapufecarril.value,
      "idGare": idgare.value,
      "lineaCarril": lineacarril.value,
      "idFisico": idFisico.value,
      "idRay": idray.value,
    }
    axios.post(`${API}/CrudMonitoreoAntena/InsertarAntena/${6}`,antena)
      .then((response) => {
        console.log(response)
        cerramodalantenas(false)
        mostrarrail(idray.value)
      })     
      .catch((error) => {
        console.log(error)
        modalLoading.value = false
      })  
    }
    function editarAntena(){
      let antena =  {
      "idAntena": eidAntena.value,
      "numeroCapufeCarril": enumerocapufecarril.value,
      "idGare": eidgare.value,
      "lineaCarril": elineacarril.value,
      "idFisico": eidFisico.value,
      "idRay": eidRay.value,
    }
    axios.post(`${API}/CrudMonitoreoAntena/ActualizarAntena/${6}`,antena)
      .then((response) => {
        console.log(response)
        cerramodaleditarantenas(false)
        mostrarrail(idray.value)
      })     
      .catch((error) => {
        console.log(error)
        modalLoading.value = false
      })  
    }
    return { 
    plaza,
    tramo,
    abrirrail,
    abrirantena,
    mostrar,
    mostrarantena,
    mostrarinfoantena,
    abrirmodalrail,
    abrirmodalantenas,
    idray,
    abrirmodaleditarantenas,
    eidAntena, 
    modalShow,
    showModalRail,
    agregarRay,
    agregarAntena,
    ipray, 
    dataSocket, 
    cerrar_modal, 
    rays,
    showModalEditarRay,
    abrirmodaleditarray,
    editarray,
    mostrarrail,
    showModalEditarAntenas,
    editaridray,
    editaripray,
    editarAntena,
    cerramodalrail,
    cerramodalantenas,
    cerramodaleditarantenas,
    cerramodalEditarRay,
    showModalAntenas,
    AntenasRail, 
    modalLoading, 
    buscar_carriles_plaza, 
    recibir_tramo_plaza,
    numerocapufecarril, 
    idgare, 
    lineacarril, 
    idFisico,
    enumerocapufecarril,
    eidgare,
    elineacarril,
    eidFisico,
    eidRay
    }
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
