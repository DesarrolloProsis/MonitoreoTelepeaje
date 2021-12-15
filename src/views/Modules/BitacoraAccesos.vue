<template>
  <Navbar/>
  <div class="container mx-auto px-0 pb-100">
    <h1 class="title-center font-titulo font-bold pb-4">Bitácora de Accesos</h1>
    <div class="flex flex-wrap bg-blue rounded-lg">
      <div class="flex-none filter-style mt-1">
        <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :tipo="'Antifraude'"/>
      </div>
      <div class="flex-none filter-style mt-2">
        Usuario:
        <input v-model="nombre" type="text" class="rounded"/>
      </div>
      <div class="flex-none filter-style mt-2">
        Fecha:
        <input v-model="fecha" type="date" class="rounded"/>
      </div>
      <div class="flex-none filter-style">
        <button @click="buscar(nombre, fecha, plaza)" class="btn-buscar mr-2">Buscar</button>
        <button @click="todos()" class="btn-buscar mr-44">Todos</button>
      </div>
      <div class="flex-1">
        <FilesDownload @download-api="downloadApi"/>   
      </div>
    </div>
    <div class="container mx-auto px-0 md:px-60">
      <TablaAccesos :dataAccesos="accesos"/>
    </div>
    <div class="mt-20 -mb-36">
      <Paginacion :total-pages="totalPaginas" :total="100" :current-page="currentPage" :has-more-pages="hasMorePages" @pagechanged="showMore"/>
    </div>
  </div>
  <!-- MODAL CARGANDO -->
  <Spinner :modalLoading="modalLoading"/>
