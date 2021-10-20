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
        <Multiselect v-model="formato" placeholder="Sleccione una Acción" @close="acciones_mapper(formato)" label="name" trackBy="name" :options="opticones_select_acciones()" :searchable="true">
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
    <div class="container mx-auto px-0 md:px-60">
      <TablaAccesos :dataAccesos="accesos"></TablaAccesos>
    </div>
  </div>
  <Footer></Footer>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import TablaAccesos from "../../components/Tabla-accesos.vue";
import Multiselect from '@vueform/multiselect';
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import axios from "axios";
export default {
  name: "BitacoraAccesos",
  components: { TablaAccesos, Navbar, Footer, Multiselect },
  data() {
    return {
      accesos:[],
      nombre:null,
      value: '',
      formato:'',
      isLoading: false,
      fecha:null
    };
  },
  beforeMount (){
    axios.get(`${API}/UsuarioMonitoreo/null/null`)
      .then((result)=>{
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
      this.accesos = []
      this.nombre = null
      this.fecha = null
      axios.get(`${API}/UsuarioMonitoreo/null/null`)
      .then((result)=>{
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
      if(nombre != null && fecha == null){
        this.accesos = []
        axios.get(`${API}/UsuarioMonitoreo/${nombre}/null`)
        .then((result)=>{
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
        axios.get(`${API}/UsuarioMonitoreo/null/${fecha}`)
        .then((result)=>{
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
        axios.get(`${API}/UsuarioMonitoreo/${nombre}/${fecha}`)
        .then((result)=>{
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
    }
  },
};
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
