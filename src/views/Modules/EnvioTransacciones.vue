<template>
  <Navbar/>
  <div class="container mx-auto px-0 pb-100">
    <h1 class="title-center font-titulo font-bold pb-4">Envió de Transacciones a Operador de Telepeaje</h1>
    <div class="flex flex-wrap bg-blue rounded-lg">
      <div class="flex-none filter-style">
        <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :carrilesForm="true" :tipo="'Antifraude'"/>
      </div>
      <div class="flex-none filter-style">
        Fecha:<input v-model="fecha" type="date" class="rounded" />
      </div>
      <div class="flex-none filter-style-2 mx-3">
        <input v-model="tag" class="inp-icon text-center text-white" placeholder="IMDM000000" type="text" />
      </div>
      <div class="flex-none filter-style mx-16">
        <button @click="buscar(plaza,fecha,carril,tag)" class="btn-buscar">Buscar</button>
        <button @click="todos(plaza)" class="btn-buscar ml-4 -mr-8">Todas</button>
      </div>
      <div class="flex-1">
        <FilesDownload @download-api="downloadApi"/>   
      </div>
    </div>
    <TablaTransacciones :dataTransacciones="transacciones"/>
    <div class="mt-20 -mb-32">
      <Paginacion :total-pages="totalPaginas" :total="100" :current-page="currentPage" :has-more-pages="hasMorePages" @pagechanged="showMore"/>
    </div>
  </div>
  <!-- MODAL CARGANDO -->
  <Spinner :modalLoading="modalLoading"/>
  <Footer/>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import TablaTransacciones from "../../components/Tabla-transacciones.vue";
