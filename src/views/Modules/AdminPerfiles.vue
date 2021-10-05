<template>
  <Navbar></Navbar>
  <h1 class="title font-titulo font-bold">Administración de Perfiles</h1>
    <!-- Modal Rol -->
  <div class="sticky inset-0 " :class="{'modal-container': userModal}">
    <div v-if="userModal" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69  mx-auto px-12 py-10 shadow-2xl mt-66">
      <p class="text-gray-900 font-bold text-2xl -mt-8 mb-8 text-center">Agregar Encargado de Plaza</p>     
      <div class="grid grid-cols-2 mt-2">
        <p class="text-sm mb-1 font-semibold text-gray-700 sm:-ml-6">Nombre Rol</p>
        <input v-model="newRol.nombre" type="text" class="border rounded-lg">
        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Plazas</p>
        <Multiselect
          v-model="usuario.plazas"
          mode="multiple"
          placeholder="Seleccione las Plazas"
          :searchable="true"
          :options="plazas"
          :close-on-select="false"
        /> 
      </div>
      <div class="mt-5 text-center ml-6">
        <button class="botonIconBuscar">Guardar</button>
        <button @click="abrir_modal_new_rol" class="botonIconCancelar">Cancelar</button>
      </div>
    </div>
  </div>
  <div class="container mx-auto px-0 pb-24 pt-4">    
    <div class="flex flex-wrap bg-blue">
      <div class="flex-none filter-style">
        Nombre:
        <input type="text" />
      </div>
      <div class="flex-none filter-style">
        Estatus:
        <select class="flex-none filter-style color-black" name="select">
          <option value="100" selected>Inactivo</option>
          <option value="200">Activo</option>
        </select>
      </div>
      <div class="flex-none filter-style">
        <button class="btn-buscar">Buscar</button>
      </div>
      <div class="flex-1">
        <button class="btn-carriles ml-right">Descargar Excel</button>
      </div>
    </div>
    <div class="mb-6">
      <button @click="abrir_modal_new_rol" class="w-full botonIconBuscar justify-center mt-3 -mb-8">Agregar Usuario</button>
    </div>
    <TablaListaPerfiles :dataPerfiles="roles"></TablaListaPerfiles>
  </div>
  <Footer></Footer>
</template>
<script>
import TablaListaPerfiles from "../../components/Tabla-listaperfiles";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import axios from 'axios';
import Multiselect from '@vueform/multiselect'
import { onMounted, reactive, ref } from 'vue'
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
  components: {
    TablaListaPerfiles,
    Navbar,
    Multiselect,
    Footer,
  },
  setup(){

    const roles = ref([])
    const userModal = ref(false)
    const buscar_roles = async () => {   
      axios.get(`${API}/CatalogoRoles`)
        .then((response) => roles.value = response.data.body)
        .catch((error) => console.log(error))        
    }
    const abrir_modal_new_rol = () => userModal.value = !userModal.value

    const newRol = reactive({
      nombre: "",      
    })
    onMounted(buscar_roles)
    return { roles, userModal, buscar_roles, abrir_modal_new_rol, newRol }
  }, 
};
</script>
<style scoped>
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
