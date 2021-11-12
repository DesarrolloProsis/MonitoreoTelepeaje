<template>
  <Navbar/>
  <div class="container mx-auto px-0 resp-cont">
    <h1 class="title">Monitoreo de Servicios</h1>
    <button @click="cambiar_delegacion(2)" class="btn-listas" :style="{ 'background-color': mexAca ? 'gray' : '#fcb32a' }">
      Mex-Ira
    </button>
    <button @click="cambiar_delegacion(1)" class="btn-listas" :style="{ 'background-color': mexIra ? 'gray' : '#fcb32a' }">
      Mex-Aca
    </button>
    <Tabla v-if="isLoading == false" :dataListas="statusServices"/>
    <div class="loading" v-else>Cargando Datos...</div>
  </div>
  <!-- MODAL CARGANDO -->
  <Spinner :modalLoading="modalLoading"/>
  <Footer/>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import Spinner from '../../components/Spn.vue'
import Navbar from "../../components/Navbar";
import Tabla from "../../components/Tabla-monitoreo";
import Footer from "../../components/Footer-login";
import Service from '../../Servicios/Token-Services'
import jwt_decode from "jwt-decode";
import axios from "axios";
import { onMounted, ref } from 'vue'
export default {
  components: {
    Navbar,
    Tabla,
    Footer,
    Spinner
  },
  setup(){
    const statusServices = ref([])
    const mexIra = ref(true)
    const mexAca = ref(false)
    const delegacionSelect = ref(2)
    const isLoading = ref(true)
    const modalLoading = ref (true)
    const cambiar_delegacion = (id) => {
      if(id == 1){
        mexAca.value = !mexAca.value
        mexIra.value = false
        delegacionSelect.value = 1
        statusServices.value = []
        buscar_status_services()
      }
      else{
        mexIra.value = !mexIra.value
        mexAca.value = false
        delegacionSelect.value = 2
        statusServices.value = []
        buscar_status_services()
      }      
    }
    const buscar_status_services = () => {
      modalLoading.value = true
      var decoded = jwt_decode(Service.getCookie("Token"));
      //console.log(decoded.UsuarioId)
      axios.get(`${API}/PlazaAsignada/DelUsuario/${decoded.UsuarioId}`)
        .then((response) => {          
          //console.log(response)
          if(response.data.status == 'Ok'){
            let plazasUser = response.data.body.filter(item => item.tramoAsignadoId == delegacionSelect.value) 
            //console.log(plazasUser)
            //for iterar plazas
            plazasUser.forEach(plaza => {
              axios.get(`${API}/Transacciones/LastTransaction/${plaza.plazaAsignadaId}`)
                .then((response) => {                
                  if(response.data.status == 'Ok'){
                    statusServices.value.push(response.data.body[0])
                  }
                })
            })
            modalLoading.value = false
            isLoading.value = false  
            console.log(statusServices.value)          
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    const buscar_status = () => {
      modalLoading.value = true
      var decoded = jwt_decode(Service.getCookie("Token"));
      console.log(decoded.UsuarioId)
      axios.get(`${API}/PlazaAsignada/DelUsuario/${decoded.UsuarioId}`)
        .then((response) => {          
          console.log(response)
          if(response.data.status == 'Ok'){
            let plazasUser = response.data.body.filter(item => item.tramoAsignadoId == delegacionSelect.value) 
            console.log(plazasUser)
            //for iterar plazas
            plazasUser.forEach(plaza => {
              axios.get(`${API}/Transacciones/LastTransaction/${plaza.plazaAsignadaId}`)
                .then((response) => {                
                  if(response.data.status == 'Ok'){
                    statusServices.value.push(response.data.body[0])
                  }
                })
            })
            modalLoading.value = false
            isLoading.value = false  
            console.log(statusServices.value)          
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    onMounted(buscar_status)
    return { statusServices, mexAca, mexIra, isLoading, cambiar_delegacion, modalLoading }

  },  
};
</script>
<style scoped>

.title {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
}
.btn-listas {
  padding: 5px 10px;
  border-left: 5px solid white;
  color: white;
}
.btn-listas:focus {
  outline: 0;
}
@media(max-width:750px){
  .title {
  font-size: 20px;
  padding-bottom: 20px;
}
}
.loading {
  text-align: center;
  padding: 20px;
  font-size: 17px;
  font-weight: bold;
  animation-name: example;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
</style>
