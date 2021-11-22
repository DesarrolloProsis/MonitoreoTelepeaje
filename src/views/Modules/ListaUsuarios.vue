<template>
  <Navbar/>
  <h1 class="title font-titulo font-bold">Lista de Usuarios Registrados</h1>
  <div class="container mx-auto px-0 pb-24 pt-4">
    <div class="flex flex-wrap bg-blue rounded-lg">
      <div class="flex-none filter-style mt-3">
        Nombre:
        <input v-model="nombre" type="text" class="rounded" />
      </div>
      <div class="flex-none filter-style mt-3">
        Estatus:
        <select v-model="estatus" class="flex-none filter-style color-black rounded" name="select" placeholder="Selecciona">
          <option hidden selected>Seleccione</option>
          <option value="100">Inactivo</option>
          <option value="200">Activo</option>
        </select>
      </div>
      <div class="flex-none filter-style mt-2">
        <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :tipo="'Antifraude'"/>
      </div>
      <div class="flex-none filter-style">
        <button @click="buscar(nombre,estatus, plaza)" class="btn-buscar">Buscar</button>
        <button @click="todos()" class="btn-buscar ml-1">Todos</button>
      </div>
      <div class="flex-1 ml-64 hidden">
        <FilesDownload @download-api="downloadApi"/>
      </div>
    </div>
    <div class="mb-6">
      <button @click="abrirModal" class="w-full botonIconBuscar justify-center mt-3 -mb-8">Agregar Usuario</button>
    </div>
    <TablaListaUsuarios :dataUsuarios="perfiles" :plazaS="plaza" />
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
  <Spinner :modalLoading="modalLoading"/>
  <Footer/>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import FormTramoPlaza from '../../components/Form-tramoplaza.vue';
