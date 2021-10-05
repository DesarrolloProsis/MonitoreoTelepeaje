<template>
  <div class="responsive-table">          
    <table class="tftable" style="height:350px;">
      <tr>
        <th>Nombre de Usuario</th>
        <th>Nombre</th>
        <th>Rol</th>
        <th>Plazas</th>
        <th>Acciones</th>
      </tr>
      <tr v-for="(usuario, index) in dataUsuarios" :key="index">
        <td :class="{'text-gray-300': !usuario.estatus}">username</td>
        <td :class="{'text-gray-300': !usuario.estatus}">{{ usuario.nombre + ' ' + usuario.apellido }}</td>
        <td :class="{'text-gray-300': !usuario.estatus}">{{ usuario.rol }}</td>
        <td :class="{'text-gray-300': !usuario.estatus}">Plazas</td>
        <!-- <td>
          <button
            class="button btn-actualizar"
            @click="actualizarPass(usuario, index)"
          >
            Actualizar
          </button>
        </td> -->
<!--         <td v-if="usuario.estatus == true">
          <button class="button btn-activo" @click="changeStatus(usuario)">Activo</button>
        </td>
        <td v-else-if="usuario.estatus == false">
          <button class="button btn-inactivo" @click="changeStatus(usuario)">Inactivo</button>
        </td> -->  
        <td>
          <div>
            <Multiselect v-model="value" placeholder="Sleccione una Acción" @close="acciones_mapper(usuario)" label="name" trackBy="name" :options="opticones_select_acciones(usuario,index)" :searchable="true">
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
        </td>
      </tr>
    </table>
  </div>
  <!--MODAL DE ACTUALIZAR CONTRASEÑA -->
  <div v-if="showModal == true">
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-900 opacity-10"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div
          class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
            <h2 class="text-lg leading-6 font-bold text-gray-900" id="modal-headline">Actualizar Contraseña</h2>
          </div>
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <p style="color:red">{{errorMensaje}}</p>
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0  sm:text-left">
                <h2>Usuario: {{ seleccionado.nombre }}</h2>
                <h2>Escribe una contraseña nueva:</h2>
                <input id="newpass" class="input-pass mt-2" type="password" />
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="mt-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="cambiarPass()"
            >
              Actualizar
            </button>
            <button
              type="button"
              class="mt-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="hideModal()"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- FIN MODAL-->
  <!-- MODAL AGREGAR PLAZAS -->
  <div class="sticky inset-0 " :class="{'modal-container': modalPlazas}">
    <div v-if="modalPlazas" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69  mx-auto px-12 py-10 shadow-2xl mt-60">
      <p class="text-gray-900 font-bold text-2xl -mt-8 mb-8 text-center">Agregar Plazas a {{ seleccionado.nombre + ' ' + seleccionado.apellido }}</p>
      <div class="grid grid-cols-2 mt-2">
        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Tramo </p>
        <p>
        <select v-model="tramoSeleccionado" @change="plazasfil()" class="w-full border-b-2 rounded-lg">
          <option disabled value>Selecionar...</option>     
          <option value="1">México Acapulco</option>     
          <option value="2">México Irapuato</option>
        </select>
        <span v-if="validacion" class="text-xs text-red-600">Este dato es Obligatorio</span>
        </p>
        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Plazas </p>
        <p>
          <label class="border-b-2 rounded-md" :class="{'border-red-400':validacion}">
            <Multiselect v-model="plazasAsignar" mode="multiple" placeholder="Seleccione las Plazas" :searchable="true" :options="plazas" :close-on-select="false"/>
          </label>
          <span v-if="validacion" class="text-xs text-red-600">Este dato es Obligatorio</span>
        </p> 
        
      </div>
      <div class="mt-5 text-center ml-6">
        <button @click="agregarPlaza" class="botonIconBuscar">Agregar</button>
        <button @click="modalPlazas = false, tramoSeleccionado = '', validacion = false" class="botonIconCancelar">Cancelar</button>
      </div>
    </div>
  </div>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import Multiselect from '@vueform/multiselect'
import axios from "axios";


