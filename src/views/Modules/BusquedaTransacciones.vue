<template>
  <Navbar/>
  <div class="container mx-auto px-0 pb-100">
    <h1 class="title-center font-titulo font-bold pb-4">Búsqueda de Transacciones en Plaza</h1>
  <div>
    <div class="-mt-4 mx-2 md:mx-0">
        <div class="flex flex-col md:flex-row bg-blue rounded-lg border-gray-200 pb-0 mb-4">          
            <div class="flex-1 flex flex-col md:flex-row md:space-x-2 -mb-2">
              <div class="w-full flex-2">
                <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :tipo="'Antifraude'"/>
              </div>
              <div class="w-full flex-2 -mt-2">
                <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                  <input v-model="tag" class="inp-icon  w-full text-gray-800 " placeholder="Buscar No. Tag" type="text" />
                </div>
              </div>
              <div class="w-full flex-2 -mt-2">
                <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                  <input v-model="fecha" type="date" class=" w-full text-gray-800 "> 
                </div>
              </div>
              <div class="w-full flex-1 -mt-2">
                <div class="my-2 p-1 bg-white flex border border-gray-200 rounded btn-search ">                      
                  <button :disabled="modalLoading" :class="{'cursor-not-allowed': modalLoading}" @click="serch(plaza, tag, fecha)">Buscar</button>
                </div>
              </div>
              <div class="w-full flex-1 -mt-2">
                <div class="my-2 p-1 bg-white flex border border-gray-200 rounded btn-search ">                      
                  <button :disabled="modalLoading" :class="{'cursor-not-allowed': modalLoading}" @click="limpiar(plaza)">Todos</button>
                </div>
              </div>
              <FilesDownload @download-api="downloadApi" class="-mt-1"/>
            </div>
        </div>
    </div>
  </div>
  <TablaBusquedaTransacciones :dataCruces="cruces"/>
  </div>
  <Paginacion :total-pages="totalPaginas" :total="100" :current-page="currentPage" :has-more-pages="hasMorePages" @pagechanged="showMore"/>  
  <Spinner :modalLoading="modalLoading"/>
