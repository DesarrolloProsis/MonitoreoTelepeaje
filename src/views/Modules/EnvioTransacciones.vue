<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-0 pb-100">
    <h1 class="title-center font-titulo font-bold pb-4">Envió de transacciones a Operador de Telepeaje</h1>
    <div class="flex flex-wrap bg-blue">
      <div class="flex-none filter-style">
        <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :carrilesForm="true" :tipo="'Antifraude'"></FormTramoPlaza>
      </div>
      <div class="flex-none filter-style">
        Fecha:<input v-model="fecha" type="date" class="rounded" />
      </div>
      <div class="flex-none filter-style-2 mx-3">
        <input v-model="tag" class="inp-icon text-center text-white" placeholder="IMDM000000" type="text" />
      </div>
      <div class="flex-none filter-style mx-16">
        <button @click="buscar(plaza,fecha,carril,tag)" class="btn-buscar">Buscar</button>
      </div>
      <div class="flex-1">
        <Multiselect v-model="formato" placeholder="Sleccione un Formato" @close="acciones_mapper(formato)" label="name" trackBy="name" :options="opticones_select_acciones()" :searchable="true">
          <template v-slot:singleLabel="{ value }">
            <div class="multiselect-single-label">
              <img height="26" style="margin: 0 6px 0 0;" :src="value.icon"> {{ value.name }}
            </div>
          </template>
          <template v-slot:option="{ option }">
            <img height="22" style="margin: 0 6px 0 0;" :src="option.icon">{{ option.name }}
          </template>
        </Multiselect>
      </div>
    </div>
    <TablaTransacciones :dataTransacciones="transacciones"></TablaTransacciones>
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
import TablaTransacciones from "../../components/Tabla-transacciones.vue";
import FormTramoPlaza from '../../components/Form-tramoplaza.vue';
import Multiselect from '@vueform/multiselect';
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import Paginacion from "../../components/Paginacion.vue"
import axios from "axios";
export default {
  name: "EnvioTransacciones",
  components: { TablaTransacciones, Navbar, Footer,FormTramoPlaza,Multiselect,Paginacion },
  data() {
    return {
      transacciones: [],
      tramo: '',
      plaza: '',
      carril: null,
      fecha: null,
      tag: null,
      formato: '',
      page: 0,
      totalPaginas: 0,
      currentPage: 1,
      hasMorePages: true,
      modalLoading: false
    };
  },
  beforeMount (){
    this.transacciones = []
      let data = {
      "plazaId": 'null',
      "carril": 'null',
      "fecha": 'null',
      "tag": 'null',
      "skip": 1
    }
    console.log(data);
    axios.post(`${API}/Transacciones/TransactionsFiltros`,data)
    .then((result)=>{
      console.log(result);
      this.totalPaginas = result.data.numberPages
      this.currentPage = result.data.now 
      result.data.body.forEach((e) => {
            let obj = {
              tag: e.idTag,
              fechaEnvio: e.fechaEnvioOperador,
              carril: e.carril,
              claseCajero: e.claseCajero,
              tarifa: e.tarifa
            };
            this.transacciones.push(obj);
          });
    })
  },
  methods:{
    buscar: function(plaza, fecha, carril, tag){
      this.modalLoading = true
      this.transacciones = []
      let data = {
      "plazaId": plaza,
      "carril": carril,
      "fecha": fecha,
      "tag": tag,
      "skip": 1
    }
    axios.post(`${API}/Transacciones/TransactionsFiltros`,data)
    .then((result)=>{
      console.log(result);
      if(result.data.status == 'Ok'){
        this.modalLoading = false
        this.totalPaginas = result.data.numberPages
        this.currentPage = result.data.now
        result.data.body.forEach((e) => {
          let obj = {
            tag: e.idTag,
            fechaEnvio: e.fechaEnvioOperador,
            carril: e.carril,
            claseCajero: e.claseCajero,
            tarifa: e.tarifa
          };
          this.transacciones.push(obj);
        });
      }else{
        this.modalLoading = false
        this.$notify({
          title:'Sin Información',
          text:'No se encontrtaron transacciones en esta plaza',
          type: 'warn'
        });
      }
    })
    },
    showMore(page){
      this.transacciones = []
      let data = {
      "plazaId": this.plaza,
      "carril": 'null',
      "fecha": 'null',
      "tag": 'null',
      "skip": page
    }
    console.log(data);
    axios.post(`${API}/Transacciones/TransactionsFiltros`,data)
    .then((result)=>{
      console.log(result);
      this.totalPaginas = result.data.numberPages
      this.currentPage = result.data.now
      result.data.body.forEach((e) => {
            let obj = {
              tag: e.idTag,
              fechaEnvio: e.fechaEnvioOperador,
              carril: e.carril,
              claseCajero: e.claseCajero,
              tarifa: e.tarifa
            };
            this.transacciones.push(obj);
          });
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
      filtroOpciones.push(options[0])
      filtroOpciones.push(options[1])
      filtroOpciones.push(options[2])      
      return filtroOpciones
    },
  },
};
</script>
<style scoped>
.modal-container{
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
}
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
