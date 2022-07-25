<template>
  <Navbar/>
  <div class="h-screen md:h-full md:mb-0 mb-9">
    <h1 class="title-center font-titulo font-bold pb-1">Monitoreo de Carriles</h1>        
    <TablaCarriles></TablaCarriles>
  </div>
  <Footer/>
</template>
<script>
import Navbar from "../../components/Navbar.vue";
import TablaCarriles from "../../components/Tabla-carriles.vue";
import Footer from "../../components/Footer-login";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr"
import { MonitoreoAntenasStore  } from '../../store/MonitoreoAntenas'
import { reactive } from 'vue';

export default {
  components: {
    Navbar,
    TablaCarriles,
    Footer,
  },
  setup(){  
    let connectionSocket = reactive ({})
    const monitoreoAntenasStore = MonitoreoAntenasStore()

    async function conectar_socket(){
      try{         
        connectionSocket = await new HubConnectionBuilder()
          .withUrl("https://10.1.1.125:443/MonitoreoAntenas/BackStatusAntena",{
          //.withUrl("https://localhost:44301/MonitoreoAntenas/BackStatusAntena",{
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        }).build()

        connectionSocket.start().then(() => {                         
          connectionSocket.on('backSend', (data) => {
              console.log('data whit socket')
              monitoreoAntenasStore.addEventAntenaConcurrent(data)
          })
        })    
      }
      catch(ex) { console.log("try code" + ex) }
    }
    conectar_socket()
    return {  }    
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