export default {
name: "TablaListaUsuarios",
  props: ["dataUsuarios"],
  components:{
    Multiselect,
  },
  data() {
    return {
      showModal: false,
      modalNuevoUsuario:false,
      seleccionado: {},
      genPass: "",
      errorMensaje:'',
      value: null,
      modalPlazas:false,
      listaPlazas:[],
      plazas:[{ value: '', label: '' }],
      tramoSeleccionado:'',
      plazasAsignar:[],
      validacion: false
    };
  },
  methods: {
    actualizarPass: function (usuario) {
      this.seleccionado = usuario;
      this.showModal = true;
    },
    hideModal: function () {
      this.showModal = false;
      this.genPass="";
      this.errorMensaje = "";
    },
    cambiarPass: function () {
      this.genPass = document.getElementById("newpass").value;
      if (this.genPass != "") {
        console.log("genpass:" + this.genPass)
        // HACER PETICION DE API PARA CAMBIAR CONTRASEÑA Y cuando termine vaciar genPass
        this.showModal = false;
        this.errorMensaje = '';
        this.genPass = ''
        console.log("genpass:" + this.genPass)
      }else{
        console.log("genpass:" + this.genPass)
        this.errorMensaje = "Error. Escribe una contraseña válida"
      }
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
    },
    agregarPlaza: function (){
      if(this.tramoSeleccionado != '' && this.plazasAsignar != ''){
        console.log(this.plazasAsignar);
        for(let i=0; i< this.plazasAsignar.length;i++){
          let nueva = this.plazasAsignar[i]
          let data = {
            usuarioId: 2014,
            plazaAsignadaId: nueva
          }
          axios.post(`${API}/PlazaAsignada`,data) 
          this.modalPlazas = false
          this.tramoSeleccionado = ''

        }
      }else{
        console.log('No Agregar');
        this.validacion= true
      }
    },
     //! Activar o desactivar
    changeStatus: function (usuario) {
      this.seleccionado = usuario;
      this.seleccionado.estatus = !this.seleccionado.estatus;
    },
    acciones_mapper(usuario){
      if(this.value == 'Habilitar'){
        this.changeStatus(usuario)
      }if(this.value == 'Deshabilitar'){
        this.changeStatus(usuario)
      }if(this.value == 'Agregar Plazas'){
        console.log('Agregar Plazas');
      }if(this.value == 'Quitar Plazas'){
        console.log('Quitar Plazas');
      }if(this.value == 'Cambiar Contraseña'){
        this.seleccionado = usuario;
        this.showModal = true;
      }if(this.value == 'Agregar Plazas'){
        this.seleccionado = usuario;
        console.log(this.seleccionado);
        this.modalPlazas = true;
      }
      
      this.value = ""
    },
    opticones_select_acciones(usuario){
      let options= [
          {  value: 'Habilitar', name: 'Habilitar'},//0
          {  value: 'Deshabilitar', name: 'Deshabilitar'},//1
          {  value: 'Cambiar Contraseña', name: 'Cambiar Contraseña'},//2
          {  value: 'Agregar Plazas', name: 'Agregar Plazas'},//3
      ]
      let filtroOpciones = []
          if(usuario.estatus == false)
            filtroOpciones.push(options[0])
          if(usuario.estatus ==  true){
            filtroOpciones.push(options[1])
            filtroOpciones.push(options[3])
            filtroOpciones.push(options[2])
          }
          
                    
      return filtroOpciones  
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
.input-pass {
  width: 100%;
  font-size: 20px;
  border: 1px solid black;
  padding: 5px;
}
.button {
  padding: 5px 10px;
  border-radius: 10px;
  min-width: 100px;
}
.button:focus {
  outline: 0;
}
.btn-actualizar {
  background-color: #55f768;
  color: #00be0f;
}

.btn-activo {
  background-color: #614dff;
  color: #000071;
}
.btn-inactivo {
  background-color: #ff3131;
  color: #6f0404;
}
.responsive-table {
  padding-top: 20px;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 500px;
}
.tftable {
  font-size: 12px;
  color: #333333;
  width: 100%;
}
.tftable th {
  font-size: 14px;
  background-color: #2c5282;
  border-width: 5px;
  padding: 8px;
  border-style: solid;
  border-color: white;
  text-align: left;
  color: white;
  font-weight: 500;
  text-align: center;
  margin: 3px;
  border-radius: 15px;
}

.tftable td {
  font-size: 14px;
  border-bottom-width: 2px;
  border-left-width: 5px;
  border-right-width: 5px;
  border-top-width: 2px;
  padding: 8px;
  border-style: solid;
  border-bottom-color: #a1a1a1;
  border-left-color: white;
  border-right-color: white;

  text-align: center;
}
</style>