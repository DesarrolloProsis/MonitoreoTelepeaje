<template>
  <div class="responsive-table">          
    <table class="tftable" style="height:350px;">
      <tr>
        <th>Nombre de Usuario</th>
        <th>Nombre</th>
        <th>Rol</th>
        <th >Plazas</th>
        <th class="w-56">Acciones</th>
      </tr>
      <tr v-for="(usuario, index) in dataUsuarios" :key="index">
        <td :class="{'text-gray-300': !usuario.estatus}">{{ usuario.usuario }}</td>
        <td :class="{'text-gray-300': !usuario.estatus}">{{ usuario.nombre + ' ' + usuario.apellido }}</td>
        <td :class="{'text-gray-300': !usuario.estatus}">{{ usuario.rol }}</td>
        <td :class="{'text-gray-300': !usuario.estatus}">{{ usuario.plazas }}</td>
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
  <div class="sticky inset-0 " :class="{'modal-container': modalPass}">
    <div v-if="modalPass" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69  mx-auto px-12 py-10 shadow-2xl mt-60">
      <p class="text-gray-900 font-bold text-xl -mt-8 mb-8 text-center">Cambiar Contraseña a {{ seleccionado.nombre + ' ' + seleccionado.apellido }}</p>
      <div class="grid grid-cols-2 mt-2">
        <p>Nueva Contraseña:</p>
        <input v-model="pass" class="border-b-2 rounded-lg" type="password" :class="{'border-red-600': validacion}">
        <span></span>
        <span v-if="validacion" class="text-xs text-red-600 text-center">Campo Obligatorio</span>
      </div>
      <div class="mt-5 text-center ml-6">
        <button @click="cambiarPass(seleccionado)" class="botonIconBuscar">Agregar</button>
        <button @click="modalPass = false, validacion=false" class="botonIconCancelar">Cancelar</button>
      </div>
    </div>
  </div>
  <!-- FIN MODAL-->
  <!-- MODAL AGREGAR PLAZAS -->
  <div class="sticky inset-0 " :class="{'modal-container': modalPlazas}">
    <div v-if="modalPlazas" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69  mx-auto px-12 py-10 shadow-2xl mt-60">
      <p class="text-gray-900 font-bold text-2xl -mt-8 mb-8 text-center">Agregar Plazas a {{ seleccionado.nombre + ' ' + seleccionado.apellido }}</p>
      <div class="grid grid-cols-2 mt-2">
        <p class="text-sm mb-1 font-semibold text-gray-700  sm:-ml-6">Plazas Ya Asignadas</p>
        <p>{{ seleccionado.plazas }}</p>
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
        <button @click="agregarPlaza(seleccionado)" class="botonIconBuscar">Agregar</button>
        <button @click="modalPlazas = false, tramoSeleccionado = '', validacion = false" class="botonIconCancelar">Cancelar</button>
      </div>
    </div>
  </div>
  <!-- FIN MODAL-->
  <!-- MODAL QUITAR PLAZAS -->
  <div class="sticky inset-0 " :class="{'modal-container': modalQuitar}">
    <div v-if="modalQuitar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69  mx-auto px-12 py-10 shadow-2xl mt-60">
      <p class="text-gray-900 font-bold text-2xl -mt-8 mb-8 text-center">Quitar Plazas a {{ seleccionado.nombre + ' ' + seleccionado.apellido }}</p>
      <div class="grid grid-cols-2 mt-2">
        <p class="text-sm mb-1 font-semibold text-gray-700  sm:-ml-6">Plazas Asignadas</p>
        <p>{{ seleccionado.plazas }}</p>
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
        <button @click="quitarPlazas(seleccionado)" class="botonIconBuscar">Agregar</button>
        <button @click="modalQuitar = false, tramoSeleccionado = '', validacion = false" class="botonIconCancelar">Cancelar</button>
      </div>
    </div>
  </div>
  <!-- FIN MODAL-->
  <!-- MODAL EDITAR USUARIO -->
  <div class="sticky inset-0 " :class="{'modal-container': modalEditar}">
    <div v-if="modalEditar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69  mx-auto px-12 py-10 shadow-2xl mt-60">
      <p class="text-gray-900 font-bold text-2xl -mt-8 mb-8 text-center">Editar Usuario</p>
      <div class="grid grid-cols-2 mt-2">
        <p class="text-sm mb-1 font-semibold text-gray-700  sm:-ml-6">Nombre</p>
        <input v-model="usuario.nombre" class="border rounded-lg" type="text">
        <p class="text-sm mb-1 font-semibold text-gray-700  sm:-ml-6">Apellidos</p>
        <input v-model="usuario.apellidos" class="border rounded-lg" type="text">
        <!--<p class="text-sm mb-1 font-semibold text-gray-700  sm:-ml-6">Rol</p>
        <Multiselect
          v-model="usuario.rol"
          placeholder="Seleccione un Rol"
          :searchable="true"
          :options="roles"
          :close-on-select="true"
        />-->
      </div>
      <div class="mt-5 text-center ml-6">
        <button @click="editarUsuario(usuario)" class="botonIconBuscar">Guardar</button>
        <button @click="modalEditar = false, tramoSeleccionado = '', validacion = false" class="botonIconCancelar">Cancelar</button>
      </div>
    </div>
  </div>
  <!-- FIN MODAL-->
  <!-- MODAL CAMBIAR ROL -->
  <div class="sticky inset-0 " :class="{'modal-container': modalRol}">
    <div v-if="modalRol" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69  mx-auto px-12 py-10 shadow-2xl mt-60">
      <p class="text-gray-900 font-bold text-2xl -mt-8 mb-8 text-center -mx-6">Cambiar Rol a {{ usuario.nombre +' '+ usuario.apellidos }}</p>
      <p class="text-gray-900 font-bold text-2xl -mt-8 mb-8 text-center">con Rol {{ usuario.rol }}</p>
      <div class="grid grid-cols-2 mt-2">      
        <p class="text-sm mb-1 font-semibold text-gray-700  text-center sm:-ml-6">Rol</p>
        <Multiselect
          v-model="seleccionado.rolId"
          placeholder="Seleccione un Rol"
          :searchable="true"
          :options="roles"
          :close-on-select="true"
        />
      </div>
      <div class="mt-5 text-center ml-6">
        <button @click="cambiarRol(usuario)" class="botonIconBuscar">Cambiar</button>
        <button @click="modalRol = false,usuario.rol = ' '" class="botonIconCancelar">Cancelar</button>
      </div>
    </div>
  </div>
  <!-- FIN MODAL-->
  <!-- MODAL CARGANDO -->
  <Spinner :modalLoading="modalLoading"/>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import Spinner from '../components/Spn.vue'
