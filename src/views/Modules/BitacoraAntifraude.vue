<template>
  <Navbar/>
  <div class="container mx-auto px-0 -mb-24">
    <h1 class="title-center font-titulo font-bold pb-4">Bitácora de Tags en Antifraude</h1>
    <div class="flex flex-wrap -mt-4 bg-blue rounded-lg">
      <div class="flex">
        <div class="flex-none filter-style mt-1">
          <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :carrilesForm="true" :tipo="'Antifraude'"/>
        </div>
        <div class="flex-none filter-style mt-1 -mx-1">
          Fecha:<input v-model="fecha" type="date" class="rounded"/>
        </div>
        <div class="flex-none filter-style mt-1 mx-1">
          Tag: <input v-model="tag" class="rounded text-center  text-white" placeholder="IMDM000000" type="text" />
        </div>
        <div class="flex-none filter-style">
          <button @click="buscar(plaza,carril,fecha,tag)" class="btn-buscar">Buscar</button>
          <button @click="todo(plaza)" class="btn-buscar ml-2 mr-1">Todos</button>
        </div>
      </div>
      <div class="flex-1 -mt-2">
        <FilesDownload @download-api="downloadApi"/>
      </div>
    </div>
    <div class="container mx-auto px-0 md:px-60">
      <TablaAntifraude :dataAntifraude="listaNegra"/>
    </div>
    <div class="mt-20">
      <Paginacion :total-pages="totalPaginas" :current-page="currentPage" :has-more-pages="hasMorePages" @pagechanged="showMore"/>
    </div>
  </div>
  <!-- MODAL CARGANDO -->
  <Spinner :modalLoading="modalLoading"/>
  <Footer/>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import FormTramoPlaza from '../../components/Form-tramoplaza.vue';