<Footer/>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import FormTramoPlaza from '../../components/Form-tramoplaza.vue';
import TablaAccesos from "../../components/Tabla-accesos.vue";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import { notify } from "@kyvg/vue3-notification";
import FilesDownload from '../../components/Files-descargar.vue'
import ServiceFiles from '../../Servicios/Files-Service'
import Paginacion from "../../components/Paginacion.vue"
import Spinner from '../../components/Spn.vue'
import { ref } from 'vue'
import axios from "axios";
export default {
  name: "BitacoraAccesos",
  components: { TablaAccesos, Navbar, Footer, FilesDownload, Spinner, Paginacion, FormTramoPlaza },
  setup() {
    const accesos = ref([])
    const nombre = ref(null)
    
    const formato = ref('')
    const modalLoading = ref(false)
    const fecha = ref(null)
    const page = ref(1)
    const totalPaginas = ref(0)
    const currentPage = ref(1)
    const hasMorePages = ref(true)
    const NRowsPage = ref(10);
    const tramo = ref('')
    const plaza = ref('')
    //Función que regresa la lista de accesos con filtro forzoso de plaza y con o sin nombre y/o fecha
    function buscar(nombre, fecha, plaza){
      if(plaza == '' || plaza == null || plaza == undefined){
        notify({
          title:'No Hay Datos',
          text:'Se debe de seleccionar la plaza para realizar una busqueda',
          type: 'warn'
        });
      }else{
      //Si solo seleccionamos plaza
        accesos.value = []
        modalLoading.value = true
        axios.get(`${API}/HistoricoSesion/PaginacionCompleta/${plaza}/${page.value}/${NRowsPage.value}/${fecha}/${nombre}`)
        .then((result)=>{
          console.log(result.data);
          if(result.data.status == 'Ok' && result.data.body.length > 0){
            totalPaginas.value = result.data.numberPages
            currentPage.value = result.data.now
            modalLoading.value = false
            result.data.body.forEach((e)=>{
            let obj = {
              usuarioId: e.usuarioId,
              nombreUsuario: e.nombreUsuario,
              nombre: e.nombre,
              apellidoP: e.apellidoPaterno,
              apellidoM: e.apellidoMaterno,
              rolId: e.rolId,
              fecha_inicio: e.horaLogIn,
              fecha_fin: e.horaLogOut,
              rol: e.nombreRol
            }
            accesos.value.push(obj)
            })
          }else{
            modalLoading.value = false
            notify({
              title:'No Hay Datos',
              text:'No se encontraron accesos',
              type: 'warn'
            });
          } 
        })
      }
    }
    //Funcion que regresa la lista de accesos de la plaza seleccionada y limpia los caomos de nombre y fecha
    function todos(){
      modalLoading.value = true
      accesos.value = []
      nombre.value = null
      fecha.value = null
      axios.get(`${API}/HistoricoSesion/PaginacionCompleta/${plaza.value}/${page.value}/${NRowsPage.value}/${fecha.value}/${nombre.value}`)
      .then((result)=>{
        modalLoading.value = false
        totalPaginas.value = result.data.numberPages
        currentPage.value = result.data.now
        result.data.body.forEach((e)=>{
          let obj = {
            usuarioId: e.usuarioId,
            nombreUsuario: e.nombreUsuario,
            nombre: e.nombre,
            apellidoP: e.apellidoPaterno,
            apellidoM: e.apellidoMaterno,
            rolId: e.rolId,
            fecha_inicio: e.horaLogIn,
            fecha_fin: e.horaLogOut,
            rol: e.nombreRol
          }
          accesos.value.push(obj)
        })
      })
    }//Funcion para cambiar de página 
    function showMore(page){
      accesos.value = [];
      axios.get(`${API}/HistoricoSesion/PaginacionCompleta/${plaza.value}/${page}/${NRowsPage.value}/${fecha.value}/${nombre.value}`)
      .then((result)=>{
        totalPaginas.value = result.data.numberPages
        currentPage.value = result.data.now
        modalLoading.value = false
        result.data.body.forEach((e)=>{
          let obj = {
            usuarioId: e.usuarioId,
            nombreUsuario: e.nombreUsuario,
            nombre: e.nombre,
            apellidoP: e.apellidoPaterno,
            apellidoM: e.apellidoMaterno,
            rolId: e.rolId,
            fecha_inicio: e.horaLogIn,
            fecha_fin: e.horaLogOut,
            rol: e.nombreRol
          }
          accesos.value.push(obj)
        })
      })
    }//Función para descargar la lista filtrada en los 3 formatos
    function downloadApi(formato){
      if(plaza.value == '' || plaza.value == null || plaza.value == undefined){
        notify({
          title:'No Hay Datos',
          text:'Se debe de seleccionar la plaza para exportar algún archivo',
          type: 'warn'
        });
      }else{
        //Si seleccionas nombre
        if((nombre.value != '' || nombre.value != null || nombre.value != undefined) && (fecha.value == '' || fecha.value == null || fecha.value == undefined)){
          if (formato == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/UsuarioMonitoreo/Download/Csv/${plaza.value}/null/${nombre.value}`, 'bitacoraAcceso.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/UsuarioMonitoreo/Download/Excel/${plaza.value}/null/${nombre.value}`, 'bitacoraAcceso.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/UsuarioMonitoreo/Download/txt/${plaza.value}/null/${nombre.value}`, 'bitacoraAcceso.txt')
          }
        }//Si seleccionamos fecha
        else if((fecha.value != '' || fecha.value != null || fecha.value != undefined) && (nombre.value == '' || nombre.value == null || nombre.value == undefined)){
          if (formato == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/UsuarioMonitoreo/Download/Csv/${plaza.value}/${fecha.value}/null`, 'bitacoraAcceso.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/UsuarioMonitoreo/Download/Excel/${plaza.value}/${fecha.value}/null`, 'bitacoraAcceso.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/UsuarioMonitoreo/Download/txt/${plaza.value}/${fecha.value}/null`, 'bitacoraAcceso.txt')
          }
        }//Si seleccionamos todos los filtros
        else{
          if (formato == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/UsuarioMonitoreo/Download/Csv/${plaza.value}/${fecha.value}/${nombre.value}`, 'bitacoraAcceso.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/UsuarioMonitoreo/Download/Excel/${plaza.value}/${fecha.value}/${nombre.value}`, 'bitacoraAcceso.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/UsuarioMonitoreo/Download/txt/${plaza.value}/${fecha.value}/${nombre.value}`, 'bitacoraAcceso.txt')
          }
        }     
      }
    }//Funcion que regresa el id de la plaza y el tramo
    function recibir_tramo_plaza(value){
      tramo.value = value.tramo
      plaza.value = value.plaza
    }

    return { buscar, todos, showMore, downloadApi, recibir_tramo_plaza, accesos, nombre, formato, modalLoading, fecha, page, totalPaginas, currentPage, hasMorePages,NRowsPage, tramo, plaza}
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
