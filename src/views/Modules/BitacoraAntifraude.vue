<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-0 pb-100">
    <h1 class="title-center font-titulo font-bold pb-4">Bitácora de Tags en Antifraude</h1>
    <div class="flex flex-wrap bg-blue">
      <div class="flex-none filter-style mt-1">
        <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :carrilesForm="true" :tipo="'Antifraude'"></FormTramoPlaza>
      </div>
      <div class="flex-none filter-style mt-1">
      </div>
      <div class="flex-none filter-style mt-2">
        Fecha:<input v-model="fecha" type="date" class="rounded"/>
      </div>
      <div class="flex-none filter-style">
        <button @click="buscar(plaza,carril,fecha)" class="btn-buscar">Buscar</button>
        <button class="btn-buscar ml-6 mr-32">Todos</button>
      </div>
      <div class="flex-1">
        <FilesDownload @download-api="downloadApi"></FilesDownload>   
      </div>
    </div>
    <div class="container mx-auto px-0 md:px-60">
      <TablaAntifraude :dataAntifraude="listaNegra"></TablaAntifraude>
    </div>
    <div class="mt-20">
      <Paginacion
        :total-pages="totalPaginas" 
        :total="100"
        :current-page="currentPage"
        :has-more-pages="hasMorePages" 
        @pagechanged="showMore"
      ></Paginacion>
    </div>
  </div>
  <!-- MODAL CARGANDO -->
  <div class="inset-0" :class="{'modal-container': modalLoading}">
    <div v-if="modalLoading" class=" inset-0 font-titulo mt-66 mb-8">
      <div class="rounded-lg w-66 justify-center absolute  inset-x-0 bg-none mx-auto px-12 py-10 ">          
        <div class="justify-center text-center block">            
          <img src="@/assets/load.gif"  class="h-48 w-48" />
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import FormTramoPlaza from '../../components/Form-tramoplaza.vue';
import TablaAntifraude from "../../components/Tabla-antifraude.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer-login";
import FilesDownload from '../../components/Files-descargar.vue'
import ServiceFiles from '../../Servicios/Files-Service'
import axios from "axios";
import Paginacion from "../../components/Paginacion.vue"
export default {
  name: "BitacoraAccesos",
  components: { Navbar, Footer, FormTramoPlaza, TablaAntifraude, FilesDownload, Paginacion },

  data() {
    return {
      tags: [],      
      token:"",      
      tramo: '',
      plaza: null,
      carril: null,
      fecha:null,
      listaNegra: [],
      value: '',
      formato:'',
      isLoading: false,
      paginaAct: '',
      page: 0,
      totalPaginas: 0,
      currentPage: 1,
      hasMorePages: true,
      modalLoading: false

    };
  },
  beforeMount (){
  axios.get(`${API}/ListaNegra/Paginacion/null/${this.page}/null/null`)
    .then((result)=>{
      console.log(result.data);
      this.totalPaginas = result.data.numberPages
      this.currentPage = result.data.now
      result.data.body.forEach((e)=>{
        let obj = {
          tag: e.tag,
          carril: e.carril,
          fechaEntrada: e.fechaEntrada,
          fechaSalida: e.fechaSalida,
          causa: e.causaNombre
        }
        this.listaNegra.push(obj)
      })
    })
  },
  methods: {
    buscar(plaza,carril,fecha){
      this.page = 1
      this.modalLoading = true
      console.log(carril);
      if(carril == '' || carril == undefined){
        let carril = null
        axios.get(`${API}/ListaNegra/Paginacion/${plaza}/${this.page}/${carril}/${fecha}`)
        .then((result)=>{
          console.log(result.data);
          if(result.data.status == 'Ok'){
            this.modalLoading = false
            this.totalPaginas = result.data.numberPages
            this.currentPage = result.data.now
            result.data.body.forEach((e)=>{
              let obj = {
                tag: e.tag,
                carril: e.carril,
                fechaEntrada: e.fechaEntrada,
                fechaSalida: e.fechaSalida,
                causa: e.causaNombre
              }
              this.listaNegra.push(obj)
            })
          }else{
            this.modalLoading = false
            this.$notify({
              title:'Sin Información',
              text:'No se encontraron Tags',
              type: 'warn'
            });
          }
        })
      }
    },
    showMore(page){
      this.listaNegra = []
      let plaza = this.plaza
      let fecha = this.fecha;
      if(this.carril == ''){
        var datoCarril = null
      }
      axios.get(`${API}/ListaNegra/Paginacion/${plaza}/${page}/${datoCarril}/${fecha}`)
        .then((result)=>{
          console.log(result.data);
          this.totalPaginas = result.data.numberPages
          this.currentPage = result.data.now
          result.data.body.forEach((e)=>{
            let obj = {
              tag: e.tag,
              carril: e.carril,
              fechaEntrada: e.fechaEntrada,
              fechaSalida: e.fechaSalida,
              causa: e.causaNombre
            }
            this.listaNegra.push(obj)
          })
        })
    },
    recibir_tramo_plaza(value){
      this.tramo = value.tramo
      this.plaza = value.plaza
      this.carril = value.carril
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
        if(this.isLoading == false){
          filtroOpciones.push(options[0])
          filtroOpciones.push(options[1])
          filtroOpciones.push(options[2])
        }
      return filtroOpciones
    },
    downloadApi(formato){
      if (formato == "csv") {
        ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/Csv`, 'bitacoraAntifraudes.csv')
      } 
      else if (formato == "excel") {        
        ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/Excel`, 'bitacoraAntifraudes.xlsx')    
      } 
      else if (formato == "txt") {
        ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/txt`, 'bitacoraAntifraudes.txt')
      }      
    }, 
  },
}
</script>
<style scoped>
.modal-container{
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
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