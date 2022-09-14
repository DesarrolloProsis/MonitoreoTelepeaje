<template>
  <Navbar/>
  <div class="h-screen md:h-full md:mb-0 mb-9">
    <h1 class="title-center font-titulo font-bold pb-1">Monitoreo de Carriles</h1>        
    <TablaCarriles></TablaCarriles>
    <div v-if="modalShow">
      <ModalCarriles @cerrar-modal="cerrar_modal" :carril="carril" :modalOpen="modalShow" :antenas="antenas" :tipoalarma="tipoalarma"></ModalCarriles>
    </div>
  </div>
  <Footer/>
</template>
<script>
import Navbar from "../../components/Navbar.vue";
import TablaCarriles from "../../components/Tabla-carriles.vue";
import Footer from "../../components/Footer-login";
import ModalCarriles from "../../components/Modal-carriles";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr"
import { MonitoreoAntenasStore  } from '../../store/MonitoreoAntenas'
import { reactive, ref } from 'vue';

export default {
  components: {
    Navbar,
    TablaCarriles,
    ModalCarriles,
    Footer,
  },
  setup(){  
      let connectionSocket = reactive ({})
      const modalShow = ref(false)
      const tipoalarma = ref('')
      const carril = ref('')
      const antenas = ref([])
      const monitoreoAntenasStore = MonitoreoAntenasStore()

    async function conectar_socket(){
      try{         
        connectionSocket = await new HubConnectionBuilder()
        .withUrl(`${'https://10.1.1.125:443'}/MonitoreoAntenas/BackStatusAntena`,{
          //.withUrl("https://10.1.1.125:443/MonitoreoAntenas/BackStatusAntena",{
          //.withUrl("https://localhost:44301/MonitoreoAntenas/BackStatusAntena",{
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        }).build()
        connectionSocket.stop()

        connectionSocket.start().then(() => {                         
          connectionSocket.on('backSend', (data) => {
              console.log('data whit socket')
              console.log(data)
              if(data.statusAntena == "ERROR_EN_ANTENA"){
                modalShow.value = true
                tipoalarma.value = 'ERROR'
                carril.value = data.ip
                antenas.value = data.antenas
              }else if(data.statusAntena == "WARNING_EN_ANTENA"){
                modalShow.value = true
                tipoalarma.value = 'ALERTA'
                carril.value = data.ip
                antenas.value = data.antenas
              }

              monitoreoAntenasStore.addEventAntenaConcurrent(data)
          })
        })    
      }
      catch(ex) { console.log("try code" + ex) }
    }
    conectar_socket()
    function cerrar_modal(){   
      modalShow.value = false
      tipoalarma.value = ''
      carril.value = ''
      antenas.value = []
    }
    return { modalShow,tipoalarma,carril,antenas,cerrar_modal }    
  }
};
</script>
<style scoped>
.title-center {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
}
</style>