import jwt_decode from "jwt-decode";
import Multiselect from '@vueform/multiselect'
import Servicio from '../Servicios/Token-Services';
import axios from "axios";


export default {
name: "TablaListaUsuarios",
  props: {
    dataUsuarios:{
      type: Array,
      
    },
    plazaS:{
      type: Number,
      default: 0
    }
  },
  components:{
    Multiselect,Spinner
  },
  data() {
    return {
      
      modalNuevoUsuario:false,
      modalPlazas:false,
      modalQuitar:false,
      modalEditar:false,
      modalPass:false,
      modalRol:false,
      modalLoading: false,
      seleccionado: {},
      value: null,
      listaPlazas:[],
      plazas:[{ value: '', label: '' }],
      tramoSeleccionado:'',
      plazasAsignar:[],
      validacion: false,
      usuario:{
        idUsuario:'',
        nombre: '',
        apellidos:'',
        rol:'',
        rolId: '',
      },
      roles: [],
      pass:'',
      status:'',
      plazaSelect:0,
    };
  },
/*   async beforeMount(){
    let rol = await axios.get(`${API}/CatalogoRoles/null/null`)
    let rol_Filtrado = rol.data.body
    let proxy = new Proxy(rol_Filtrado,{
        get : function(target, property){
          return property === 'length' ?
            target.length :
            target[property];
        }
      });
    for(let i= 0; i<proxy.length; i++){
      this.roles.push({'value':proxy[i].rolId, 'label':proxy[i].nombreRol}) 
    }
  }, */
  methods: {
    cambiarPass: function (usuario) {
      if(this.pass != ''){
        if(Servicio.getCookie("Token")){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + Servicio.getCookie("Token")
          }
        }
        console.log(config);
        const data = {
          "UsuarioId": usuario.id,
          "Password": this.pass,
        } 
        axios.patch(`${API}/Usuario`,data,config)
          .then((result)=>{
              console.log(result)
              if(result.statusText == 'OK'){
                this.errorMessage = ""
                this.modalPass = false
                this.$notify({
                  title:'Plazas Asignadas',
                  text:`Se Cambio la Contraseña al Usuario ${usuario.nombre + ' ' + usuario.apellido}`,
                  type: 'success'
                });
              }else{
                this.$notify({
                  title:'Plazas Asignadas',
                  text:`No Se Pudo Cambio la Contraseña al Usuario ${usuario.nombre + ' ' + usuario.apellido}`,
                  type: 'success'
                });
              }
          })
          .catch(() =>{
            this.errorMessage = "Hubo un error al crear el usuario, intentalo nuevamente."
          })
        }
      }else{
        this.$notify({
          title:'Falta llenar campos obligatorios',
          text:'Todos los campos son obligatorios',
          type: 'error'
        });
        this.validacion = true
      }
    },
    plazasfil: async function (){
      let porTramo = await axios.get(`${API}/PlazaAsignada/PorTramo/${this.tramoSeleccionado}`)
      this.listaPlazas = porTramo.data.body
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
    agregarPlaza: function (usuario){
      if(this.tramoSeleccionado != '' && this.plazasAsignar != ''){
        for(let i=0; i< this.plazasAsignar.length;i++){
          let nueva = this.plazasAsignar[i]
          this.pla = nueva
          let data = {
            usuarioId: usuario.id,
            plazaAsignadaId: nueva
          }
          axios.post(`${API}/PlazaAsignada`,data)
          .then((response)=>{
            console.log(response);
            this.modalPlazas = false
            this.modalLoading = true
            this.tramoSeleccionado = ''
            this.status = response.statusText
            if(response.statusText == 'Ok'){
              setTimeout(() => {
                this.$router.push("/configuracion");
                this.modalLoading = false
              }, 1000);
            }else{
              setTimeout(() => {
                this.$router.push("/configuracion");
                this.modalLoading = false
              }, 1000);
            }
          })
        }
        if(this.status == 'Ok'){
          setTimeout(()=>{
            this.$notify({
              title:'Plazas Asignadas',
              text:`Se Asignaron las plazas al Usuario ${usuario.nombre + ' ' + usuario.apellido}`,
              type: 'success'
            });
          },1000)
        }else{
          setTimeout(()=>{
            this.$notify({
              title:'Plazas Asignadas',
              text:`No Se Asignaron las Plazas al Usuario ${usuario.nombre + ' ' + usuario.apellido}`,
              type: 'success'
            });
          },1000)
        }
      }else{
        this.$notify({
          title:'Falta llenar campos',
          text:'Todos los campos son obligatorios',
          type: 'error'
        });
        this.validacion= true
      }
    },
    quitarPlazas: function (usuario){
      console.log(usuario);
      for(let i=0; i< this.plazasAsignar.length;i++){
          let quitar = this.plazasAsignar[i]
          let usuarioId = usuario.id
          axios.post(`${API}/PlazaAsignada/QuitarDeUsuario/${usuarioId}/${quitar}`)
          .then((response)=>{
            this.modalPlazas = false
            this.modalLoading = true
            this.tramoSeleccionado = ''
            if(response.data.status == 'Error'){
              /* Insertar notificacion */
              this.modalPlazas = false
              this.modalLoading = false
              this.$router.push("/configuracion");
            }else{
              setTimeout(() => {
                this.modalPlazas = false
                this.modalLoading = false
                this.$router.push("/configuracion");
              }, 1000);
            }
          })
        }
      setTimeout(()=>{
        this.$notify({
        title:'Plazas Eliminadas',
        text:`Se Quitaron las Plazas al Usuario ${usuario.nombre + ' ' + usuario.apellido}`,
        type: 'success'
        });
      },1000)
    },
    editarUsuario: function (usuario){
      this.seleccionado = usuario;
      if(Servicio.getCookie("Token")){
      let config = {
          headers: {
            'Authorization': 'Bearer ' + Servicio.getCookie("Token")
          }
        }
        const data = {
          "UsuarioId": this.seleccionado.idUsuario,
          "Nombre": this.seleccionado.nombre,
          "ApellidoPaterno": this.seleccionado.apellidos,
          "Estatus": true,
        }
        this.modalLoading = true
        this.modalEditar = true
        axios.patch(`${API}/Usuario`,data,config)
          .then(()=>{
                setTimeout(() => {
                this.$router.push("/configuracion");
                this.modalLoading = false
              }, 1000);
              this.errorMessage = ""
          })
          .catch(() =>{
            this.errorMessage = "Hubo un error al crear el usuario, intentalo nuevamente."
          })
      }
    },
    changeStatus: function (usuario) {
      this.seleccionado = usuario;
      if(Servicio.getCookie("Token")){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + Servicio.getCookie("Token")
          }
        }
        console.log(config);
        const data = {
          "UsuarioId": this.seleccionado.id,
          "Estatus": this.seleccionado.estatus = !this.seleccionado.estatus,
        } 
        console.log(data);
        axios.patch(`${API}/Usuario`,data,config)
          .then((result)=>{
              console.log(result)
              this.errorMessage = ""
          })
          .catch(() =>{
            this.errorMessage = "Hubo un error al crear el usuario, intentalo nuevamente."
          })
      }
    },
    cambiarRol: function (usuario){
      if(Servicio.getCookie("Token")){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + Servicio.getCookie("Token")
          }
        }
        const data = {
          "UsuarioId": usuario.idUsuario,
          "idrol": this.seleccionado.rolId,
          "Estatus": true,
        } 
        if(this.seleccionado.rol != ''){
        this.modalRol = false
        this.modalLoading = true
        axios.patch(`${API}/Usuario`,data,config)
          .then(()=>{
            this.$notify({
                  title:'Nuevo Usuario',
                  text:`Se creo correctamente el Rol de ${usuario.nombre}`,
                  duration: 2000,
                  type: 'success'
                });
              setTimeout(() => {
                this.$router.push("/configuracion");
                this.modalLoading = false
              }, 1000);
              this.errorMessage = ""
          })
          .catch(() =>{
            this.errorMessage = "Hubo un error al crear el usuario, intentalo nuevamente."
          })
        }
      }
    },
    modal_Rol: async function(){
      let plaza = this.plazaS
      this.modalRol = true
      let rol = await axios.get(`${API}/CatalogoRoles/null/null/${plaza}`)
      let rol_Filtrado = rol.data.body
      let proxy = new Proxy(rol_Filtrado,{
          get : function(target, property){
            return property === 'length' ?
              target.length :
              target[property];
          }
        });
      for(let i= 0; i<proxy.length; i++){
        this.roles.push({'value':proxy[i].rolId, 'label':proxy[i].nombreRol}) 
      }
    },
    acciones_mapper(usuario){
      if(this.value == 'Habilitar'){
        this.changeStatus(usuario)
      }if(this.value == 'Deshabilitar'){
        this.changeStatus(usuario)
      }if(this.value == 'Agregar Plazas'){
        console.log('Agregar Plazas');
      }if(this.value == 'Cambiar Contraseña'){
        this.seleccionado = usuario;
        this.modalPass = true;
      }if(this.value == 'Agregar Plazas'){
        this.seleccionado = usuario;
        console.log(this.seleccionado);
        this.modalPlazas = true;
      }if(this.value == 'Quitar Plazas'){
        this.seleccionado = usuario
        this.modalQuitar = true;
      }if(this.value == 'Editar Usuario'){
        this.usuario.idUsuario = usuario.id
        this.usuario.nombre = usuario.nombre
        this.usuario.apellidos = usuario.apellido
        this.modalEditar = true;
      }if(this.value == 'Cambiar Rol'){
        this.modal_Rol()
        this.usuario.idUsuario = usuario.id
        this.usuario.nombre = usuario.nombre
        this.usuario.apellidos = usuario.apellido
        this.usuario.rol = usuario.rol
        this.usuario.rolId = usuario.rolId
      }
      this.value = ""
    },
    opticones_select_acciones(usuario){
      Servicio.getCookie("Token")
      let info = jwt_decode(Servicio.getCookie("Token"))
      let options= [
          {  value: 'Habilitar', name: 'Habilitar'},//0
          {  value: 'Deshabilitar', name: 'Deshabilitar'},//1
          {  value: 'Cambiar Contraseña', name: 'Cambiar Contraseña'},//2
          {  value: 'Agregar Plazas', name: 'Agregar Plazas'},//3
          {  value: 'Quitar Plazas', name: 'Quitar Plazas'},//4
          {  value: 'Editar Usuario', name: 'Editar Usuario'},//5
          {  value: 'Cambiar Rol', name: 'Cambiar Rol'},//6
      ]
      let filtroOpciones = []
          if(usuario.estatus == false)
            filtroOpciones.push(options[0])
          if(usuario.estatus ==  true){
            filtroOpciones.push(options[5])
            filtroOpciones.push(options[6])
            if(usuario.id != info.UsuarioId){
              filtroOpciones.push(options[1])
            }
            filtroOpciones.push(options[3])
            if(usuario.plazas != 'S/A')
              filtroOpciones.push(options[4])
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