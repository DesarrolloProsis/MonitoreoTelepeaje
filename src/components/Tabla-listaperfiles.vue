<template>
  <div class="responsive-table">
    <table class="tftable">
      <tr class="">
        <th>Perfil</th>             
        <!-- <th>Estatus</th>
        <th>Modulos</th>  -->  
        <th>Acciones</th>
      </tr>
      <tr v-for="(perfiles, index) in dataPerfiles" :key="index">
        <td :class="{'text-gray-300': perfiles.activo == false}">{{ perfiles.nombreRol }}</td>
        <td class="w-66">
          <div class="w-66 mx-auto">
            <Multiselect v-model="value" placeholder="Sleccione una Acción" @close="acciones_mapper(perfiles)" label="name" trackBy="name" :options="opticones_select_acciones(perfiles,index)" :searchable="true">
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
  <br />
  <div class="sticky inset-0 " :class="{'modal-container': isModulosActive}">
    <div v-if="isModulosActive" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69  mx-auto px-12 py-10 shadow-2xl mt-60">
      <p class="text-gray-900 font-bold text-2xl -mt-8 mb-8 text-center">Actualizar Módulos {{ perfilSelected.perfil }}</p>
      <div class="grid grid-cols-2 mt-2" v-for="(modulos, index) in perfilSelected.modulos" :key="index">
        <p>{{ modulos.nombre }}</p>
        <p class="text-center">
          <button v-if="modulos.seleccionado == true" @click="cambiarModulos(index, modulos.seleccionado)" class="btn btn-active">Activo</button>
          <button v-if="modulos.seleccionado == false" @click="cambiarModulos(index, modulos.seleccionado)" class="btn btn-inactive">Inactivo</button>
        </p>
      </div>
      <div class="mt-5 text-center ml-6">
        <button @click="hideModulos()" class="botonIconBuscar">Guardar</button>
        <button @click="isModulosActive = false" class="botonIconCancelar">Cancelar</button>
      </div>
    </div>
  </div>  
</template>

<script>
import Servicio from '@/servicios/Token-Services.js';
import Multiselect from '@vueform/multiselect'
//import jwt_decode from "jwt-decode";
import axios from 'axios';
import { notify } from "@kyvg/vue3-notification";
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
  name: "TablaListaPerfiles",
  props: ["dataPerfiles"],
  components:{
    Multiselect,
  },
  data() {
    return {
      // todos los perfiles
      perfilesData: this.dataPerfiles,
      isModulosActive: false,        
      //perfil individual
      perfilSelected: {},
      value:'',

    };
  },

  methods: {
    // !MODULOS
    showModulos: function (perfil) {
      this.isModulosActive = true; let modulos = [];
      //Array auxiliar para modal de modulos
      const novalidProp = ['rolId', 'dateStamp', 'nombreRol', 'activo']    
      Object.entries(perfil).map(item => {                                
          if(!novalidProp.includes(item[0])){
            modulos.push({ nombre: item[0], seleccionado: item[1] }) 
          }
      })             
      this.perfilSelected = { ...perfil, modulos };      
    },
    hideModulos: function () {
      this.isModulosActive = false;
      //Eliminar array auxiliar modulos para update
      this.perfilSelected.modulos.forEach(item => {
        this.perfilSelected[item.nombre] = item.seleccionado
      });
      delete this.perfilSelected.modulos
      axios.post(`${API}/CatalogoRoles/Editar`, this.perfilSelected)
        .then((response) => {
          if(response.data.status == 'Ok'){
            notify({ type: 'success', title:'Rol actualizado', text: `Se actualizo correctamente el rol ${this.perfilSelected.nombreRol}`});
            this.perfilSelected = {}
            this.$emit('buscar-roles')
          }          
        })
        .catch(() => {
          notify({ type: 'warning', title:'Rol no actualizado', text: `No se pudo actualizar el rol ${this.perfilSelected.nombreRol}`});
          this.perfilSelected = {}
        })
      //AGREGAR CONSULTA API PARA ENVIAR DATOS ACTUALIZADOS YA SEA ENVIANDO TODOS LOS DATOS O SOLO PERFILSELECTED
    },
    cambiarModulos: function (index, estatus) {
      this.perfilSelected.modulos[index].seleccionado = !estatus;      
      this.perfilSelected[this.perfilSelected.modulos[index].nombre] = !estatus      
    },
    //! Activar o desactivar
    changeStatus: function (perfil) {
      //Esto es por referencia
      //this.perfilSelected = Object.assign(perfil)
      //Esto es por valor
      this.perfilSelected = { ...perfil }
      this.perfilSelected.activo = !perfil.activo
      axios.post(`${API}/CatalogoRoles/Editar`, this.perfilSelected)
        .then((response) =>{            
          if(response.data.status == 'Ok'){
            notify({ type: 'success', title:'Rol actualizado', text: `Se actualizo correctamente el rol ${this.perfilSelected.nombreRol}`});
            this.perfilSelected = {}
            this.$emit('buscar-roles')
          }  
        })
        .catch(() => {
          notify({ type: 'warning', title:'Rol no actualizado', text: `No se pudo actualizar el rol ${this.perfilSelected.nombreRol}`});
          this.perfilSelected = {}
        })
    },
    acciones_mapper(perfil){
      if(this.value == 'Habilitar'){
        this.changeStatus(perfil)
      }
      if(this.value == 'Deshabilitar'){
        this.changeStatus(perfil)
      }
      if(this.value == 'Editar Modulos'){
        this.showModulos(perfil)
      }
      this.value = ""
    },
    opticones_select_acciones(perfil){
      let options= [
          {  value: 'Habilitar', name: 'Habilitar'},//0
          {  value: 'Deshabilitar', name: 'Deshabilitar'},//1
          {  value: 'Editar Modulos', name: 'Editar Modulos'},//2
      ]
      //Servicio.getCookie("Token")
      //let info = jwt_decode(Servicio.getCookie("Token"))
      let info = Servicio.obtenerInfoUser()
      let filtroOpciones = []
          if(perfil.activo == false){
            filtroOpciones.push(options[0])    
          }if(perfil.activo == true){
            if(perfil.nombreRol != info.role){
              filtroOpciones.push(options[1])
            }
            filtroOpciones.push(options[2])
          }
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
.btn {
  padding: 5px;
  border-radius: 5px;
  margin-top: 10px;
}
.btn-active {
  background-color: green;
  color: white;
}
.btn-inactive {
  background-color: grey;
  color: white;
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
  background-color: #f7ac55;
  color: #6e0400;
}
.btn-seleccionar {
  background-color: #4dffea;
  color: #025c51;
}
.btn-activo {
  background-color: #00b158;
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
