<template>
    <Navbar></Navbar>
    <div class="container mx-auto px-0 pb-100">
        <h1 class="title-center font-titulo font-bold pb-4">Bitácora de Actualización de Listas</h1>
        <div class="flex flex-wrap bg-blue">
            <div class="flex-none filter-style mt-1">
                <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :tipo="'Antifraude'"></FormTramoPlaza>
            </div>
            <div class="flex-none filter-style mt-2">
                Fecha:<input v-model="fecha" type="date" class="rounded"/>
            </div>
            <div class="flex-none filter-style mr-69">
                <button @click="buscar(plaza,carril,fecha,tag)" class="btn-buscar">Buscar</button>
                <button @click="todo()" class="btn-buscar ml-2 mr-1">Limpiar</button>
            </div>
            <div class="flex-1">
                <FilesDownload @download-api="downloadApi"></FilesDownload>   
            </div>
        </div>
        <div class="container mx-auto px-0 md:px-60">
            <TablaListas :dataHistorico="listaHistorico"></TablaListas>
        </div>
        <div class="mt-20 hidden">
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
import TablaListas from "../../components/Tabla-listas.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer-login";
import FilesDownload from '../../components/Files-descargar.vue'

import axios from "axios";
import Paginacion from "../../components/Paginacion.vue"
export default {
    name: "BitacoraAccesos",
    components: { Navbar, Footer, FormTramoPlaza, TablaListas, FilesDownload, Paginacion },

    data() {
        return {
            tramo: '',
            plaza: null,
            fecha:null,
            tag:null,
            listaHistorico: [],
            formato:'',
            modalLoading: false
        };
    },
    beforeMount(){
        axios.get(`${API}/Historico/2/null`)
        .then((result)=>{
          console.log(result.data);
          if(result.data.status == 'Ok'){
            this.modalLoading = false
            result.data.body.forEach((e)=>{
              let obj = {
                fechaCreacion: e.fechaCreacion,
                numeroDeTags: e.numeroDeTags,
                timepoTotal: e.timepoTotal
              }
              this.listaHistorico.push(obj)
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