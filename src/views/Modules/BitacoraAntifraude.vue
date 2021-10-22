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
        Fecha:<input type="date" class="rounded"/>
      </div>
      <div class="flex-none filter-style">
        <button class="btn-buscar">Buscar</button>
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
      plaza: '',
      listaNegra: [],
      value: '',
      formato:'',
      isLoading: false,
      paginaAct: '',
      page: 0,
      totalPaginas: 0,
      currentPage: 0,
      hasMorePages: true,

    };
  },
  beforeMount (){
  axios.get(`${API}/ListaNegra/Paginacion/2/${this.page}`)
    .then((result)=>{
      console.log(result.data);
      this.totalPaginas = result.data.numberPages
      this.currentPage = result.data.now + 1
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
    showMore(page){
      this.listaNegra = []
      axios.get(`${API}/ListaNegra/Paginacion/2/${page}`)
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
    downloadApi(formato){
      if (formato == "csv") {
        ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/Csv`, 'test.csv')
      } 
      else if (formato == "excel") {        
        ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/Excel`, 'test.xlsx')    
      } 
      else if (formato == "txt") {
        ServiceFiles.xml_hhtp_request(`${API}/ListaNegra/Download/txt`, 'test.txt')
      }      
    }, 
  },
}
</script>
<style scoped>
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