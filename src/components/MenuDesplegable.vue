<template>
<!-- DECLARACION DE LA TABLA DE BUSQUEDA -->
  <div class="container mx-auto px-0 pt-4 py-8">
    <div class="mt-2 mx-2 p-10 md:mx-0">
      <p class="hidden">Filtros de Búsqueda:</p>
      <div class="flex flex-col bg-blue md:flex-row pb-0 mb-4 rounded-lg">
        <div class="flex-1 flex flex-col  md:flex-row md:space-x-2">
          <div class="mx-auto ">
            <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza"></FormTramoPlaza>
          </div>
          <div class="flex-2 mx-20">
            <div class=" p-1 bg-white flex border border-gray-200 rounded btn-search">
              <button @click="buscar_carriles_plaza" class="p-1 px-2 appearance-none outline-none w-full text-white">
                Buscar
              </button>
            </div>
          </div>
          <div class="flex-2 mx-20">
            <div class=" p-1 flex border border-gray-200 rounded bg-green-500" :class="{'hidden': ocultar == false}">
              <button @click="abrirmodalrail()" class="p-1 px-2 appearance-none outline-none w-full text-white">
                Agregar Ray
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
        <div class="w-full p-3 flex justify-between content-center bg-gray-300 rounded-lg">
          <div class="my-auto font-bold">Plaza:{{ray.idPlaza}}</div>
          <div class="my-auto font-bold">Ip:{{ray.ipRay}}</div>
          <div class="my-auto">
            <button class="bg-yellow-500 text-white border-2 border-yellow-500 rounded-lg p-2" @click="abrirmodaleditarray(ray)">Editar Ray</button>
            <button class="bg-red-500 text-white border-2 border-red-500 rounded-lg p-2 ml-2" @click="abrirmodaleliminarray(ray)">Eliminar Ray</button>
          </div>  
        </div>
        <div v-if="AntenasRail.length > 0">
          <Accordion v-for="(antena, key) in AntenasRail" :key="key" :showAcordion="abrirantena" :title="antena.lineaCarril + ' ' + antena.numeroCapufeCarril + ' ' + '(' + antena.idFisico +')'" @abriracordion="mostrarantena(antena.idAntena)">
            <div v-if="mostrarinfoantena == antena.idAntena">
            <div class="w-full p-3 flex justify-between content-center bg-gray-300 rounded-lg">
              <div class="my-auto font-bold">Id Antena: {{antena.idAntena}}</div>
              <div class="my-auto font-bold">Carril: {{antena.idGare}}</div>  
              <div class="my-auto font-bold">Ray: {{antena.idRay}}</div>
              <div class="my-auto">
                <button class="bg-yellow-500 text-white border-2 border-yellow-500 rounded-lg p-2" @click="abrirmodaleditarantenas(antena)">Editar Antena</button>
                <button class="bg-red-500 text-white border-2 border-red-500 rounded-lg p-2 ml-2" @click="abrirmodaleliminaraantena(antena)">Eliminar Antena</button>
              </div>
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
  <!-- MODAL AGREGAR RAY-->
  <Modal :show="showModalRail" @cerrarmodal="cerramodalrail">
    <h1 class="text-4xl font-bold font-titulo text-center mt-4">Agregar Ray</h1>
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
  <!-- MODAL AGREGAR ANTENA-->
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
                        <input class="border border-gray-800"  type="text" v-model.trim = "numerocapufecarril"/>
                    </div>
                    <div>
                        <input class="border border-gray-800" type="text" v-model.trim = "idgare" maxlength="2"/>
                    </div>
                    <div>
                        <input class="border border-gray-800" type="text" v-model.trim = "lineacarril"/>
                    </div>
                    <div>
                        <input class="border border-gray-800" type="text" v-model.trim = "idFisico"/>
                    </div>
                </div>
            </div>
            <div class="flex w-full justify-center mt-10 mb-8">
                <div>
                    <button class="rounded-lg w-18 bg-green-500 text-white p-3" @click="agregarAntena()">Agregar</button>
                </div>
            </div>
  </Modal>
  <!-- MODAL EDITAR ANTENA-->
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
                        <input class="border border-gray-200" disabled type="text" v-model.trim ="eidAntena"/>
                    </div>
                    <div>
                        <input class="border border-gray-200"  type="text" v-model.trim ="enumerocapufecarril"/>
                    </div>
                    <div>
                        <input class="border border-gray-200" type="text" v-model.trim ="eidgare" maxlength="2"/>
                    </div>
                    <div>
                        <input class="border border-gray-200" type="text" v-model.trim ="elineacarril"/>
                    </div>
                    <div>
                        <input class="border border-gray-200" type="text" v-model.trim ="eidFisico"/>
                    </div>
                    <div>
                        <input class="border border-gray-200" type="text" v-model.trim ="eidRay"/>
                    </div>
                </div>
            </div>
            <div class="flex w-full justify-center mt-10 mb-8">
                <div>
                    <button class="rounded-lg w-18 bg-green-500 text-white p-3" @click="editarAntena()">Editar</button>
                </div>
            </div>
  </Modal>
  <!-- MODAL EDITAR RAY-->
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
                        <input class="border border-gray-200" disabled type="text" v-model="editaridray"/>
                    </div>
                    <div>
                        <input class="border border-gray-200" type="text" v-model="editaripray"/>
                    </div>
                </div>
            </div>
            <div class="flex w-full justify-center mt-10 mb-8">
                <div>
                    <button class="rounded-lg w-18 bg-green-500 text-white p-3" @click="editarray()">Editar</button>
                </div>
            </div>
  </Modal>
  <!-- MODAL ELIMINAR RAY-->
  <Modal :show="showModalEliminarRay" @cerrarmodal="cerramodalEliminarRay">
    <h1 class="text-4xl font-bold font-titulo text-center mt-4">Eliminar Ray</h1>
    <h3 class="text-lg font-medium font-titulo text-center mt-4">Al eliminar este Ray, eliminaras todas las antenas que contiene</h3>
    <div class="flex w-full justify-center mt-6 mb-8">
      <div>
      <button class="rounded-lg w-18 bg-green-500 text-white p-3" @click="eliminarray()">Aceptar</button>
      </div>
    </div>
  </Modal>
  <!-- MODAL ELIMINAR ANTENA-->
  <Modal :show="showModalEliminarAntenas" @cerrarmodal="cerramodalEliminarAntena">
    <h1 class="text-4xl font-bold font-titulo text-center mt-4">Eliminar Antenas</h1>
    <h3 class="text-lg font-medium font-titulo text-center mt-4">Eliminaras solo la antena seleccionada</h3>
    <div class="flex w-full justify-center mt-6 mb-8">
      <div>
      <button class="rounded-lg w-18 bg-green-500 text-white p-3" @click="eliminarantena()">Aceptar</button>
      </div>
    </div>
  </Modal>
  <!-- MODAL DE CARGA-->
  <Spinner :modalLoading="modalLoading"/>
