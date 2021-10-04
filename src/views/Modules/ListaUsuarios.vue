<template>
  <Navbar></Navbar>
  <h1 class="title font-titulo font-bold">Lista de Usuarios Registrados</h1>
  <div class="container mx-auto px-0 pb-24 pt-4">
    <div class="flex flex-wrap bg-blue">
      <div class="flex-none filter-style">
        Nombre:
        <input v-model="nombre" type="text" />
      </div>
      <div class="flex-none filter-style">
        Estatus:
        <select v-model="estatus" class="flex-none filter-style color-black" name="select" placeholder="Selecciona">
          <option hidden selected>Seleccione</option>
          <option value="100">Inactivo</option>
          <option value="200">Activo</option>
        </select>
      </div>
      <div class="flex-none filter-style">
        <button @click="buscar(nombre,estatus)" class="btn-buscar">Buscar</button>
        <button @click="todos()" class="btn-buscar ml-1">Todos</button>
      </div>
      <div class="flex-1">
        <button class="btn-carriles ml-right animacion">Descargar Excel</button>
      </div>
    </div>
    <div class="mb-6">
      <button @click="modalAgregar=true" class="w-full botonIconBuscar justify-center mt-3 -mb-8">Agregar Usuario</button>
    </div>
    <TablaListaUsuarios :dataUsuarios="perfiles"></TablaListaUsuarios>
    <button class="button-pagination" v-if="paginaAct > 1" @click="anterior()">Anterior</button>
    <button class="button-pagination" v-if="paginaAct < maxPages" @click="siguiente()">Siguiente</button>
    <p  class="desc-paginacion">
      Página {{ paginaAct }} de {{ maxPages }}
    </p>
  </div>
  <!-- MODA CREAR USUARIO -->
  <div class="sticky inset-0 " :class="{'modal-container': modalAgregar}">
    <div v-if="modalAgregar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69  mx-auto px-12 py-10 shadow-2xl mt-66">
      <p class="text-gray-900 font-bold text-2xl -mt-8 mb-8 text-center">Agregar Encargado de Plaza</p>
      <div class="grid grid-cols-2 mt-2">
        <p class="text-sm mb-1 font-semibold text-gray-700 sm:-ml-6">Nombre(s) *</p>
        <input v-model="usuario.nombre" type="text" class="border rounded-lg">
        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Apellido Paterno *</p>
        <input v-model="usuario.apellidoP" type="text" class="border rounded-lg">
        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Apellido Materno *</p>
        <input v-model="usuario.apellidoM" type="text" class="border rounded-lg">
        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Contraseña *</p>
        <input v-model="usuario.pass" type="text" class="border rounded-lg">
        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Tramo</p>
        <select v-model="tramoSeleccionado" @change="plazasfil()" class="w-full border rounded-lg">
          <option disabled value>Selecionar...</option>     
          <option value="1">México Acapulco</option>     
          <option value="2">México Irapuato</option>
        </select>
        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Plazas *</p>
        <Multiselect
          v-model="usuario.plazas"
          mode="multiple"
          placeholder="Seleccione las Plazas"
          :searchable="true"
          :options="plazas"
          :close-on-select="false"
        /> 
        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Rol *</p>
        <Multiselect
          v-model="usuario.rol"
          placeholder="Seleccione un Rol"
          :searchable="true"
          :options="roles"
          :close-on-select="true"
        /> 
        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Correo</p>
        <input v-model="usuario.correo" type="text" class="border rounded-lg">
      </div>
      <div class="mt-5 text-center ml-6">
        <button @click="guardar" class="botonIconBuscar">Guardar</button>
        <button @click="cancelar(), modalAgregar= false" class="botonIconCancelar">Cancelar</button>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import TablaListaUsuarios from "../../components/Tabla-listausuarios";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import Multiselect from '@vueform/multiselect'