import TablaAntifraude from "../../components/Tabla-antifraude.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer-login";
import FilesDownload from '../../components/Files-descargar.vue'
import { notify } from "@kyvg/vue3-notification";
import ServiceFiles from '../../servicios/Files-Service'
import axios from "axios";
import Paginacion from "../../components/Paginacion.vue"
import { ref } from 'vue'
import Spinner from '../../components/Spn.vue'
export default {
  name: "BitacoraAccesos",
  components: { Navbar, Footer, FormTramoPlaza, TablaAntifraude, FilesDownload, Paginacion, Spinner },
  setup() {
    const tags = ref([])      
    const token = ref("")      
    const tramo = ref('')
    const plaza = ref(null)
    const carril = ref(null)
    const fecha = ref(null)
    const tag = ref(null)
    const listaNegra = ref([])
    const value = ref('')
    const formato = ref('')
    const paginaAct = ref('')
    const page = ref(1)
    const totalPaginas = ref(0)
    const currentPage = ref(1)
    const hasMorePages = ref(true)
    const modalLoading = ref(false)
    const numberResponse = ref(10)
    //Función para buscar los tag
    function buscar(plaza,carril,fecha,tag){
      listaNegra.value = []
      if(plaza == '' || plaza == null || plaza == undefined){
        notify({
          title:'Sin Información',
          text:'Se debe de seleccionar la plaza para realizar una busqueda',
          type: 'warn'
        });
      }else{
        page.value = 1
        modalLoading.value = true
        if((carril == '' || carril == undefined || carril == null) && (tag == '' || tag == undefined || tag == null) && (fecha == '' || fecha == undefined || fecha == null)){
          let carrilif = null
          let tag = null
          listaNegra.value = []
          //axios.get(`${API}/ListaNegra/Paginacion/${plaza}/${page.value}/${carrilif}/${fecha}/${tag}`)
          axios.get(`${API}/ListaNegra/PaginacionCompleta/${plaza}/${carrilif}/${fecha}/${tag}/${page.value}/${numberResponse.value}`)
          .then((result)=>{
            if((result.data.status == 'Ok') && (result.data.body.length > 0)){
              modalLoading.value = false
              totalPaginas.value = result.data.numberPages
              currentPage.value = result.data.now
              result.data.body.forEach((e)=>{
                let obj = {
                  tag: e.tag,
                  carril: e.carril,
                  fechaEntrada: e.fechaEntrada,
                  fechaSalida: e.fechaSalida,
                  causa: e.causaNombre
                }
                listaNegra.value.push(obj)
              })
            }else{
              modalLoading.value = false
              totalPaginas.value = 0
              currentPage.value = 1
              notify({
                title:'Sin Información',
                text:'No se encontraron Tags en la plaza seleccionada',
                type: 'warn'
              });
            }
          })
        }else if((tag != '' || tag != undefined) && (carril == '' || carril == undefined || carril == null) && (fecha == '' || fecha == undefined || fecha == null)){
          listaNegra.value = []
          let carrilelseif = null
          //axios.get(`${API}/ListaNegra/Paginacion/${plaza}/${page.value}/${carrilelseif}/${fecha}/${tag}`)
          axios.get(`${API}/ListaNegra/PaginacionCompleta/${plaza}/${carrilelseif}/${fecha}/${tag}/${page.value}/${numberResponse.value}`)
          .then((result)=>{
            if((result.data.status == 'Ok') && (result.data.body.length > 0)){
              modalLoading.value = false
              totalPaginas.value = result.data.numberPages
              currentPage.value = result.data.now
              result.data.body.forEach((e)=>{
                let obj = {
                  tag: e.tag,
                  carril: e.carril,
                  fechaEntrada: e.fechaEntrada,
                  fechaSalida: e.fechaSalida,
                  causa: e.causaNombre
                }
                listaNegra.value.push(obj)
              })
            }else{
              modalLoading.value = false
              totalPaginas.value = 0
              currentPage.value = 1
              notify({
                title:'Sin Información',
                text:'No se encontraron Tags',
                type: 'warn'
              });
            }
          })
        }else if((carril != '' || carril != undefined) && (tag == '' || tag == undefined || tag == null) && (fecha == '' || fecha == undefined || fecha == null)){
          listaNegra.value = []
          let tag = null
          //axios.get(`${API}/ListaNegra/Paginacion/${plaza}/${page.value}/${carril}/${fecha}/${tag}`)
          axios.get(`${API}/ListaNegra/PaginacionCompleta/${plaza}/${carril}/${fecha}/${tag}/${page.value}/${numberResponse.value}`)
          .then((result)=>{
            if((result.data.status == 'Ok') && (result.data.body.length > 0)){
              modalLoading.value = false
              totalPaginas.value = result.data.numberPages
              currentPage.value = result.data.now
              result.data.body.forEach((e)=>{
                let obj = {
                  tag: e.tag,
                  carril: e.carril,
                  fechaEntrada: e.fechaEntrada,
                  fechaSalida: e.fechaSalida,
                  causa: e.causaNombre
                }
                listaNegra.value.push(obj)
              })
            }else{
              modalLoading.value = false
              totalPaginas.value = 0
              currentPage.value = 1
              notify({
                title:'Sin Información',
                text:'No se encontraron Tags en el carril ingresado',
                type: 'warn'
              });
            }
          })
        }else{
          //axios.get(`${API}/ListaNegra/Paginacion/${plaza}/${page.value}/${carril}/${fecha}/${tag}`)
          axios.get(`${API}/ListaNegra/PaginacionCompleta/${plaza}/${carril}/${fecha}/${tag}/${page.value}/${numberResponse.value}`)
          .then((result)=>{
            if((result.data.status == 'Ok') && (result.data.body.length > 0)){
              modalLoading.value = false
              totalPaginas.value = result.data.numberPages
              currentPage.value = result.data.now
              result.data.body.forEach((e)=>{
                let obj = {
                  tag: e.tag,
                  carril: e.carril,
                  fechaEntrada: e.fechaEntrada,
                  fechaSalida: e.fechaSalida,
                  causa: e.causaNombre
                }
                listaNegra.value.push(obj)
              })
            }else{
              modalLoading.value = false
              totalPaginas.value = 0
              currentPage.value = 1
              notify({
                title:'Sin Información',
                text:'No se encontraron Tags',
                type: 'warn'
              });
            }
          })
        }
      }
    }
    //Función que regresa todos los tag de la plaza seleccionada, sin filtros
    function todo(plaza){
      listaNegra.value = []
      carril.value = null
      fecha.value = null
      tag.value = null
      axios.get(`${API}/ListaNegra/Paginacion/${plaza}/${page.value}/${carril.value}/${fecha.value}/${tag.value}`)
      .then((result)=>{
        if((result.data.status == 'Ok') && (result.data.body.length > 0)){
          modalLoading.value = false
          totalPaginas.value = result.data.numberPages
          currentPage.value = result.data.now
          result.data.body.forEach((e)=>{
            let obj = {
              tag: e.tag,
              carril: e.carril,
              fechaEntrada: e.fechaEntrada,
              fechaSalida: e.fechaSalida,
              causa: e.causaNombre
            }
            listaNegra.value.push(obj)
          })
        }else{
          modalLoading.value = false
          notify({
            title:'Sin Información',
            text:'No se encontraron Tags en la plaza seleccionada',
            type: 'warn'
          });
        }
      })
    }
    //Función que regresa el id el tramo, la plaza y el carril
    function recibir_tramo_plaza(value){
      tramo.value = value.tramo
      plaza.value = value.plaza
      carril.value = value.carril
    }
    //Función para cambiar de página con o sin filtros
    function showMore(page){
      listaNegra.value = []
      if((carril.value == '' || carril.value == undefined || carril.value == null) && (fecha.value == '' || fecha.value == undefined || fecha.value == null) && (tag.value == '' || tag.value == undefined || tag.value ==  null)){
        //var datoCarril = null
        //axios.get(`${API}/ListaNegra/Paginacion/${plaza}/${page}/${datoCarril}/${fecha}/${tag}`)
        axios.get(`${API}/ListaNegra/PaginacionCompleta/${plaza.value}/null/null/null/${page}/${numberResponse.value}`)
        .then((result)=>{
          totalPaginas.value = result.data.numberPages
          currentPage.value = result.data.now
          result.data.body.forEach((e)=>{
            let obj = {
              tag: e.tag,
              carril: e.carril,
              fechaEntrada: e.fechaEntrada,
              fechaSalida: e.fechaSalida,
              causa: e.causaNombre
            }
            listaNegra.value.push(obj)
          })
        })
      }
      else{
        //axios.get(`${API}/ListaNegra/Paginacion/${plaza}/${page}/${this.carril}/${fecha}/${tag}`)
        axios.get(`${API}/ListaNegra/PaginacionCompleta/${plaza.value}/${carril.value}/${fecha.value}/${tag.value}/${page}/${numberResponse.value}`)
        .then((result)=>{

          totalPaginas.value = result.data.numberPages
          currentPage.value = result.data.now
          result.data.body.forEach((e)=>{
            let obj = {
              tag: e.tag,
              carril: e.carril,
              fechaEntrada: e.fechaEntrada,
              fechaSalida: e.fechaSalida,
              causa: e.causaNombre
            }
            listaNegra.value.push(obj)
          })
        })
      }
    }
    function downloadApi(formato){
      //Si no se selecciona la Plaza
      if(plaza.value == null || plaza.value == undefined || plaza.value == ''){
        notify({
          title:'Sin Información',
          text:'No se puede exportar sin antes hacer una busqueda',
          type: 'warn'
        });
      }else{
        //Se selecciona la plaza
        if((carril.value == null || carril.value == '' || carril.value == undefined) && (fecha.value == null || fecha.value == '' || fecha.value == undefined) && (tag.value == null || tag.value == '' || tag.value == undefined)){
          if (formato == "csv") {
          ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/Csv/${plaza.value}/null/null/null`, 'bitacoraAntifraudes.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/Excel/${plaza.value}/null/null/null`, 'bitacoraAntifraudes.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/txt/${plaza.value}/null/null/null`, 'bitacoraAntifraudes.txt')
          }   
        }//Se selecciona el carril y la plaza
        else if((carril.value != null || carril.value != '' || carril.value != undefined) && (fecha.value == null || fecha.value == '' || fecha.value == undefined) && (tag.value == null || tag.value == '' || tag.value == undefined)){
          if (formato == "csv") {
          ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/Csv/${plaza.value}/${carril.value}/null/null`, 'bitacoraAntifraudes.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/Excel/${plaza.value}/${carril.value}/null/null`, 'bitacoraAntifraudes.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/txt/${plaza.value}/${carril.value}/null/null`, 'bitacoraAntifraudes.txt')
          }      
        }//Se selecciona la fecha y la plaza
        else if((fecha.value != null || fecha.value != '' || fecha.value != undefined) && (carril.value == null || carril.value == '' || carril.value == undefined) && (tag.value == null || tag.value == '' || tag.value == undefined)){
          if (formato == "csv") {
          ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/Csv/${plaza.value}/null/${fecha.value}/null`, 'bitacoraAntifraudes.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/Excel/${plaza.value}/null/${fecha.value}/null`, 'bitacoraAntifraudes.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/txt/${plaza.value}/null/${fecha.value}/null`, 'bitacoraAntifraudes.txt')
          } 
        }//Se selecciona el tag y la plaza
        else if((tag.value != null || tag.value != '' || tag.value != undefined) && (carril.value == null || carril.value == '' || carril.value == undefined) && (fecha.value == null || fecha.value == '' || fecha.value == undefined)){
          if (formato == "csv") {
          ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/Csv/${plaza.value}/null/null/${tag.value}`, 'bitacoraAntifraudes.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/Excel/${plaza.value}/null/null/${tag.value}`, 'bitacoraAntifraudes.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/txt/${plaza.value}/null/null/${tag.value}`, 'bitacoraAntifraudes.txt')
          }
        }//Se seleccionan todos los filtros
        else{
          if (formato == "csv") {
          ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/Csv/${plaza.value}/${carril.value}/${fecha.value}/${tag.value}`, 'bitacoraAntifraudes.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/Excel/${plaza.value}/${carril.value}/${fecha.value}/${tag.value}`, 'bitacoraAntifraudes.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/txt/${plaza.value}/${carril.value}/${fecha.value}/${tag.value}`, 'bitacoraAntifraudes.txt')
          }
        }
      }
    }

    return { buscar, todo, recibir_tramo_plaza, showMore, downloadApi, tags, token, tramo, plaza, carril, fecha, tag, listaNegra, value, formato, paginaAct, page, totalPaginas, currentPage, hasMorePages, modalLoading, numberResponse }
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
.button-pagination {
  padding: 2px;
  border: 1px solid #2c5282;
  border-radius: 5px;
  margin-right: 5px;
  font-size: 12px;
  margin-top: 20px;
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