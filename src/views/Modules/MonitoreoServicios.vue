<template>
  <Navbar/>
  <div class="container mx-auto px-0">
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
import Service from '@/servicios/Token-Services.js'
//import jwt_decode from "jwt-decode";
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
        buscar_status()
      }
      else{
        mexIra.value = !mexIra.value
        mexAca.value = false
        delegacionSelect.value = 2
        statusServices.value = []
        buscar_status()
      }      
    }
    const buscar_status = async () => {
      modalLoading.value = true
      var decoded = Service.obtenerInfoUser()//jwt_decode(Service.getCookie("Token"));      
      await axios.get(`${API}/PlazaAsignada/DelUsuario/${decoded.UsuarioId}`)
        .then((response) => {                 
          if(response.data.status == 'Ok'){
            let plazasUser = response.data.body.filter(item => item.tramoAsignadoId == delegacionSelect.value)             
            axios.get(`${API}/PlazaAsignada/PorTramoConnection/${delegacionSelect.value}`)
            .then((responsetramoconnect) => {
              //for iterar plazas
              let contadorBug = 0
              plazasUser.forEach(async (plaza) => {
                contadorBug++                            
                let isConnected = responsetramoconnect.data.body.find(item => item.plazaAsignadaId == plaza.plazaAsignadaId).connected
                if(isConnected){
                  await axios.get(`${API}/Transacciones/LastTransaction/${plaza.plazaAsignadaId}`)
                    .then((response) => {         
                      if(response.data.status == 'Ok'){
                        statusServices.value.push(response.data.body[0])                  
                      }                    
                    })
                }
                if(contadorBug == plazasUser.length){
                  modalLoading.value = false
                  isLoading.value = false         
                }
              })
            })
                
          }
        })
        .catch((error) => {
          console.log(error)
        })                                   
    }
    onMounted(() => {
      buscar_status()
    })
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