import axios from "axios";
export default {
  components: {
    TablaListaUsuarios,
    Navbar,
    Footer,
    Multiselect
  },
  data() {
    return {
      perfiles: [],
      token: "",
      paginaAct: 1,
      maxPages: 1,
      nombre: '',
      estatus:0,
      modalAgregar: false,
      usuario:{
        nombre: '',
        apellidoP:'',
        apellidoM:'',
        pass:'',
        plazas:[],
        rol:'',
        correo:''
      },
      listaPlazas:[],
      plazas:[{ value: '', label: '' }],
      verdad:false,
      tramoSeleccionado: '',
      rol_Filtrado:[],
      roles:[],
    };
  },
  async beforeMount() {
    let rol = await axios.get(`${API}/CatalogoRoles`)
    this.rol_Filtrado = rol.data.body
    let proxy = new Proxy(this.rol_Filtrado,{
        get : function(target, property){
          return property === 'length' ?
            target.length :
            target[property];
        }
      });
    for(let i= 0; i<proxy.length; i++){
      this.roles.push({'value':proxy[i].rolId, 'label':proxy[i].nombreRol}) 
    }
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    // Get token config
    if (getCookie("Token")) {
      let config = {
        headers: {
          Authorization: "Bearer " + getCookie("Token"),
        },
      };
      this.token = getCookie("Token");
      axios.get(`${API}/Usuario?Page=${this.paginaAct}&Rows=10`,config)
        .then((result) => {
          this.maxPages = result.data.totalPages;
          result.data.page.forEach((e) => {
            let obj = {
              nombre: e.nombre,
              apellido: e.apellidoPaterno,
              rol: e.rol,
              estatus: e.estatus,
            };
            this.perfiles.push(obj);
          });
        });
    }
  },
  methods: {
    getCookie: function(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    guardar: function (){
      if(this.getCookie("Token")){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + this.getCookie("Token")
          }
        }
        const data = {
          "password": this.usuario.pass,
          "nombre": this.usuario.nombre,
          "apellidoPaterno": this.usuario.apellidoP,
          "apellidoMaterno": this.usuario.apellidoM,
          "rol": '1',
          "email": 'correo',
          "estatus": true,
        } 
        if(this.usuario.nombre != '' && this.usuario.apellidoP != '' && this.usuario.apellidoM != '' && this.usuario.pass != '' ){
          axios.post(`${API}/Usuario`,data,config)
            .then((result)=>{
                console.log(result)
                this.errorMessage = ""
            })
            .catch(() =>{
              this.errorMessage = "Hubo un error al crear el usuario, intentalo nuevamente."

            })
        }else{
          alert('* Son campos obligatorios')
        }
      }
    },
    anterior: function () {
      let config = {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };
      this.paginaAct = this.paginaAct - 1;
      axios
        .get(
          `${API}/Usuario?Page=${this.paginaAct}&Rows=10`,
          config
        )
        .then((res) => {
          this.perfiles = []
          this.maxPages = res.data.totalPages;
          res.data.page.forEach((e) => {
            let obj = {
              nombre: e.nombre,
              apellido: e.apellidoPaterno,
              rol: e.rol,
              estatus: e.estatus,
            };
            this.perfiles.push(obj);
          });
        });
    },
    siguiente: function () {
      
      let config = {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };
      this.paginaAct = this.paginaAct + 1;
      axios
        .get(
          `${API}/Usuario?Page=${this.paginaAct}&Rows=10`,
          config
        )
        .then((res) => {
          this.perfiles = []
          this.maxPages = res.data.totalPages;
          res.data.page.forEach((e) => {
            let obj = {
              nombre: e.nombre,
              apellido: e.apellidoPaterno,
              rol: e.rol,
              estatus: e.estatus,
            };
            this.perfiles.push(obj);
          });
        });
    },
    todos: function (){
      this.nombre = ''
      let config = {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };
      axios
        .get(
          `${API}/Usuario?Page=${this.paginaAct}&Rows=10`,
          config
        )
        .then((res) => {
          this.perfiles = []
          this.maxPages = res.data.totalPages;
          res.data.page.forEach((e) => {
            let obj = {
              nombre: e.nombre,
              apellido: e.apellidoPaterno,
              rol: e.rol,
              estatus: e.estatus,
            };
            this.perfiles.push(obj);
          });
        });
    },
    buscar: function (nombre,estatus){
      if(nombre != ''){
        let config = {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        };
        axios.get(`${API}/Usuario?Page=${this.paginaAct}&Rows=10&NameFilter=${this.nombre}`,config)
        .then((res) => {
          this.perfiles = []
          this.maxPages = res.data.totalPages;
          res.data.page.forEach((e) => {
            let obj = {
              nombre: e.nombre,
              apellido: e.apellidoPaterno,
              rol: e.rol,
              estatus: e.estatus,
            };
            this.perfiles.push(obj);
          });
        });
      }if(estatus != undefined){
        if(this.estatus == 100){
          let config = {
          headers: {
            Authorization: "Bearer " + this.token,
          },
          };
          axios.get(`${API}/Usuario?Page=${this.paginaAct}&Rows=10&EstatusFilter=false`,config)
          .then((res) => {
            this.perfiles = []
            this.maxPages = res.data.totalPages;
            res.data.page.forEach((e) => {
              let obj = {
                nombre: e.nombre,
                apellido: e.apellidoPaterno,
                rol: e.rol,
                estatus: e.estatus,
              };
              this.perfiles.push(obj);
            });
          });
        }if(this.estatus == 200){
          let config = {
          headers: {
            Authorization: "Bearer " + this.token,
          },
          };
          axios.get(`${API}/Usuario?Page=${this.paginaAct}&Rows=10&EstatusFilter=true`,config)
          .then((res) => {
            this.perfiles = []
            this.maxPages = res.data.totalPages;
            res.data.page.forEach((e) => {
              let obj = {
                nombre: e.nombre,
                apellido: e.apellidoPaterno,
                rol: e.rol,
                estatus: e.estatus,
              };
              this.perfiles.push(obj);
            });
          });
        }
      }
    },
    cancelar: function (){
      this.usuario.nombre = '' 
      this.usuario.apellidoP = '' 
      this.usuario.apellidoM = ''
      this.usuario.pass = '' 
      this.usuario.rol = ''
      this.usuario.correo = ''  
      this.tramoSeleccionado = ''
      this.plazas = []
    },
    plazasfil: async function (){
      let porTramo = await axios.get(`${API}/PlazaAsignada/PorTramo/${this.tramoSeleccionado}`)
      //let plazas = await axios.get(`${API}/PlazaAsignada`)
      this.listaPlazas = porTramo.data.body
      /* let filtradas = this.listaPlazas.filter(plazas => plazas.tramoAsignadoId == this.tramoSeleccionado)*/
      let proxy = new Proxy(this.listaPlazas,{
        get : function(target, property){
          return property === 'length' ?
            target.length :
            target[property];
        }
      });
      if(this.tramoSeleccionado == ''){
        for(let i= 0; i<proxy.length; i++){
          this.plazas.push({'value':proxy[i].plazaAsignadaId, 'label':proxy[i].nombre}) 
        }
      }else{
        this.plazas = []
        for(let i= 0; i<proxy.length; i++){
          this.plazas.push({'value':proxy[i].plazaAsignadaId, 'label':proxy[i].nombre}) 
        }
      }
    }
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.modal-container{
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
}
.title {
  text-align: center;
  font-size: 45px;
  padding-top: 20px;
}
.button-pagination {
  padding: 2px;
  border: 1px solid black;
  margin-right: 5px;
  font-size: 12px;
  margin-top: 20px;
}
.bg-blue {
  background-color: #2c5282;
  padding: 10px 5px;
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
.btn-carriles:focus {
  outline: 0;
}
.btn-buscar {
  background-color: #017296;
  color: white;
  height: 100%;
  padding: 0px 5px;
  border-radius: 5px;
}
.btn-buscar:focus {
  outline: 0;
}
.color-black {
  color: black !important;
}
.color-black:focus {
  outline: 0;
}
@media (max-width: 750px) {
  .title {
    font-size: 20px;
    padding-bottom: 20px;
  }
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