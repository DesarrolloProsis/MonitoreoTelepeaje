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
      <div class="flex-none ml-10 w-48">
        <Multiselect v-model="formato" placeholder="Seleccione una Acción" @close="downloadApi(formato)" label="name" trackBy="name" :options="opticones_select_acciones()" :searchable="true">
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
    <div class="mb-6">
      <button @click="modalAgregar=true" class="w-full botonIconBuscar justify-center mt-3 -mb-8">Agregar Usuario</button>
    </div>
    <TablaListaUsuarios :dataUsuarios="perfiles"></TablaListaUsuarios>
    <div class="">
      <button class="button-pagination" v-if="paginaAct > 1" @click="anterior()">Anterior</button>
      <button class="button-pagination" v-if="paginaAct < maxPages" @click="siguiente()">Siguiente</button>
      <p  class="desc-paginacion">
        Página {{ paginaAct }} de {{ maxPages }}
      </p>
    </div>
  </div>
  <!-- MODAL CREAR USUARIO -->
  <div class="sticky inset-0 " :class="{'modal-container': modalAgregar}">
    <div v-if="modalAgregar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69  mx-auto px-12 py-10 shadow-2xl mt-60">
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
        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Rol *</p>
        <Multiselect
          v-model="usuario.rol"
          placeholder="Seleccione un Rol"
          :searchable="true"
          :options="roles"
          :close-on-select="true"
        /> 
      </div>
      <div class="mt-5 text-center ml-6">
        <button @click="guardar" class="botonIconBuscar">Guardar</button>
        <button @click="cancelar(), modalAgregar= false" class="botonIconCancelar">Cancelar</button>
      </div>
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
import TablaListaUsuarios from "../../components/Tabla-listausuarios";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import Multiselect from '@vueform/multiselect';
import Servicio from '../../Servicios/Token-Services';
import saveAs from "file-saver";
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
      modalLoading:false,
      //addEmi
      formato: ''
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
    if (Servicio.getCookie("Token")) {
      let config = {
        headers: {
          Authorization: "Bearer " + Servicio.getCookie("Token"),
        },
      };
      this.token =  Servicio.getCookie("Token");
      axios.get(`${API}/Usuario?Page=${this.paginaAct}&Rows=10`,config)
        .then((result) => {
          console.log(result.data);
          this.maxPages = result.data.totalPages;
          result.data.page.forEach((e) => {
            let obj = {
              id: e.usuarioId,
              usuario: e.nombreUsuario,
              nombre: e.nombre,
              apellido: e.apellidoPaterno,
              rol: e.rol,
              rolId: e.idRol,
              plazas: e.plazas,
              estatus: e.estatus,
            };
            this.perfiles.push(obj);
          });
        });
    }
  },
  methods: {
    guardar: function (){
      if(Servicio.getCookie("Token")){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + Servicio.getCookie("Token")
          }
        } 
        const data = {
          "password": this.usuario.pass,
          "nombre": this.usuario.nombre,
          "apellidoPaterno": this.usuario.apellidoP,
          "apellidoMaterno": this.usuario.apellidoM,
          "idrol": this.usuario.rol,
        } 
        console.log(data);
        if(this.usuario.nombre != '' && this.usuario.apellidoP != '' && this.usuario.apellidoM != '' && this.usuario.pass != '' ){
          this.modalLoading = true
          this.modalAgregar = false
          axios.post(`${API}/Usuario`,data,config)
            .then((result)=>{
              console.log(result);
              setTimeout(() => {
                this.$router.push("/configuracion");
                this.modalLoading = false
                this.$notify({
                  title:'Nuevo Usuario',
                  text:'Se creo correctamente el nuevo usuario',
                  type: 'success'
                });
              }, 1000);
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
              id: e.usuarioId,
              usuario: e.nombreUsuario,
              nombre: e.nombre,
              apellido: e.apellidoPaterno,
              rol: e.rol,
              plazas: e.plazas,
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
              id: e.usuarioId,
              usuario: e.nombreUsuario,
              nombre: e.nombre,
              apellido: e.apellidoPaterno,
              rol: e.rol,
              plazas: e.plazas,
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
              id: e.usuarioId,
              usuario: e.nombreUsuario,
              nombre: e.nombre,
              apellido: e.apellidoPaterno,
              rol: e.rol,
              plazas: e.plazas,
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
              id: e.usuarioId,
              usuario: e.nombreUsuario,
              nombre: e.nombre,
              apellido: e.apellidoPaterno,
              rol: e.rol,
              plazas: e.plazas,
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
                id: e.usuarioId,
                usuario: e.nombreUsuario,
                nombre: e.nombre,
                apellido: e.apellidoPaterno,
                rol: e.rol,
                plazas: e.plazas,
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
    downloadApi(){
      if (this.formato == "csv") {
        this.xml_hhtp_request(`${API}/Usuario/Download/Csv`, 'test.csv')
      } 
      else if (this.formato == "excel") {        
        //this.xml_hhtp_request(`${API}/Transacciones/Download/Excel?tag=${tag}&carril=${carril}&plaza=${plaza}&fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`, 'test.xlsx')
    
      } 
      else if (this.formato == "txt") {
        this.xml_hhtp_request(`${API}/Usuario/Download/txt`, 'test.txt')
      }
      console.log(this.formato)
    },
     xml_hhtp_request(urlToFile,nameFile){      
      var oReq = new XMLHttpRequest();  
      oReq.open("GET", urlToFile, true);    
      oReq.responseType = "blob";  
      oReq.send();              
      oReq.onload = function () {
        var file = new Blob([oReq.response], {
          type: "application/pdf",
        });       
        saveAs(file, nameFile);  
      };            
    },
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
  border: 1px solid #2c5282;
  border-radius: 5px;
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