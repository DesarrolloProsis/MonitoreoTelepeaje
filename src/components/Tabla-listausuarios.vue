<template>
  <div class="responsive-table">          
    <table class="tftable">
      <tr>
        <th>Nombre de Usuario</th>
        <th>Nombre</th>
        <th>Rol</th>
        <th >Plazas</th>
        <th class="w-56">Acciones</th>
      </tr>
      <tr v-for="(usuario, index) in dataUsuarios" :key="index">
        <td :class="{'text-gray-300': !usuario.estatus}">{{ usuario.usuario }}</td>
        <td :class="{'text-gray-300': !usuario.estatus}">{{ usuario.nombre + ' ' + usuario.apellidoP + ' ' + usuario.apellidoM}}</td>
        <td :class="{'text-gray-300': !usuario.estatus}">{{ usuario.rol }}</td>
        <td :class="{'text-gray-300': !usuario.estatus}">{{ usuario.plazas }}</td>
        <td>
          <div>
            <Multiselect v-model="val" placeholder="Sleccione una Acción" @close="acciones_mapper(usuario)" label="name" trackBy="name" :options="opticones_select_acciones(usuario)" :searchable="true">
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
        <button @click="quitarPlazas(seleccionado)" class="botonIconBuscar">Quitar</button>
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
        <p class="text-sm mb-1 font-semibold text-gray-700  sm:-ml-6">Apellido Parterno</p>
        <input v-model="usuario.apellidoP" class="border rounded-lg" type="text">
        <p class="text-sm mb-1 font-semibold text-gray-700  sm:-ml-6">Apellido Materno</p>
        <input v-model="usuario.apellidoM" class="border rounded-lg" type="text">
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
      <p class="text-gray-900 font-bold text-2xl -mt-8 mb-8 text-center -mx-6">Cambiar Rol a {{ usuario.nombre +' '+ usuario.apellidoP }}</p>
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
import Multiselect from '@vueform/multiselect'
import { ref } from 'vue'
import { notify } from "@kyvg/vue3-notification";
import Servicio from '@/servicios/Token-Services.js';
import axios from "axios";

