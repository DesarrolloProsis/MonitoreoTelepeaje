<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-0 resp-cont">
    <h1 class="title">Monitoreo de Servicios de Con Proveedor de Telepeaje</h1>
    <button @click="btn1()" class="btn-listas" :style="{ 'background-color': isActive1 ? '#fcb32a' : 'gray' }">
      Mex-Ira
    </button>
    <button @click="btn2()" class="btn-listas" :style="{ 'background-color': isActive2 ? '#fcb32a' : 'gray' }">
      Mex-Aca
    </button>
    <Tabla v-if="isLoading == false" :dataListas="statusServices"></Tabla>
    <div class="loading" v-else>Cargando Datos...</div>
  </div>
  <Footer></Footer>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
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
    Footer
  },
  setup(){
    const statusServices = ref([])
    const mexIra = ref(true)
    const mexAca = ref(false)
    const delegacionSelect = ref(1)
    const isLoading = ref(true)

    const cambiar_delegacion = (id) => {
      if(id == 1){
        mexAca.value = !mexAca.value
        mexIra.value = false
        delegacionSelect.value = 1
      }
      else{
        mexIra.value = !mexIra.value
        mexAca.value = false
        delegacionSelect.value = 2
      }      
    }

    const buscar_status_services = () => {
      var decoded = jwt_decode(Service.getCookie("Token"));
      console.log(decoded)
      axios.get(`${API}/PlazaAsignada/DelUsuario/1`)
        .then((response) => {
          console.log(response)
          if(response.data.status == 'Ok'){
            let plazasUser = response.data.body.filter(item => item.plazaAsignadaId == delegacionSelect.value) 
            plazasUser.forEach(idplaza => {
              axios.get(`${API}/Transacciones/LastTransaction/${idplaza}`)
                .then((response) => {
                  if(response.data.status == 'Ok'){
                    statusServices.value.push(response.data.body)
                  }
                })
            })
            isLoading.value = true
            console.log(plazasUser)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    onMounted(buscar_status_services)
    return { statusServices, mexAca, mexIra, isLoading, cambiar_delegacion }

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