<Footer/>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import TablaBusquedaTransacciones from "../../components/Tabla-busquedatransacciones.vue";
import FormTramoPlaza from '../../components/Form-tramoplaza.vue'
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import axios from "axios";
import FilesDownload from '../../components/Files-descargar.vue'
import ServiceFiles from '../../Servicios/Files-Service'
import Paginacion from "../../components/Paginacion.vue"
import { notify } from "@kyvg/vue3-notification";
import Spinner from '../../components/Spn.vue'
import { ref } from 'vue'
export default {
  name: "BusquedaCruces",
  components: {
    TablaBusquedaTransacciones,
    Navbar,
    Footer,
    FormTramoPlaza,    
    FilesDownload,
    Paginacion,
    Spinner
  },
  setup() {
    const cruces = ref([])
    const token = ref("")
    const tag = ref(null)
    const fecha = ref(null)
    const formato = ref('')
    const tramo = ref('')
    const plaza = ref('')
    const page = ref(1)
    const totalPaginas = ref(0)
    const currentPage = ref(1)
    const hasMorePages = ref(true)
    const modalLoading = ref(false)
    const numRespuesta = ref(10)
    //Función que busca las transacciones en la plaza, con o sin filtros
    function serch(plaza,tag, fecha){
      modalLoading.value = true
      cruces.value = []
      if(plaza == '' || plaza == undefined || plaza == null){
        modalLoading.value = false
        notify({
          title:'Sin Información',
          text:'Se debe de seleccionar la plaza para realizar una busqueda',
          type: 'warn'
        });
      }else{
        axios.get(`${API}/Transacciones/BusquedaTransacciones/PaginacionCompleta/${plaza}/${fecha}/${tag}/${page.value}/${numRespuesta.value}`)
          .then((result)=>{
            console.log(result.data);
            if(result.data.status == "Ok" && result.data.body.length > 0){
              modalLoading.value = false
              totalPaginas.value = result.data.numberPages
              currentPage.value = result.data.now
              result.data.body.forEach((e)=>{
                let obj = {
                  tag: e.noTag,
                  carril: e.carril,
                  fecha: e.fecha,
                  medioPago: e.nombrePago,
                  tipo: e.tipoVehiculo,
                  tarifa: e.tarifa
                }
                cruces.value.push(obj)
              })
            }else{
              modalLoading.value = false
              notify({
                title:'Sin Información',
                text:'No se encontraron transacciones',
                type: 'warn'
              });
            }
          })
        /*if((tag == '' || tag == undefined || tag == null) && (fecha == '' || fecha == undefined || fecha == null)){
          //axios.get(`${API}/Transacciones/BusquedaTransacciones/${plaza}/${page.value}/null/null`)
          axios.get(`${API}/Transacciones/BusquedaTransacciones/PaginacionCompleta/${plaza}/null/null/${page.value}/${numRespuesta.value}`)
          .then((result)=>{
            if(result.data.status == "Ok"){
              modalLoading.value = false
              totalPaginas.value = result.data.numberPages
              currentPage.value = result.data.now
              result.data.body.forEach((e)=>{
                let obj = {
                  tag: e.noTag,
                  carril: e.carril,
                  fecha: e.fecha,
                  medioPago: e.nombrePago,
                  tipo: e.tipoVehiculo,
                  tarifa: e.tarifa
                }
                cruces.value.push(obj)
              })
            }else{
              modalLoading.value = false
              notify({
                title:'Sin Información',
                text:'No sé tiene conexión hacia la plaza seleccionada',
                type: 'warn'
              });
            }
          })
        }else if ((tag != '' || tag != undefined || tag != null) && (fecha == '' || fecha == undefined || fecha == null)){
          //axios.get(`${API}/Transacciones/BusquedaTransacciones/${plaza}/${page.value}/null/${tag}`)
          axios.get(`${API}/Transacciones/BusquedaTransacciones/PaginacionCompleta/${plaza}/null/${tag}/${page.value}/${numRespuesta.value}`)
          .then((result)=>{
            if((result.data.status == "Ok") && (result.data.body.length > 0)){
              modalLoading.value = false
              totalPaginas.value = result.data.numberPages
              currentPage.value = result.data.now
              result.data.body.forEach((e)=>{
                let obj = {
                  tag: e.noTag,
                  carril: e.carril,
                  fecha: e.fecha,
                  medioPago: e.nombrePago,
                  tipo: e.tipoVehiculo,
                  tarifa: e.tarifa
                }
                cruces.value.push(obj)
              })
            }else{
              modalLoading.value = false
              notify({
                title:'Sin Información',
                text:'No se encontró el tag ingresado',
                type: 'warn'
              });
            }
          })
        }else if ((fecha != '' || fecha != undefined || fecha != null) && (tag == '' || tag == undefined || tag == null)){
          //axios.get(`${API}/Transacciones/BusquedaTransacciones/${plaza}/${page.value}/${fecha}/null`)
          axios.get(`${API}/Transacciones/BusquedaTransacciones/PaginacionCompleta/${plaza}/${fecha}/null/${page.value}/${numRespuesta.value}`)
          .then((result)=>{
            if((result.data.status == "Ok") && (result.data.body.length > 0)){
              modalLoading.value = false
              totalPaginas.value = result.data.numberPages
              currentPage.value = result.data.now
              result.data.body.forEach((e)=>{
                let obj = {
                  tag: e.noTag,
                  carril: e.carril,
                  fecha: e.fecha,
                  medioPago: e.nombrePago,
                  tipo: e.tipoVehiculo,
                  tarifa: e.tarifa
                }
                cruces.value.push(obj)
              })
            }else{
              modalLoading.value = false
              notify({
                title:'Sin Información',
                text:'No se encontraron transacciones en la fecha indicada',
                type: 'warn'
              });
            }
          })
        }else if((tag != '' || tag != undefined || tag != null) && (fecha != '' || fecha != undefined || fecha != null)){
          //axios.get(`${API}/Transacciones/BusquedaTransacciones/${plaza}/${page.value}/${fecha}/${tag}`)
          axios.get(`${API}/Transacciones/BusquedaTransacciones/PaginacionCompleta/${plaza}/${fecha}/${tag}/${page.value}/${numRespuesta.value}`)
          .then((result)=>{
            if((result.data.status == "Ok") && (result.data.body.length > 0)){
              modalLoading.value = false
              totalPaginas.value = result.data.numberPages
              currentPage.value = result.data.now
              result.data.body.forEach((e)=>{
                let obj = {
                  tag: e.noTag,
                  carril: e.carril,
                  fecha: e.fecha,
                  medioPago: e.nombrePago,
                  tipo: e.tipoVehiculo,
                  tarifa: e.tarifa
                }
                cruces.value.push(obj)
              })
            }else{
              modalLoading.value = false
              notify({
                title:'Sin Información',
                text:'No se encontraron transacciones',
                type: 'warn'
              });
            }
          })
        }*/
      }
    }
    //Función que limpia los input de busqueda y regresa las transacciones de la plaza sin filtros
    function limpiar(plaza){
      modalLoading.value = true
      cruces.value = []
      fecha.value = null
      tag.value = null
      //axios.get(`${API}/Transacciones/BusquedaTransacciones/${plaza}/${page.value}/null/null`)
      axios.get(`${API}/Transacciones/BusquedaTransacciones/PaginacionCompleta/${plaza}/null/null/${page.value}/${numRespuesta.value}`)
      .then((result)=>{
        if(result.data.status == "Ok"){
          modalLoading.value = false
          totalPaginas.value = result.data.numberPages
          currentPage.value = result.data.now
          result.data.body.forEach((e)=>{
            let obj = {
              tag: e.noTag,
              carril: e.carril,
              fecha: e.fecha,
              medioPago: e.nombrePago,
              tipo: e.tipoVehiculo,
              tarifa: e.tarifa
            }
            cruces.value.push(obj)
          })
        }else{
          modalLoading.value = false
          notify({
            title:'Sin Información',
            text:'No sé tiene conexión hacia la plaza seleccionada',
            type: 'warn'
          });
        }
      })
    }
    //Función para cambiar de página
    function showMore(page){
      if((fecha.value == '' || fecha.value == null || fecha.value == undefined) && (tag.value == '' || tag.value == null || tag.value == undefined)){
        cruces.value = []
        //axios.get(`${API}/Transacciones/BusquedaTransacciones/${plaza}/${page}/${fecha}/${tag}`)
        axios.get(`${API}/Transacciones/BusquedaTransacciones/PaginacionCompleta/${plaza.value}/null/null/${page}/${numRespuesta.value}`)
        .then((result)=>{
          if(result.data.status == "Ok"){
            modalLoading.value = false
            totalPaginas.value = result.data.numberPages
            currentPage.value = result.data.now
            result.data.body.forEach((e)=>{
              let obj = {
                tag: e.noTag,
                carril: e.carril,
                fecha: e.fecha,
                medioPago: e.nombrePago,
                tipo: e.tipoVehiculo,
                tarifa: e.tarifa
              }
              cruces.value.push(obj)
            })
          }
        })
      }else{
        cruces.value = []
        //axios.get(`${API}/Transacciones/BusquedaTransacciones/${plaza}/${page}/${fecha}/${tag}`)
        axios.get(`${API}/Transacciones/BusquedaTransacciones/PaginacionCompleta/${plaza.value}/${fecha.value}/${tag.value}/${page}/${numRespuesta.value}`)
        .then((result)=>{
          if(result.data.status == "Ok"){
            modalLoading.value = false
            totalPaginas.value = result.data.numberPages
            currentPage.value = result.data.now
            result.data.body.forEach((e)=>{
              let obj = {
                tag: e.noTag,
                carril: e.carril,
                fecha: e.fecha,
                medioPago: e.nombrePago,
                tipo: e.tipoVehiculo,
                tarifa: e.tarifa
              }
              cruces.value.push(obj)
            })
          }
        })
      }
    }
    //Función que regresa el id del tramo y la plaza
    function recibir_tramo_plaza(value){
      tramo.value = value.tramo
      plaza.value = value.plaza
    }
    //Función que manda a llamar al servicio para descargar el archivo en el formato seleccionado
    function downloadApi(tipo) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token.value);
      myHeaders.append("Content-Type", "application/json");
      if(plaza.value == ''){
        notify({
          title:'Sin Información',
          text:'No se puede exportar sin antes hacer una busqueda',
          type: 'warn'
        });
      }else{
        //Sin filtros solo Plaza
        if(fecha.value == null && tag.value == null && plaza.value != ''){
          if (tipo == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/Csv/${plaza.value}/null/null`, 'transacciones.csv')
          } 
          else if (tipo == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/Excel/${plaza.value}/null/null`, 'transacciones.xlsx')            
          } 
          else if (tipo == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/txt/${plaza.value}/null/null`, 'transacciones.txt')
          }
        }//Filtro de Tag y Plaza
        else if(tag.value != null && fecha.value == null && plaza.value != ''){
          if (tipo == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/Csv/${plaza.value}/${tag.value}/null`, 'transacciones.csv')
          } 
          else if (tipo == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/Excel/${plaza.value}/${tag.value}/null`, 'transacciones.xlsx')            
          } 
          else if (tipo == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/txt/${plaza.value}/${tag.value}/null`, 'transacciones.txt')
          }
        }//Filtro de Fecha y Plaza
        else if(fecha.value != null && tag.value == null && plaza.value != ''){
          if (tipo == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/Csv/${plaza.value}/null/${fecha.value}`, 'transacciones.csv')
          } 
          else if (tipo == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/Excel/${plaza.value}/null/${fecha.value}`, 'transacciones.xlsx')            
          } 
          else if (tipo == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/txt/${plaza.value}/null/${fecha.value}`, 'transacciones.txt')
          }
        }//Todos los filtros
        else{
          if (tipo == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/Csv/${plaza.value}/${tag.value}/${fecha.value}`, 'transacciones.csv')
          } 
          else if (tipo == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/Excel/${plaza.value}/${tag.value}/${fecha.value}`, 'transacciones.xlsx')            
          } 
          else if (tipo == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/txt/${plaza.value}/${tag.value}/${fecha.value}`, 'transacciones.txt')
          }
        }
      }
    }

    return{ serch, limpiar, showMore, recibir_tramo_plaza, downloadApi, cruces, token, tag, fecha, formato, tramo, plaza, page, totalPaginas, currentPage, hasMorePages, modalLoading}
  }
}
</script>
<style global>
@keyframes example {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
<style scoped>
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
  height: 70%;
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