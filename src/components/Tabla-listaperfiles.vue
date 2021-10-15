<template>
  <div class="responsive-table">
    <table class="tftable" style="height:350px;">
      <tr>
        <th>Perfil</th>             
        <th>Estatus</th>
        <th>Modulos</th>   
      </tr>
      <tr v-for="(perfiles, index) in dataPerfiles" :key="index">
        <td>{{ perfiles.nombreRol }}</td>  
        <td v-if="perfiles.activo == true || perfiles.activo == null">
          <button class="button btn-activo" @click="changeStatus(perfiles)">Activo</button>
        </td>
        <td v-else-if="perfiles.activo == false">
          <button class="button btn-inactivo" @click="changeStatus(perfiles)">Inactivo</button>
        </td>
        <td>
          <button class="button btn-actualizar" @click="showModulos(perfiles)">Actualizar</button>
        </td>   
      </tr>
    </table>
  </div>
  <br />

  <!--Modal Actualizar-->
  <div v-if="isModulosActive == true">
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-900 opacity-10"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
            <h2 class="text-lg leading-6 font-bold text-gray-900" id="modal-headline">Actualizar Módulos {{ perfilSelected.perfil }}</h2>
          </div>
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div>                  
                  <p v-for="(modulos, index) in perfilSelected.modulos" :key="index">
                    {{ modulos.nombre }}:
                    <button v-if="modulos.seleccionado == true" @click="cambiarModulos(index, modulos.seleccionado)" class="btn btn-active">Activo</button>
                    <button v-if="modulos.seleccionado == false" @click="cambiarModulos(index, modulos.seleccionado)" class="btn btn-inactive">Inactivo</button>
                  </p>                                                                        
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="hideModulos()" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" type="button">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>  
  {{perfilSelected}}
</template>

<script>
import axios from 'axios';
import { notify } from "@kyvg/vue3-notification";
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
  name: "TablaListaPerfiles",

  props: ["dataPerfiles"],
  data() {
    return {
      // todos los perfiles
      perfilesData: this.dataPerfiles,
      isModulosActive: false,        
      //perfil individual
      perfilSelected: {},

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
      console.log(this.perfilSelected)
      axios.post(`${API}/CatalogoRoles/Editar`, this.perfilSelected)
        .then((response) => {
          console.log(response)
          if(response.data.status == 'Ok'){
            notify({ type: 'success', title:'Rol actualizado', text: `Se actualizo correctamente el rol ${this.perfilSelected.nombreRol}`});
            this.perfilSelected = {}
            this.$emit('buscar-roles')
          }          
        })
        .catch((error) => {
          console.log(error)
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
          console.log(response)                
          if(response.data.status == 'Ok'){
            notify({ type: 'success', title:'Rol actualizado', text: `Se actualizo correctamente el rol ${this.perfilSelected.nombreRol}`});
            this.perfilSelected = {}
            this.$emit('buscar-roles')
          }  
        })
        .catch((error) => {
          console.log(error)
          notify({ type: 'warning', title:'Rol no actualizado', text: `No se pudo actualizar el rol ${this.perfilSelected.nombreRol}`});
          this.perfilSelected = {}
        })
       
    }
  },
};
</script>
<style scoped>
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