</template>
<script>
//iMPORTACION DE LOS COMPONENTES O LIBRERIAS
import FormTramoPlaza from '../components/Form-tramoplaza.vue'
import Modal from "../components/Modal.vue";
import Accordion from './Accordion.vue';
import Spinner from '../components/Spn.vue'
import { ref } from 'vue'
import axios from "axios";
import { MonitoreoAntenasStore  } from '../store/MonitoreoAntenas'
import ModalCarriles from "../components/Modal-carriles";
import { notify } from "@kyvg/vue3-notification";
//VARIABLE DE ENTORNO PARA EL CONSUMO DE LOS END POINTS
const API = process.env.VUE_APP_URL_API_PRODUCCION
//EXPORTACION DE TODOS LOS COMPONENTES
export default {
  name: "TablaCarriles",
  components: {
    FormTramoPlaza,
    Spinner,
    Modal,
    Accordion,
    ModalCarriles
  },
//DECLARACION DE LOS EMITS
  emits: ["updatedcount"],
  setup() {
//DECLARACION DE TODAS LAS VARIBLES QUE SE UTILIZAN EN EL CRUD Y PARA MOSTRAR MODALES    
    const plaza = ref('')
    const tramo = ref('')
    let dataSocket = ref({})
    let modalShow = ref(false)
    const ocultar = ref(false)
    const rays = ref([])
    const modalLoading = ref(false)
    const showModalRail = ref(false)
    const showModalAntenas = ref(false)
    const showModalEditarAntenas = ref(false)
    const showModalEditarRay = ref(false)
    const showModalEliminarAntenas = ref(false)
    const showModalEliminarRay = ref(false)  
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
    /*
      FUNCION QUE ABRE EL MODAL
      DE RAY
    */
    function abrirmodalrail(idray){
      console.log(idray)
      showModalRail.value = !showModalRail.value
    }
    /*
      FUNCION QUE ABRE EL MODAL
      DE EDITAR RAY
    */
    function abrirmodaleditarray(ray){
      showModalEditarRay.value = !showModalEditarRay.value
      console.log(ray);
      editaridray.value = ray.idRay
      editaripray.value = ray.ipRay
    }
    /*
      FUNCION QUE ABRE EL MODAL
      DE ELIMINAR RAY
    */
    function abrirmodaleliminarray(ray){
      showModalEliminarRay.value = !showModalEliminarRay.value
      editaridray.value = ray.idRay
    }
    /*
      FUNCION QUE ABRE EL MODAL
      DE ELIMINAR ANTENA
    */
    function abrirmodaleliminaraantena(antena){
      showModalEliminarAntenas.value = !showModalEliminarAntenas.value
      eidAntena.value = antena.idAntena
    }
    /*
    FUNCION QUE EDITAR EL RAY
    */
    function editarray(){
      modalLoading.value = true
      let ray = {
        "idRay": editaridray.value,
        "ipRay": editaripray.value
      } 
      axios.post(`${API}/CrudMonitoreoAntena/ActualizarRay/${plaza.value}`,ray)
        .then((response) => {
          console.log(response)
          cerramodalEditarRay(false)
          buscar_carriles_plaza()
          notify({ 
            type: 'success', 
            title:'RAY ACTUALIZADO',
            text: `La antena se elimino de manera correcta`
          });
        })     
        .catch((error) => {
          console.log(error)
          modalLoading.value = false
          notify({
            title:'RAY NO ACTUALIZADO',
            text:'Ocurrio un problema en el servidor',
            type: 'error'
          });
        })  
    }
    /*
    FUNCION QUE ELIMINA EL RAY
    */
    function eliminarray(){
      modalLoading.value = true
      let ray = {
        "idRay": editaridray.value
      }
      console.log(ray); 
      axios.post(`${API}/CrudMonitoreoAntena/EliminarRay/${plaza.value}`,ray)
        .then((response) => {
          console.log(response)
          cerramodalEliminarRay(false)
          buscar_carriles_plaza()
          notify({ 
            type: 'success', 
            title:'RAY ELIMINADO',
            text: `El Ray se elimino de manera correcta`
          });
        })     
        .catch((error) => {
          console.log(error)
          modalLoading.value = false
          notify({
            title:'RAY NO ELIMINADO',
            text:'Ocurrio un problema en el servidor',
            type: 'error'
          });
        })  
    }
    /*
      FUNCION QUE CIERRA EL MODAL
      DE ELIMINAR RAY
    */
    const cerramodalEliminarRay = (modal) => {
      showModalEliminarRay.value = modal
      editaridray.value = ''
    }
    /*
      FUNCION QUE CIERRA EL MODAL
      DE ELIMINAR ANTENA
    */
    const cerramodalEliminarAntena = (modal) =>{
      showModalEliminarAntenas.value = modal
      eidAntena.value = ''
    }
    /*
      FUNCION QUE ELIMINA LA ANTENA
    */
    function eliminarantena(){
      modalLoading.value = true
      let antena = {
        "idAntena": eidAntena.value
      } 
      axios.post(`${API}/CrudMonitoreoAntena/EliminarAntena/${plaza.value}`,antena)
        .then((response) => {
          console.log(response)
          cerramodalEliminarAntena(false)
          buscar_carriles_plaza()
          notify({ 
            type: 'success', 
            title:'ANTENA ELIMINADA',
            text: `La antena se elimino de manera correcta`
          });
        })     
        .catch((error) => {
          console.log(error)
          modalLoading.value = false
          notify({
            title:'ANTENA NO ELIMINADA',
            text:'Ocurrio un problema en el servidor',
            type: 'error'
          });
        })  
    }
    /*
      FUNCION QUE ABRE EL MODAL DE AGREGAR
      ANTENA
    */
    function abrirmodalantenas(ray){
      console.log(ray);
      idray.value = ray.idRay
      console.log(idray.value)
      showModalAntenas.value = !showModalAntenas.value
    }
    /*
      FUNCION QUE ABRE EL MODAL DE EDITAR
      ANTENA
    */
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
    /*
      FUNCION QUE CIERRA EL MODAL DE RAY
    */
    const cerramodalrail = (modal) => {
      showModalRail.value = modal
      ipray.value = ''
    }
    /*
      FUNCION QUE CIERRA EL MODAL DE ANTENAS
    */
    const cerramodalantenas = (modal) => {
      showModalAntenas.value = modal
      numerocapufecarril.value = '' 
      idgare.value = '' 
      lineacarril.value = '' 
      idFisico.value = ''
    }
    /*
      FUNCION QUE CIERRA EL MODAL DE ANTENAS
    */
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
      axios.get(`${API}/CrudMonitoreoAntena/AntenaPlaza/${plaza.value}/${id}`)
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
      abrirrail.value = false
      modalLoading.value = true
      rays.value = []            
      axios.get(`${API}/CrudMonitoreoAntena/RayPlaza/${plaza.value}`)
        .then((response) => {
          console.log(response.data.body)
          rays.value = response.data.body
          modalLoading.value = false
          ocultar.value = true                 
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
      modalLoading.value = true
      let ray = {
        "ipRay": ipray.value
      } 
      axios.post(`${API}/CrudMonitoreoAntena/InsertarRay/${plaza.value}`,ray)
        .then((response) => {
          console.log(response)
          cerramodalrail(false)
          buscar_carriles_plaza()
          notify({ 
            type: 'success', 
            title:'RAY AGREGADO',
            text: `Se agrego el ray de manera correcta`
          });
        })     
        .catch((error) => {
          console.log(error)
          modalLoading.value = false
          notify({
            title:'RAY NO AGREGADO',
            text:'Ocurrio un problema en el servidor',
            type: 'error'
          });
        })  
    }
    function agregarAntena(){
      modalLoading.value = true
      let antena =  {
      "numeroCapufeCarril": numerocapufecarril.value,
      "idGare": idgare.value,
      "lineaCarril": lineacarril.value,
      "idFisico": idFisico.value,
      "idRay": idray.value,
    }
    axios.post(`${API}/CrudMonitoreoAntena/InsertarAntena/${plaza.value}`,antena)
      .then((response) => {
        console.log(response)
        cerramodalantenas(false)
        buscar_carriles_plaza()
        mostrarrail(idray.value)
        notify({ 
            type: 'success', 
            title:'ANTENA AGREGADA',
            text: `Se agrego la antena de manera correcta`
        });
      })     
      .catch((error) => {
        console.log(error)
        modalLoading.value = false
        notify({
            title:'ANTENA NO AGREGADA',
            text:'Ocurrio un problema en el servidor',
            type: 'error'
        });
      })  
    }
    function editarAntena(){
      modalLoading.value = true
      let antena =  {
      "idAntena": eidAntena.value,
      "numeroCapufeCarril": enumerocapufecarril.value,
      "idGare": eidgare.value,
      "lineaCarril": elineacarril.value,
      "idFisico": eidFisico.value,
      "idRay": eidRay.value,
    }
    axios.post(`${API}/CrudMonitoreoAntena/ActualizarAntena/${plaza.value}`,antena)
      .then((response) => {
        console.log(response)
        cerramodaleditarantenas(false)
        mostrarrail(idray.value)
        notify({ 
            type: 'success', 
            title:'ANTENA EDITADA',
            text: `Se edito la antena de manera correcta`
        });
      })     
      .catch((error) => {
        console.log(error)
        modalLoading.value = false
        notify({
            title:'ANTENA NO EDITADA',
            text:'Ocurrio un problema en el servidor',
            type: 'error'
        });
      })  
    }
    return {
    ocultar, 
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
    abrirmodaleliminarray,
    abrirmodaleliminaraantena,
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
    showModalEliminarRay,
    abrirmodaleditarray,
    editarray,
    mostrarrail,
    showModalEditarAntenas,
    showModalEliminarAntenas,
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
    eidRay,
    eliminarray,
    eliminarantena,
    cerramodalEliminarRay,
    cerramodalEliminarAntena,
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