export default {
  name: "TablaListaUsuarios",
  props: {
    dataUsuarios: Array,
    plazaBusqueda: Number
  },
  components:{ Multiselect, Spinner },
  emits: ["refrescarTabla"],
  setup( props, context) {
    const modalNuevoUsuario = ref(false)
    const modalPlazas = ref(false)
    const modalQuitar = ref(false)
    const modalEditar = ref(false)
    const modalPass = ref(false)
    const modalRol = ref(false)
    const modalLoading = ref(false)
    const seleccionado = ref({})
    const val = ref(null)
    const listaPlazas = ref([])
    const plazas = ref([{ value: '', label: '' }])
    const tramoSeleccionado = ref('')
    const plazasAsignar = ref([])
    const validacion = ref(false)
    const usuario = ref({ idUsuario:'', nombre: '', apellidoP:'', apellidoM:'', rol:'', rolId: '',  estatus: '' })
    const roles = ref([])
    const pass = ref('')
    const status = ref('')
    const plazaSelect = ref(0)
    const errorMessage = ref('')

    const modal_Rol = async () => {
      modalRol.value = true
      let rol = await axios.get(`${API}/CatalogoRoles/null/null/${props.plazaBusqueda}`)
      let rol_Filtrado = rol.data.body
      let proxy = new Proxy(rol_Filtrado,{
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
    const plazasfil = async () => {
      let porTramo = await axios.get(`${API}/PlazaAsignada/PorTramo/${tramoSeleccionado.value}`)
      listaPlazas.value = porTramo.data.body
      let proxy = new Proxy(listaPlazas.value,{
        get : function(target, property){
          return property === 'length' ?
            target.length :
            target[property];
        }
      });
      if(tramoSeleccionado.value == ''){
        for(let i= 0; i<proxy.length; i++){
          plazas.value.push({'value':proxy[i].plazaAsignadaId, 'label':proxy[i].nombre}) 
        }
      }else{
        plazas.value = []
        for(let i= 0; i<proxy.length; i++){
          plazas.value.push({'value':proxy[i].plazaAsignadaId, 'label':proxy[i].nombre}) 
        }
      }
    }
    function cambiarPass(usuario) {
      if(pass.value != ''){
        //if(Servicio.getCookie("Token")){
        if(Servicio.obtenerToken()){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + Servicio.obtenerToken()//Servicio.getCookie("Token")
          }
        }
        const data = {
          "nombre": usuario.nombre,
          "apellidoPaterno": usuario.apellidoP,
          "apellidoMaterno": usuario.apellidoM,
          "rolId": usuario.idrol,
          "pass": pass.value,
          "usuarioId": usuario.id,
          "estatusUsuario": usuario.estatus
        } 
        axios.post(`${API}/UsuarioMonitoreo/update/${props.plazaBusqueda}`,data,config)
          .then((result)=>{
              if(result.statusText == 'OK'){
                modalPass.value = false
                notify({
                  title:'Cambio de Contraseña',
                  text:`Se Cambio la Contraseña al Usuario ${usuario.nombre + ' ' + usuario.apellidoP}`,
                  type: 'success'
                });
              }else{
                notify({
                  title:'Cambio de Contraseña',
                  text:`No Se Pudo Cambio la Contraseña al Usuario ${usuario.nombre + ' ' + usuario.apellidoP}`,
                  type: 'warn'
                });
              }
          })
          .catch(() =>{
            errorMessage.value = "Hubo un error al crear el usuario, intentalo nuevamente."
          })
        }
      }else{
        notify({
          title:'Falta llenar campos obligatorios',
          text:'Todos los campos son obligatorios',
          type: 'error'
        });
        validacion.value = true
      }
    }
    function editarUsuario(usuario){
      if(Servicio.obtenerToken()){
      let config = {
          headers: {
            'Authorization': 'Bearer ' + Servicio.obtenerToken()//Servicio.getCookie("Token")
          }
        }
        const data = {
          "nombre": usuario.nombre,
          "apellidoPaterno": usuario.apellidoP,
          "apellidoMaterno": usuario.apellidoM,
          "rolId": usuario.rolId,
          "pass": null,
          "usuarioId": usuario.idUsuario,
          "estatusUsuario": usuario.estatus
        } 
        modalLoading.value = true
        modalEditar.value = true
        axios.post(`${API}/UsuarioMonitoreo/update/${props.plazaBusqueda}`,data,config)
          .then(()=>{
            modalEditar.value = false
                setTimeout(() => {
                context.emit('refrescarTabla', props.plazaBusqueda)
                notify({
                  title:'Cambio Exitoso',
                  text:`Se editó al usuario ${usuario.nombre + ' ' + usuario.apellidoP}`,
                  type: 'success'
                });
                modalLoading.value = false
              }, 1000);
              errorMessage.value = ""
          })
          .catch(() =>{
            errorMessage.value = "Hubo un error al crear el usuario, intentalo nuevamente."
          })
      }
    }
    function changeStatus(usuario) {
      seleccionado.value = usuario;
      if(Servicio.obtenerToken()){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + Servicio.obtenerToken()//Servicio.getCookie("Token")
          }
        }
        const data = {
          "nombre": usuario.nombre,
          "apellidoPaterno": usuario.apellidoP,
          "apellidoMaterno": usuario.apellidoM,
          "rolId": usuario.idrol,
          "pass": null,
          "usuarioId": usuario.id,
          "estatusUsuario": seleccionado.value.estatus = !seleccionado.value.estatus
        } 
        axios.post(`${API}/UsuarioMonitoreo/update/${props.plazaBusqueda}`,data,config)
        .then(()=>{
            errorMessage.value = ""
            notify({
              title:'Cambio Exitoso',
              text:`Se cambió el estatus al usuario ${usuario.nombre + ' ' + usuario.apellidoP}`,
              type: 'success'
            });
        })
        .catch(() =>{
          errorMessage.value = "Hubo un error al crear el usuario, intentalo nuevamente."
        })
      }
    }
    function cambiarRol(usuario){
      if(Servicio.obtenerToken()){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + Servicio.obtenerToken()
          }
        }
        const data = {
          "nombre": usuario.nombre,
          "apellidoPaterno": usuario.apellidoP,
          "apellidoMaterno": usuario.apellidoM,
          "rolId": seleccionado.value.rolId,
          "pass": null,
          "usuarioId": usuario.idUsuario,
          "estatusUsuario": usuario.estatus
        } 
        if(seleccionado.value.rol != ''){
          modalRol.value = false
          modalLoading.value = true
          axios.post(`${API}/UsuarioMonitoreo/update/${props.plazaBusqueda}`,data,config)
          .then(()=>{
              setTimeout(() => {
                notify({
                  title:'Nuevo Usuario',
                  text:`Se creo correctamente el Rol de ${usuario.nombre}`,
                  duration: 2000,
                  type: 'success'
                });
                //this.$router.push("/configuracion/lista-usuarios");
                modalLoading.value = false
                context.emit('refrescarTabla', props.plazaBusqueda)
              }, 1000);
              errorMessage.value = ""
          })
          .catch(() =>{
            errorMessage.value = "Hubo un error al crear el usuario, intentalo nuevamente."
          })
        }
      }
    }
    function agregarPlaza(usuario){
      if(tramoSeleccionado.value != '' && plazasAsignar.value != ''){
        for(let i=0; i< plazasAsignar.value.length;i++){
          let nueva = plazasAsignar.value[i]
          let data = {
            usuarioId: usuario.id,
            plazaAsignadaId: nueva
          }
          axios.post(`${API}/PlazaAsignada`,data)
          .then((response)=>{
            modalPlazas.value = false
            modalLoading.value = true
            tramoSeleccionado.value = ''
            if(response.data.status == 'Ok'){
              setTimeout(() => {
                context.emit('refrescarTabla', props.plazaBusqueda)
                modalLoading.value = false
                plazasAsignar.value = ''
                notify({
                  title:'Plazas Asignadas',
                  text:`Se Asignó las plazas al Usuario ${usuario.nombre + ' ' + usuario.apellidoP}`,
                  type: 'success'
                });
              }, 1000);
            }else{
              setTimeout(() => {
                context.emit('refrescarTabla', props.plazaBusqueda)
                modalLoading.value = false
                plazasAsignar.value = ''
                notify({
                  title:'Plazas Asignadas',
                  text:`No Se Asignó las Plazas al Usuario ${usuario.nombre + ' ' + usuario.apellidoP}`,
                  type: 'warn'
                });
              }, 1000);
            }
          })
        }
      }else{
        notify({
          title:'Falta llenar campos',
          text:'Todos los campos son obligatorios',
          type: 'error'
        });
        validacion.value = true
      }
    }
    function quitarPlazas(usuario){
      for(let i=0; i< plazasAsignar.value.length;i++){
        let quitar = plazasAsignar.value[i]
        let usuarioId = usuario.id
        axios.post(`${API}/PlazaAsignada/QuitarDeUsuario/${usuarioId}/${quitar}`)
        .then((response)=>{
          modalQuitar.value = false
          modalLoading.value = true
          tramoSeleccionado.value = ''
          status.value = response.data.estatus
          if(response.data.status == 'Error'){
            notify({
              title:'Plazas No Eliminadas',
              text:`No Se Quitaron las Plazas al Usuario ${usuario.nombre + ' ' + usuario.apellidoP}`,
              type: 'warn'
            });
            modalLoading.value = false
            plazasAsignar.value = []
            context.emit('refrescarTabla', props.plazaBusqueda)
          }else{
            setTimeout(() => {
              notify({
                title:'Plazaa Elminada',
                text:`Se Elimnó la Plaza Seleccionada del Usuario ${usuario.nombre + ' ' + usuario.apellidoP}`,
                type: 'success'
              });
              modalLoading.value = false
              plazasAsignar.value = []
              context.emit('refrescarTabla', props.plazaBusqueda)
            }, 1000);
          }
        })
      }
    }
    function btn(){
      console.log(props.plazaBusqueda);
    }
    
    function acciones_mapper(item){
      if(val.value == 'Habilitar'){
        changeStatus(item)
      }if(val.value == 'Deshabilitar'){
        changeStatus(item)
      }if(val.value == 'Cambiar Contraseña'){
        seleccionado.value = item;
        modalPass.value = true;
      }if(val.value == 'Agregar Plazas'){
        seleccionado.value = item;
        modalPlazas.value = true;
      }if(val.value == 'Quitar Plazas'){
        seleccionado.value = item
        modalQuitar.value = true;
      }if(val.value == 'Editar Usuario'){
        modalEditar.value = true
        usuario.value.idUsuario = item.id
        usuario.value.nombre = item.nombre
        usuario.value.apellidoP = item.apellidoP
        usuario.value.apellidoM = item.apellidoM
        usuario.value.rolId = item.idrol
        usuario.value.estatus = item.estatus
      }if(val.value == 'Cambiar Rol'){
        modal_Rol()
        usuario.value.idUsuario = item.id
        usuario.value.nombre = item.nombre
        usuario.value.apellidoP = item.apellidoP
        usuario.value.apellidoM = item.apellidoM
        usuario.value.rol = item.rol
        usuario.value.rolId = item.rolId
        usuario.value.estatus = item.estatus
      }
      val.value = ""
    }
    function opticones_select_acciones(item){
      let info = Servicio.obtenerInfoUser()
      let options = [
          {  value: 'Habilitar', name: 'Habilitar'},//0
          {  value: 'Deshabilitar', name: 'Deshabilitar'},//1
          {  value: 'Cambiar Contraseña', name: 'Cambiar Contraseña'},//2
          {  value: 'Agregar Plazas', name: 'Agregar Plazas'},//3
          {  value: 'Quitar Plazas', name: 'Quitar Plazas'},//4
          {  value: 'Editar Usuario', name: 'Editar Usuario'},//5
          {  value: 'Cambiar Rol', name: 'Cambiar Rol'},//6
      ]
      let filtroOpciones = []
          if(item.estatus == false)
            filtroOpciones.push(options[0])
          if(item.estatus ==  true){
            filtroOpciones.push(options[5])
            filtroOpciones.push(options[6])
            if(item.id != info.UsuarioId){
              filtroOpciones.push(options[1])
            }
            filtroOpciones.push(options[3])
            if(item.plazas != 'S/A')
              filtroOpciones.push(options[4])
            filtroOpciones.push(options[2])
          }
      return filtroOpciones  
    }
    return{ quitarPlazas, agregarPlaza, cambiarRol, changeStatus, editarUsuario, cambiarPass,plazasfil, modal_Rol, acciones_mapper, opticones_select_acciones, btn, modalNuevoUsuario, modalPlazas, modalQuitar, modalEditar, modalPass, modalRol, modalLoading, seleccionado, val, listaPlazas, plazas, tramoSeleccionado, plazasAsignar, validacion, usuario, roles, pass, status, plazaSelect, errorMessage }
  }
}
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