import TablaListaUsuarios from "../../components/Tabla-listausuarios";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import Multiselect from '@vueform/multiselect';
import Servicio from '../../Servicios/Token-Services';
import FilesDownload from '../../components/Files-descargar.vue'
import { notify } from "@kyvg/vue3-notification";
import ServiceFiles from '../../Servicios/Files-Service'
import Spinner from '../../components/Spn.vue'
import axios from "axios";
import { reactive, ref } from 'vue'
export default {
  components: {
    TablaListaUsuarios,
    Navbar,
    Footer,
    Multiselect,
    FilesDownload,
    Spinner,
    FormTramoPlaza,
    
  },
  setup() {
    const  perfiles = ref([])
    const  token = ref('')
    const  paginaAct = ref(1)
    const  maxPages = ref(1)
    const  nombre = ref('')
    const  estatus = ref(0)
    const  modalAgregar = ref(false)
    const  listaPlazas = ref([])
    const  plazas = ref([{ value: '', label: '' }])
    const  verdad = ref (false)
    const  tramoSeleccionado = ref('')
    const  rol_Filtrado = ref([])
    const  roles = ref ([])
    const  modalLoading = ref(false)
    const errorMessage = ref('')
    //addEmi
    const  formato = ref('')
    const  tramo = ref('')
    const  plaza = ref('')
    const  habilitar = ref(false)
    
    const usuario = reactive ({})
    
    function recibir_tramo_plaza(value){
      tramo.value = value.tramo
      plaza.value = value.plaza
    }
    const abrirModal = async () => {
      modalAgregar.value = true
      let rol = await axios.get(`${API}/CatalogoRoles/null/null/${plaza.value}`)
      rol_Filtrado.value = rol.data.body
      let proxy = new Proxy(rol_Filtrado.value,{
          get : function(target, property){
            return property === 'length' ?
              target.length :
              target[property];
          }
        });
      for(let i= 0; i<proxy.length; i++){
        roles.value.push({'value':proxy[i].rolId, 'label':proxy[i].nombreRol}) 
      } 
    }
    function cancelar (){
      usuario.pass = '',
      usuario.nombre = '',
      usuario.apellidoP = '',
      usuario.apellidoM = '',
      tramoSeleccionado.value = ''
      plazas.value = []
    }
    function todos (){
      token.value =  Servicio.getCookie("Token");
      nombre.value = ''
      estatus.value = 0
      let config = {
        headers: {
          Authorization: "Bearer " + token.value,
        },
      };
      axios.get(`${API}/Usuario?Page=${paginaAct.value}&Rows=10&plaza=${plaza.value}`,config)
        .then((res) => {
          perfiles.value = []
          habilitar.value = true
          maxPages.value = res.data.totalPages;
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
            perfiles.value.push(obj);
          });
        });
    }
    function buscar (nombre,estatus, plaza){
      if(plaza == '' || plaza == null || plaza == undefined){
        notify({
          title:'Sin información',
          text:`Se debe de seleccionar la plaza para hacer una busqueda`,
          duration: 2000,
          type: 'warn'
        });
      }
      else{
        token.value =  Servicio.getCookie("Token");
        if((nombre == '') && (estatus == 0) && (plaza != '' || plaza != null || plaza != undefined)){
          console.log('plaza');
          let config = {
            headers: {
              Authorization: "Bearer " + token.value,
            },
          };
          console.log(config);
          axios.get(`${API}/Usuario?Page=${paginaAct.value}&Rows=10&plaza=${plaza}`,config)
          .then((res) => {
            console.log(res);
            perfiles.value = []
            habilitar.value = true
            maxPages.value = res.data.totalPages;
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
              perfiles.value.push(obj);
            });
          });
        }if((nombre != '') && (plaza != '' || plaza != null || plaza != undefined)){
          let config = {
            headers: {
              Authorization: "Bearer " + token.value,
            },
          };
          axios.get(`${API}/Usuario?Page=${paginaAct.value}&Rows=10&NameFilter=${nombre.value}&plaza=${plaza}`,config)
          .then((res) => {
            perfiles.value = []
            maxPages.value = res.data.totalPages;
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
              perfiles.value.push(obj);
            });
          });
        }if((estatus != 0) && (plaza != '' || plaza != null || plaza != undefined)){
          console.log('estatus');
          perfiles.value = []
          if(estatus.value == 100){
            let config = {
            headers: {
              Authorization: "Bearer " + token.value,
            },
            };
            axios.get(`${API}/Usuario?Page=${paginaAct.value}&Rows=10&EstatusFilter=false&plaza=${plaza}`,config)
            .then((res) => {
              if((res.data.page.lenght > 0) && (res.status == 200)){
                maxPages.value = res.data.totalPages;
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
                  perfiles.value.push(obj);
                });
              }
            });
          }if(estatus.value == 200){
            let config = {
            headers: {
              Authorization: "Bearer " + token.value,
            },
            };
            axios.get(`${API}/Usuario?Page=${paginaAct.value}&Rows=10&EstatusFilter=true&plaza=${plaza}`,config)
            .then((res) => {
              perfiles.value = []
              maxPages.value = res.data.totalPages;
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
                perfiles.value.push(obj);
              });
            });
          }
        }
      }
    }
    function guardar (){
      if(Servicio.getCookie("Token")){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + Servicio.getCookie("Token")
          }
        }
        const data = {
          "password": usuario.pass,
          "nombre": usuario.nombre,
          "apellidoPaterno": usuario.apellidoP,
          "apellidoMaterno": usuario.apellidoM,
          "idrol": usuario.rol,
        } 
        console.log(data);
        if(usuario.nombre != '' && usuario.apellidoP != '' && usuario.apellidoM != '' && usuario.pass != '' ){
          let userName = usuario.nombre.slice(0,3)+usuario.apellidoP
          console.log(userName);
          modalLoading.value = true
          modalAgregar.value = false
          axios.post(`${API}/Usuario`,data,config)
            .then((result)=>{
              console.log(result);
              setTimeout(() => {
                //this.$router.push("/configuracion");
                modalLoading.value = false
                notify({
                  title:'Nuevo Usuario',
                  text:`Se creo correctamente el nuevo usuario ${userName}`,
                  duration: 20000,
                  closeonclick:true,
                  type: 'success'
                });
              }, 1000);
              errorMessage.value = ""
            })
            .catch(() =>{
              errorMessage.value = "Hubo un error al crear el usuario, intentalo nuevamente."
            })
        }else{
          notify({
            title:'Nuevo Usuario',
            text:`Todos los campos son obligatorios`,
            duration: 20000,
            closeonclick:true,
            type: 'warn'
          });
        }
      }
    }
    function anterior () {
      let config = {
        headers: {
          Authorization: "Bearer " + token.value,
        },
      };
      paginaAct.value = paginaAct.value - 1;
      axios.get(`${API}/Usuario?Page=${paginaAct.value}&Rows=10&plaza=${plaza.value}`,config)
        .then((res) => {
          perfiles.value = []
          maxPages.value = res.data.totalPages;
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
            perfiles.value.push(obj);
          });
        });
    }
    function siguiente () {
      let config = {
        headers: {
          Authorization: "Bearer " + token.value,
        },
      };
      paginaAct.value = paginaAct.value + 1;
      axios.get(`${API}/Usuario?Page=${paginaAct.value}&Rows=10&plaza=${plaza.value}`,config)
        .then((res) => {
          perfiles.value = []
          maxPages.value = res.data.totalPages;
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
            perfiles.value.push(obj);
          });
        });
    }
    function downloadApi (formato){
      if((plaza.value == '' || plaza.value == null || plaza.value == undefined) && ( estatus.value == '' || estatus.value == null || estatus.value == undefined)){
        this.$notify({
          title:'Sin información',
          text:`Se debe de seleccionar la plaza para hacer una busqueda`,
          duration: 2000,
          type: 'warn'
        });
      }else{
        if((plaza.value != '' || plaza.value != null || plaza.value != undefined) && (nombre.value == '' || nombre.value == null || nombre.value == undefined) && (estatus.value == '' || estatus.value == null || estatus.value == undefined)){
          if (formato == "csv") {
          ServiceFiles.xml_hhtp_request(`${API}/Usuario/Download/Csv/${plaza.value}/null/null`, 'listaUsuarios.csv')
          } 
          else if (formato == "excel") {        
            ServiceFiles.xml_hhtp_request(`${API}/Usuario/Download/Excel/${plaza.value}/null/null`, 'listaUsuarios.xlsx')    
          } 
          else if (formato == "txt") {
            ServiceFiles.xml_hhtp_request(`${API}/Usuario/Download/txt/${plaza.value}/null/null`, 'listaUsuarios.txt')
          }
        }
      }      
    }
  
  return {recibir_tramo_plaza, abrirModal, cancelar, todos, buscar, guardar, anterior, siguiente, downloadApi, usuario, perfiles, token, paginaAct, maxPages, nombre, estatus, modalAgregar, listaPlazas, plazas, verdad, tramoSeleccionado, rol_Filtrado, roles, modalLoading, formato, tramo, plaza, habilitar}
  },
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.modal-container{
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.2);
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