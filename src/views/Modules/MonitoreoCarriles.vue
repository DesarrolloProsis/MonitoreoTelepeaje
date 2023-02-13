<template>
  <Navbar/>
  <div class="h-screen md:h-full md:mb-0 mb-9">
    <h1 class="title-center font-titulo font-bold pb-1">Monitoreo de Carriles</h1>        
    <TablaCarriles @conectar-socket-plaza="conecta_o_desconecta_socket_plaza" @change-plaza-select="change_plaza_select"></TablaCarriles>
    <div v-if="modalShow">
      <ModalCarriles @cerrar-modal="cerrar_modal" :carril="carril" :antenaStateChange="antenaStateChange" :plaza="plaza" :modalOpen="modalShow" :antenas="antenas" :tipoalarma="tipoalarma"></ModalCarriles>
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
import { reactive, ref, onBeforeUnmount } from 'vue';
import axios from "axios";
const API = process.env.VUE_APP_URL_API_PRODUCCION

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
      const plaza = ref('')
      const idPlazaCurrent = ref('')
      const antenaStateChange = ref('')
      const antenas = ref([])
      const monitoreoAntenasStore = MonitoreoAntenasStore()

    async function conectar_socket(){
      try{         
        connectionSocket = await new HubConnectionBuilder()
        .withUrl('https://10.1.1.125:82/MonitoreoAntenas/BackStatusAntena',{       
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        }).build()
        //connectionSocket.stop()

        connectionSocket.start().then(() => {                         
          connectionSocket.on('backSend', (data) => {    
              console.log(data)   
              if(idPlazaCurrent.value == data.idPlaza){                     
                MappeDataSocker(data)      
                monitoreoAntenasStore.addEventAntenaConcurrent(data)
              }
          })
        })    
      }
      catch(ex) { console.log("try code" + ex) }
    }
    conectar_socket()

    function conecta_o_desconecta_socket_plaza(idPlaza){
      console.log(idPlaza )
      idPlaza = idPlaza == undefined ? 0 : idPlaza
      idPlaza = idPlaza == '' ? 0 : idPlaza
      axios.post(`${API}/CarrilesMonitoreo/ChangePlazaActivaSocket/${idPlaza}/${1}`)
        .then((response) => {
          console.log(response)
        })
        .catch((ex) => console.log(ex)) 
    }

    function cerrar_modal(){        
      monitoreoAntenasStore.deleteEventAntenaConcurrent()      
      modalShow.value = false
      tipoalarma.value = ''
      carril.value = ''
      antenas.value = []       
      if(monitoreoAntenasStore.getEventAntenaConcurrent.length > 0)
      {        
        MappeDataSocker(monitoreoAntenasStore.getEventAntenaConcurrent[0])
      }     
    }    	
    function change_plaza_select(idPlaza){
      idPlazaCurrent.value = idPlaza
    }

    function MappeDataSocker(data){
      if(data.statusAntena == "ERROR_EN_ANTENA"){
                modalShow.value = true
                tipoalarma.value = 'ERROR'
                carril.value = data.ip
                plaza.value = data.plaza
                antenaStateChange.value = data.antenaStateChange.newState
                antenas.value = data.antenas
              }else if(data.statusAntena == "WARNING_EN_ANTENA"){
                modalShow.value = true
                tipoalarma.value = 'ALERTA'
                carril.value = data.ip
                plaza.value = data.plaza
                antenaStateChange.value = data.antenaStateChange.newState
                antenas.value = data.antenas
              }
              else if(data.statusAntena == "CHANGE_STATUS_EN_ANTENA"){                
                modalShow.value = true
                tipoalarma.value = 'CAMBIO_DE_ESTATUS'
                carril.value = data.ip
                plaza.value = data.plaza
                antenaStateChange.value = data.antenaStateChange.newState
                antenas.value = data.antenas              
              }else{
                modalShow.value = true
                tipoalarma.value = 'TEST'
                carril.value = data.ip
                plaza.value = data.plaza
                antenaStateChange.value = data.antenaStateChange.newState
                antenas.value = data.antenas
              }
    }

    onBeforeUnmount(() => {
      console.log('destruyendo socket connect onBeforeUnmount') 
      conecta_o_desconecta_socket_plaza(0)      
    })

    return { modalShow,tipoalarma,carril,antenas,plaza, idPlazaCurrent, antenaStateChange, cerrar_modal, conecta_o_desconecta_socket_plaza, change_plaza_select }    
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
