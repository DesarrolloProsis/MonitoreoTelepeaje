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
        <button @click="todos(plaza)" class="btn-buscar ml-4 -mr-8">Limpiar</button>
      </div>
      <!-- <div class="flex-1">
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
      </div> -->
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
import ServiceFiles from '../../Servicios/Files-Service'
//import Multiselect from '@vueform/multiselect';
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import Paginacion from "../../components/Paginacion.vue"
import Spinner from '../../components/Spn.vue'
import axios from "axios";
export default {
  name: "EnvioTransacciones",
  components: { TablaTransacciones, Navbar, Footer,FormTramoPlaza,Paginacion, Spinner, FilesDownload },
  data() {
    return {
      transacciones: [],
      tramo: '',
      plaza: '',
      carril: '',
      fecha: '',
      tag: '',
      formato: '',
      page: 0,
      totalPaginas: 0,
      currentPage: 1,
      hasMorePages: true,
      modalLoading: false
    };
  },
  /*beforeMount (){
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
  },*/
  methods:{
    todos (plaza) {
      this.tag = ''
      this.fecha = ''
      let data = {
        "plazaId": plaza,
        "carril": 'null',
        "fecha": 'null',
        "tag": 'null',
        "skip": 1
      }
      axios.post(`${API}/Transacciones/TransactionsFiltros`,data)
      .then((result)=>{
        console.log(result.data.body);
        if(result.data.status == 'Ok'){
          this.transacciones = []
          this.modalLoading = false
          this.totalPaginas = result.data.numberPages
          this.currentPage = result.data.now
          result.data.body.forEach((e) => {
            let obj = {
              tag: e.idTag,
              fechaCruce: e.fechaDeCruce,
              fechaEnvio: e.FechaEnvio,
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
    buscar: function(plaza, fecha, carril, tag){
      this.modalLoading = true
      console.log(fecha);
      if(plaza == undefined || plaza == null || plaza == ''){
        this.modalLoading = false
        this.$notify({
          title:'Sin Información',
          text:'Se debe de seleccionar la plaza para hacer una busqueda',
          type: 'warn'
        });
      }else{
        if((carril == undefined || carril == null || carril == '') && (tag == undefined || tag == null || tag == '') && (fecha == undefined || fecha == null || fecha == '')){
        console.log('if');
        let datoCarril = 'null'
        let tag = 'null'
        let fecha = 'null'
        this.modalLoading = true
        this.transacciones = []
        let data = {
          "plazaId": plaza,
          "carril": datoCarril,
          "fecha": fecha,
          "tag": tag,
          "skip": 1
        }
        console.log(data);
        axios.post(`${API}/Transacciones/TransactionsFiltros`,data)
        .then((result)=>{
          console.log(result);
          this.modalLoading = false
          if((result.data.status == 'Ok') && (result.data.body.length > 0)){
            this.modalLoading = false
            this.totalPaginas = result.data.numberPages
            this.currentPage = result.data.now
            result.data.body.forEach((e) => {
              let obj = {
                tag: e.idTag,
                fechaCruce: e.fechaDeCruce,
                fechaEnvio: e.fechaEnvio,
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
        }else if(carril == undefined && fecha == '' && tag != ''){
          console.log('primer if');
          this.modalLoading = true
          let datoCarril = 'null'
          let datofecha = 'null'
          this.transacciones = []
          let data = {
            "plazaId": plaza,
            "carril": datoCarril,
            "fecha": datofecha,
            "tag": tag,
            "skip": 1
          }
          axios.post(`${API}/Transacciones/TransactionsFiltros`,data)
          .then((result)=>{
          console.log(result);
          if((result.data.status == 'Ok') && (result.data.body.length > 0)){
            this.modalLoading = false
            this.totalPaginas = result.data.numberPages
            this.currentPage = result.data.now
            result.data.body.forEach((e) => {
              let obj = {
                tag: e.idTag,
                fechaCruce: e.fechaDeCruce,
                fechaEnvio: e.FechaEnvio,
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
              text:'No se encontrtaron transacciones con el tag ingresado',
              type: 'warn'
            });
          }
        })
        }else if((carril != undefined || carril != null || carril != '') && (tag == '') && (fecha == '')){
          console.log('segundo if');
          this.modalLoading = true
          let datoTag = 'null'
          let fech = 'null'
          this.transacciones = []
          let data = {
            "plazaId": plaza,
            "carril": carril,
            "fecha": fech,
            "tag": datoTag,
            "skip": 1
          }
          axios.post(`${API}/Transacciones/TransactionsFiltros`,data)
          .then((result)=>{
            console.log(result);
            if((result.data.status == 'Ok') && (result.data.body.length > 0)){
              this.modalLoading = false
              this.totalPaginas = result.data.numberPages
              this.currentPage = result.data.now
              result.data.body.forEach((e) => {
                let obj = {
                  tag: e.idTag,
                  fechaCruce: e.fechaDeCruce,
                  fechaEnvio: e.FechaEnvio,
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
                text:'No se encontrtaron transacciones en el carril seleccionado',
                type: 'warn'
              });
            }
          })
        }else if ((fecha != undefined || fecha != null || fecha != '') && (tag == undefined || tag == null || tag == '') && (carril == undefined || carril == null || carril == '')){
          console.log('tercer if');
          this.modalLoading = true
          let datoTag = 'null'
          let datoCarril = 'null'
          this.transacciones = []
          let data = {
            "plazaId": plaza,
            "carril": datoCarril,
            "fecha": fecha,
            "tag": datoTag,
            "skip": 1
          }
          axios.post(`${API}/Transacciones/TransactionsFiltros`,data)
          .then((result)=>{
            console.log(result);
            if((result.data.status == 'Ok') && (result.data.body.length > 0)){
              this.modalLoading = false
              this.totalPaginas = result.data.numberPages
              this.currentPage = result.data.now
              result.data.body.forEach((e) => {
                let obj = {
                  tag: e.idTag,
                  fechaCruce: e.fechaDeCruce,
                  fechaEnvio: e.FechaEnvio,
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
                text:'No se encontrtaron transacciones en el carril seleccionado',
                type: 'warn'
              });
            }
          })
        }else{
          console.log('else');
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
            if((result.data.status == 'Ok') && (result.data.body.length > 0)){
              this.modalLoading = false
              this.totalPaginas = result.data.numberPages
              this.currentPage = result.data.now
              result.data.body.forEach((e) => {
                let obj = {
                  tag: e.idTag,
                  fechaCruce: e.fechaDeCruce,
                  fechaEnvio: e.FechaEnvio,
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
                text:'No se encontrtaron transacciones',
                type: 'warn'
              });
            }
          })
        }
      }
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
              fechaCruce: e.fechaDeCruce,
              fechaEnvio: e.FechaEnvio,
              carril: e.carril,
              claseCajero: e.claseCajero,
              tarifa: e.tarifa
            };
            this.transacciones.push(obj);
          });
    })
    },
    recibir_tramo_plaza(value){
      console.log(value);
      this.tramo = value.tramo
      this.plaza = value.plaza
      this.carril = value.carril
    },
    downloadApi(formato){
      if(this.plaza == '' || this.plaza == null || this.plaza == undefined){
        this.$notify({
          title:'No Hay Datos',
          text:'Se debe de seleccionar la plaza para realizar una busqueda',
          type: 'warn'
        });
      }else{
        if((this.plaza != '' || this.plaza != null || this.plaza != undefined) && (this.carril == '' || this.carril == null || this.carril == undefined) && (this.fecha == '' || this.fecha == null || this.fecha == undefined)  && (this.tag == '' || this.tag == null || this.tag == undefined)){
          if (formato == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Csv/${this.plaza}/null/null/null`, 'EnvioTransacciones.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Excel/${this.plaza}/null/null/null`, 'EnvioTransacciones.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/txt/${this.plaza}/null/null/null`, 'EnvioTransacciones.txt')
          }
        }else if((this.carril != '' || this.carril != null || this.carril != undefined) && (this.fecha == '' || this.fecha == null || this.fecha == undefined)  && (this.tag == '' || this.tag == null || this.tag == undefined)){
          if (formato == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Csv/${this.plaza}/${this.carril}/null/null`, 'EnvioTransacciones.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Excel/${this.plaza}/${this.carril}/null/null`, 'EnvioTransacciones.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/txt/${this.plaza}/${this.carril}/null/null`, 'EnvioTransacciones.txt')
          }
        }else if((this.carril == '' || this.carril == null || this.carril == undefined) && (this.fecha != '' || this.fecha != null || this.fecha != undefined)  && (this.tag == '' || this.tag == null || this.tag == undefined)){
          if (formato == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Csv/${this.plaza}/null/${this.fecha}/null`, 'EnvioTransacciones.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Excel/${this.plaza}/null/${this.fecha}/null`, 'EnvioTransacciones.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/txt/${this.plaza}/null/${this.fecha}/null`, 'EnvioTransacciones.txt')
          }
        }else if((this.carril == '' || this.carril == null || this.carril == undefined) && (this.fecha == '' || this.fecha == null || this.fecha == undefined)  && (this.tag != '' || this.tag != null || this.tag != undefined)){
          if (formato == "csv") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Csv/${this.plaza}/null/null/${this.tag}`, 'EnvioTransacciones.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/Excel/${this.plaza}/null/null/${this.tag}`, 'EnvioTransacciones.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Operador/Download/txt/${this.plaza}/null/null/${this.tag}`, 'EnvioTransacciones.txt')
          }
        }
      }
    },
  },
};
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
