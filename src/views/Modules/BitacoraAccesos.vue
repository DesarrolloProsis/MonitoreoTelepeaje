<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-0 pb-100">
    <h1 class="title-center font-titulo font-bold pb-4">Bitácora de Accesos</h1>
    <div class="flex flex-wrap bg-blue rounded-lg">
      <div class="flex-none filter-style mt-2">
        Usuario:
        <input v-model="nombre" type="text" class="rounded"/>
      </div>
      <div class="flex-none filter-style mt-2">
        Fecha:
        <input v-model="fecha" type="date" class="rounded"/>
      </div>
      <div class="flex-none filter-style">
        <button @click="buscar(nombre, fecha )" class="btn-buscar mr-2">Buscar</button>
        <button @click="todos()" class="btn-buscar mr-89">Todos</button>
      </div>
      <div class="flex-1">
        <FilesDownload @download-api="downloadApi"></FilesDownload>   
      </div>
    </div>
    <div class="container mx-auto px-0 md:px-60">
      <TablaAccesos :dataAccesos="accesos"></TablaAccesos>
    </div>
  </div>
  <!-- MODAL CARGANDO -->
  <div class="inset-0" :class="{'modal-container': modalLoading}">
    <div v-if="modalLoading" class=" inset-0 font-titulo mt-56 mb-8">
      <div class="rounded-lg w-66 justify-center absolute inset-x-0 bg-none mx-69 px-12 py-10 ">          
        <div class="justify-center text-center block">            
          <!--<img src="@/assets/load.gif"  class="h-48 w-48" />-->
          <Spinner/>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import TablaAccesos from "../../components/Tabla-accesos.vue";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import FilesDownload from '../../components/Files-descargar.vue'
import ServiceFiles from '../../Servicios/Files-Service'
import Spinner from '../../components/Spinner.vue'
import axios from "axios";
export default {
  name: "BitacoraAccesos",
  components: { TablaAccesos, Navbar, Footer, FilesDownload, Spinner },
  data() {
    return {
      accesos:[],
      nombre:null,
      value: '',
      formato:'',
      modalLoading: false,
      fecha:null
    };
  },
  beforeMount (){
    this.modalLoading = true
    axios.get(`${API}/UsuarioMonitoreo/null/null`)
      .then((result)=>{
        this.modalLoading = false
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
          this.accesos.push(obj)
        })
      })
  },
  methods: {
    todos(){
      this.modalLoading = true
      this.accesos = []
      this.nombre = null
      this.fecha = null
      axios.get(`${API}/UsuarioMonitoreo/null/null`)
      .then((result)=>{
        this.modalLoading = false
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
          this.accesos.push(obj)
        })
      })
    },
    buscar(nombre, fecha){
      if(nombre == null && fecha == null){
        this.$notify({
          title:'No Hay Datos',
          text:'No se indico ningún dato para filtrar',
          type: 'warn'
        });
      }
      if(nombre != null && fecha == null){
        this.accesos = []
        this.modalLoading = true
        axios.get(`${API}/UsuarioMonitoreo/${nombre}/null`)
        .then((result)=>{
          this.modalLoading = false
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
            this.accesos.push(obj)
          })
        })
      }
      if(fecha != null && nombre == null){
        this.accesos = []
        this.modalLoading = true
        axios.get(`${API}/UsuarioMonitoreo/null/${fecha}`)
        .then((result)=>{
          this.modalLoading = false
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
            this.accesos.push(obj)
          })
        })
      }
      if(fecha != null && nombre != null){
        this.accesos = []
        this.modalLoading = true
        axios.get(`${API}/UsuarioMonitoreo/${nombre}/${fecha}`)
        .then((result)=>{
          this.modalLoading = false
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
            this.accesos.push(obj)
          })
        })
      }
    },
    downloadApi(formato){
      let nombrenew = 'null'
      let fechanew = 'null'
      if(this.nombre != '')
        nombrenew = this.nombre
      if(this.fecha != '')
        fechanew = this.fecha
      
      if (formato == "csv") {
        ServiceFiles.xml_hhtp_request(`${API}/UsuarioMonitoreo/Download/Csv?userName=${nombrenew}&HoraInicio=${fechanew}`, 'bitacoraAcceso.csv')
      } 
      else if (formato == "excel") {        
        ServiceFiles.xml_hhtp_request(`${API}/UsuarioMonitoreo/Download/Excel?userName=${nombrenew}&HoraInicio=${fechanew}`, 'bitacoraAcceso.xlsx')    
      } 
      else if (formato == "txt") {
        ServiceFiles.xml_hhtp_request(`${API}/UsuarioMonitoreo/Download/txt?userName=${nombrenew}&HoraInicio=${fechanew}`, 'bitacoraAcceso.txt')
      }      
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
    background: rgba(0, 0, 0, 0.2);
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
