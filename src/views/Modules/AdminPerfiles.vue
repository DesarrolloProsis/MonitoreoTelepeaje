<template>
  <Navbar></Navbar>
  <h1 class="title font-titulo font-bold">Administración de Roles</h1>
    <!-- Modal Rol -->
  <div class="sticky inset-0 " :class="{'modal-container': userModal}">
    <div v-if="userModal" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69  mx-auto px-12 py-10 shadow-2xl mt-66">
      <p class="text-gray-900 font-bold text-2xl -mt-8 mb-8 text-center">Agregar Nuevo Rol</p>     
      <div class="grid grid-cols-2 mt-2">
        <p class="text-sm mb-1 font-semibold text-gray-700 sm:-ml-6">Nombre Rol</p>
        <input v-model="newRol.nombre" type="text" class="border rounded-lg">
      </div>
      <div class="grid grid-cols-2 mt-2">
        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Vistas</p>
        <Multiselect
          v-model="newRol.vistas" 
          label="text"
          mode="multiple"
          valueProp="alias"
          placeholder="Seleccione las Plazas"                    
          :options="optionRoles"
        /> 
      </div>      
      <div class="mt-5 text-center ml-6">
        <button @click="craer_nuevo_rol" class="botonIconBuscar">Guardar</button>
        <button @click="abrir_modal_new_rol" class="botonIconCancelar">Cancelar</button>
      </div>
    </div>
  </div>
  <div class="container mx-auto px-0 pb-24 pt-4">    
    <div class="flex flex-wrap bg-blue rounded-lg">
      <div class="flex-none filter-style">
        Nombre:
        <input v-model="nombre" type="text" class="rounded "/>
      </div>
      <div class="flex-none filter-style">
        Estatus:
        <select v-model="estatus" class="flex-none filter-style color-black rounded" name="select" placeholder="Selecciona">
          <option hidden selected>Seleccione </option>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>
      <div class="flex-none filter-style">
        <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :tipo="'Antifraude'"></FormTramoPlaza>
      </div>
      <div class="flex-none filter-style">
        <button @click="buscar(nombre,estatus)"  class="btn-buscar">Buscar</button>
        <button @click="todos()"  class="btn-buscar mx-3">Todos</button>
      </div>
      <!-- <div class="flex-1 ml-89 hidden">
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
      </div> -->
    </div>
    <div class="mb-6">
      <button @click="abrir_modal_new_rol" class="w-full botonIconBuscar justify-center mt-3 -mb-8">Agregar Usuario</button>
    </div>
    <TablaListaPerfiles @buscar-roles="buscar_roles" :dataPerfiles="roles"></TablaListaPerfiles>
  </div>
  <Footer></Footer>
</template>

<script>
import TablaListaPerfiles from "../../components/Tabla-listaperfiles";
import FormTramoPlaza from '../../components/Form-tramoplaza.vue';
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import axios from 'axios';
import Multiselect from '@vueform/multiselect'
import { notify } from "@kyvg/vue3-notification";
import { onMounted, reactive, ref } from 'vue'
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
  components: {
    TablaListaPerfiles,
    Navbar,
    Multiselect,
    Footer,
    FormTramoPlaza
  },
  setup(){
    
    const nombre = ref(null)
    const estatus = ref(null)
    const roles = ref([])
    const tramo = ref(null)
    const plaza = ref(null)   
    const userModal = ref(false)
    const newRol = reactive({ nombre: "", vistas: [] })
    const optionRoles = [{text: 'Monitoreo Servicio', alias: 'monitoreoServicios'},
                         {text: 'Monitoreo Carriles', alias: 'monitoreoCarriles'},
                         {text: 'Monitoreo Cruces', alias: 'monitoreoCruces'},
                         {text: 'Envio Transacciones', alias: 'envioTransacciones'},
                         {text: 'Busqueda Cruces', alias: 'busquedaCruces'},
                         {text: 'Bitacora Accesos', alias: 'bitacoraAccesos'},
                         {text: 'Estatus Tags', alias: 'estatusTags'},
                         {text: 'Configuracion', alias: 'configuracion'}]
    
    const buscar_roles = async () => {   
      axios.get(`${API}/CatalogoRoles/null/null`)
        .then((response) => {
            console.log(response);
            roles.value = response.data.body 
            console.log(response.data.body );
          }
        )
        .catch((error) => console.log(error))        
    }    
    //Nuevo Rol
    const abrir_modal_new_rol = () => userModal.value = !userModal.value    
    const craer_nuevo_rol = async () => {
      //objeto para post api
      let objRol = {}
      objRol['nombreRol'] = newRol.nombre
      objRol['monitoreoServicios'] = false,
      objRol['monitoreoCarriles'] = false,
      objRol['monitoreoCruces'] = false,
      objRol['envioTransacciones'] = false,
      objRol['busquedaCruces'] = false,
      objRol['bitacoraAccesos'] = false,
      objRol['estatusTags'] = false,
      objRol['configuracion'] = false,
      objRol['dateStamp'] = new Date(),
      objRol['activo'] = true                 
      //Validamos que plazas selecciono el usuario y modificamos objRol            
      newRol.vistas.forEach(item => {       
          objRol[item] = true                   
      })
      axios.post(`${API}/CAtalogoRoles`, objRol)
        .then((response) => {
          console.log(response)
          if(response.data.status == 'Ok'){
            notify({ type: 'success', title:'Rol creado', text: `Se creo correctamente el rol ${objRol.nombreRol}`});
            newRol.vistas = []; newRol.nombre = "";
            abrir_modal_new_rol()
            buscar_roles()   
          }       
        })
        .catch((error) => {
          console.log(error)
          abrir_modal_new_rol()
          notify({ type: 'warning', title:'Rol no creado', text: `No se pudo crear el rol ${objRol.nombreRol}`});
        })
    }
    /* function  acciones_mapper (formato){
      if(formato == 'excel'){
        console.log('excel');
      }if(formato == 'csv'){
        console.log('csv');
      }if(formato == 'txt'){
        console.log('txt');
      }
      this.formato = ''
    }
    function opticones_select_acciones(){
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
    } */
    function buscar (nombre,estatus){
      console.log(nombre);
      roles.value = []
      axios.get(`${API}/CatalogoRoles/${nombre}/${estatus}`)
        .then((response) => {
            console.log(response);
            if((response.data.status == 'Ok') && (response.data.body.length > 0)){
              roles.value = response.data.body 
            }else{
              notify({ type: 'warn', title:'Rol no creado', text: `No se encontró el Rol`});
            }
          }
        )
        .catch((error) => console.log(error))
    }
    function todos (){
      nombre.value = null
      estatus.value = null
      axios.get(`${API}/CatalogoRoles/null/null`)
        .then((response) => {
            roles.value = response.data.body 
            console.log(response.data.body );
          }
        )
        .catch((error) => console.log(error))
    }
    function recibir_tramo_plaza(value){
      tramo.value = value.tramo
      plaza.value = value.plaza
    }
    onMounted(buscar_roles)
    return { roles, userModal, buscar_roles, abrir_modal_new_rol, newRol, optionRoles, craer_nuevo_rol,nombre,estatus,buscar,todos, recibir_tramo_plaza }

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
.title {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
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
<style src="@vueform/multiselect/themes/default.css"></style>