import FormTramoPlaza from '../../components/Form-tramoplaza.vue';
import FilesDownload from '../../components/Files-descargar.vue'
import ServiceFiles from '../../servicios/Files-Service'
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import Paginacion from "../../components/Paginacion.vue"
import { notify } from "@kyvg/vue3-notification";
import { ref } from 'vue'
import Spinner from '../../components/Spn.vue'
import axios from "axios";
export default {
  name: "EnvioTransacciones",
  components: { TablaTransacciones, Navbar, Footer,FormTramoPlaza,Paginacion, Spinner, FilesDownload }, 
  setup() {
    const transacciones = ref([])
    const tramo = ref('')
    const plaza = ref('')
    const carril = ref(null)
    const fecha = ref(null)
    const tag = ref(null)
    const formato = ref('')
    const page = ref(0)
    const totalPaginas = ref(0)
    const currentPage = ref(1)
    const hasMorePages = ref(true)
    const modalLoading = ref(false)
    const numRespuesta = ref(10)
    //Función que regresa las transacciones con o sin filtro, pero la plaza es obligatoria
    function buscar(plaza, fecha, carril, tag){
      modalLoading.value = true
      if(plaza == undefined || plaza == null || plaza == ''){
        modalLoading.value = false
        notify({
          title:'Sin Información',
          text:'Se debe de seleccionar la plaza para hacer una busqueda',
          type: 'warn'
        });
      }else{
        modalLoading.value = true
        transacciones.value = []
        if(carril == undefined || carril == null || carril == ''){
          carril = "null"
        }
        if(fecha == undefined || fecha == null || fecha == ''){
          fecha = "null"
        }
        if(tag == undefined || tag == null || tag == ''){
          tag = "null"
        }
        let ruta = `${API}/Transacciones/TransactionsFiltrosR/${plaza}/${carril}/${fecha}/${tag}/${currentPage.value}/${numRespuesta.value}`
        axios.post(ruta)
        .then((result)=>{
          if((result.data.status == 'Ok') && (result.data.body.length > 0)){
          modalLoading.value = false
          totalPaginas.value = result.data.numberPages
          currentPage.value = result.data.now
          transacciones.value =  result.data.body
          }else{
              modalLoading.value = false
              notify({
                title:'Sin Información',
                text:'No se encontrtaron transacciones',
                type: 'warn'
              });
            }
        })
        .catch((er)=>{
          console.log(er)
        })
      }
    }//Función que regresa las transacciones de la plaza asignada, sin filtros
    function todos(plaza) {
      tag.value = null
      fecha.value = null
      currentPage.value = 1
      axios.post(`${API}/Transacciones/TransactionsFiltrosR/${plaza}/null/null/null/${currentPage.value}/${numRespuesta.value}`)
      .then((result)=>{
        if(result.data.status == 'Ok'){
          transacciones.value = []
          modalLoading.value = false
          totalPaginas.value = result.data.numberPages
          currentPage.value = result.data.now
          transacciones.value =  result.data.body
        }else{
          modalLoading.value = false
          notify({
            title:'Sin Información',
            text:'No se encontrtaron transacciones en esta plaza',
            type: 'warn'
          });
        }
      })
    }//Función para cambiar de página sin filtros
    function showMore(page){
      transacciones.value = []
      if((tag.value == undefined || tag.value == null || tag.value == '') && (carril.value == undefined || carril.value == null || carril.value == '') && (fecha.value == undefined || fecha.value == null || fecha.value == '')){
        axios.post(`${API}/Transacciones/TransactionsFiltrosR/${plaza.value}/null/null/null/${page}/${numRespuesta.value}`)
        .then((result)=>{
          totalPaginas.value = result.data.numberPages
          currentPage.value = result.data.now
          transacciones.value =  result.data.body
        })
      }else{
        if(carril.value == undefined || carril.value == null || carril.value == ''){
          carril.value = "null"
        }
        if(fecha.value == undefined || fecha.value == null || fecha.value == ''){
          fecha.value = "null"
        }
        if(tag.value == undefined || tag.value == null || tag.value == ''){
          tag.value = "null"
        }
        let ruta = `${API}/Transacciones/TransactionsFiltrosR/${plaza.value}/${carril.value}/${fecha.value}/${tag.value}/${page}/${numRespuesta.value}`
        console.log(ruta)
        axios.post(ruta)
        .then((result)=>{
          totalPaginas.value = result.data.numberPages
          currentPage.value = result.data.now
         transacciones.value =  result.data.body
        })
        .catch((er)=>console.log(er))
      }
    }//Función que regresa el id de la plaza, el tramo y el carril
    function  recibir_tramo_plaza(value){
      tramo.value = value.tramo
      plaza.value = value.plaza
      carril.value = value.carril
    }//Función para exportar la lista filtrada a alguno de los 3 formatos
    function downloadApi(formato){
      if(plaza.value == '' || plaza.value == null || plaza.value == undefined){
        notify({
          title:'No Hay Datos',
          text:'Se debe de seleccionar la plaza para realizar una busqueda',
          type: 'warn'
        });
      }else{
        //Si solo seleccionamos la plaza
        if((plaza.value != '' || plaza.value != null || plaza.value != undefined) && (carril.value == '' || carril.value == null || carril.value == undefined) && (fecha.value == '' || fecha.value == null || fecha.value == undefined)  && (tag.value == '' || tag.value == null || tag.value == undefined)){
          if (formato == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Csv/${plaza.value}/null/null/null`, 'EnvioTransacciones.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Excel/${plaza.value}/null/null/null`, 'EnvioTransacciones.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/txt/${plaza.value}/null/null/null`, 'EnvioTransacciones.txt')
          }
        }//Si solo seleccionamos el Carril
        else if((carril.value != '' || carril.value != null || carril.value != undefined) && (fecha.value == '' || fecha.value == null || fecha.value == undefined)  && (tag.value == '' || tag.value == null || tag.value == undefined)){
          if (formato == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Csv/${plaza.value}/${carril.value}/null/null`, 'EnvioTransacciones.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Excel/${plaza.value}/${carril.value}/null/null`, 'EnvioTransacciones.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/txt/${plaza.value}/${carril.value}/null/null`, 'EnvioTransacciones.txt')
          }
        }//Si solo seleccionamos fecha
        else if((carril.value == '' || carril.value == null || carril.value == undefined) && (fecha.value != '' || fecha.value != null || fecha.value != undefined)  && (tag.value == '' || tag.value == null || tag.value == undefined)){
          if (formato == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Csv/${plaza.value}/null/${fecha.value}/null`, 'EnvioTransacciones.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Excel/${plaza.value}/null/${fecha.value}/null`, 'EnvioTransacciones.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/txt/${plaza.value}/null/${fecha.value}/null`, 'EnvioTransacciones.txt')
          }
        }//Si solo seleccionamos tag
        else if((carril.value == '' || carril.value == null || carril.value == undefined) && (fecha.value == '' || fecha.value == null || fecha.value == undefined)  && (tag.value != '' || tag.value != null || tag.value != undefined)){
          if (formato == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Csv/${plaza.value}/null/null/${tag.value}`, 'EnvioTransacciones.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Excel/${plaza.value}/null/null/${tag.value}`, 'EnvioTransacciones.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/txt/${plaza.value}/null/null/${tag.value}`, 'EnvioTransacciones.txt')
          }
        }
      }
    }

    return { 
      buscar, 
      todos, 
      showMore, 
      recibir_tramo_plaza, 
      downloadApi, 
      transacciones, 
      tramo, 
      plaza, 
      carril, 
      fecha, 
      tag, 
      formato, 
      page, 
      totalPaginas, 
      currentPage, 
      hasMorePages, 
      modalLoading
      }
  }
}
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
