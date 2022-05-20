<template>
  <Navbar/>
  <div class="h-screen md:h-full md:mb-0 mb-9">
    <h1 class="title-center font-titulo font-bold pb-1">Monitoreo de Carriles</h1>  
    <button class="bg-red-600" @click="detenerSocket">Detener Socket</button> 
    <TablaCarriles @conectar-socket-plaza="cambiarPlazaSocket"></TablaCarriles>
  </div>
  <Footer/>
</template>
<script>
import Navbar from "../../components/Navbar.vue";
import TablaCarriles from "../../components/Tabla-carriles.vue";
import Footer from "../../components/Footer-login";
//import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr"
//import { HubConnectionFactory } from "@ssv/signalr-client";

export default {
  components: {
    Navbar,
    TablaCarriles,
    Footer,
  },
  data: function(){
    return {
      connection: null,
      plazaId: null,
      hubFactory: null,
      hubSuscribe: null,
      hubInvokeSuscribe: null,
      hubConnectionSuscribe: null
    }
  },
  methods: {
    detenerSocket(){      
      try
      {   
        this.hubSuscribe.unsubscribe()
        // this.hubInvokeSuscribe.unsubscribe()
        // this.hubConnectionSuscribe.unsubscribe()
        //this.hubFactory.disconnectAll()  
        console.log('cerrando socket')        
        let hubConnection = this.hubFactory.get("test");
        console.log(hubConnection)
        //hubConnection.invoke('TestDisconnect')
        hubConnection.disconnect()
        // this.hubFactory.remove('test')

        // this.hubFactory = null
        // this.hubSuscribe = null
        // this.hubInvokeSuscribe = null
        // this.hubConnectionSuscribe = null
        //delete hubConnection
      }
      catch(ex)
      {
        console.log(ex)
      }
      // delete this.hubFactory


      
      // if(this.connection != null){
      //   if(this.connection.state == 'Connected'){                  
      //     this.connection.off('SendError')
      //     this.connection.off('SendWarning')
      //     this.connection.off('SendChange')          
      //   }
      // }
    },
    async cambiarPlazaSocket(value){   
      console.log(value)
      // if(this.plazaId == null)
      //   this.plazaId = value
      // else
      //   this.plazaId += 1
        
      // this.hubFactory = new HubConnectionFactory();

      // this.hubFactory.create({ 
      //   key: "test", endpointUri: "https://localhost:44301/MonitoreoAntenas/Status",
      //   options: {
      //       skipNegotiation: true,
      //       transport: 1        
      //   }    
      // });

      // let hubConnection = this.hubFactory.get("test");
      
      // hubConnection.connectionState$.subscribe(val => console.log(val))      
      // this.hubConnectionSuscribe = hubConnection.connect().subscribe()

      // setTimeout(() => {
      //   console.log('hello')
      //   this.hubInvokeSuscribe = hubConnection.invoke('SendMessage', this.plazaId).subscribe()
      //   this.hubSuscribe = hubConnection.on("SendError").subscribe(val => {
      //     console.log(`send :: data received >>>`, val);
      //   });
      //   //hubConnection.invoke('SendDisconnect')
      // },1000)

      // try{    
      //   if(this.plazaId == null)    
      //     this.plazaId = value

      //   if(this.connection != null){
      //     console.log(this.connection)
      //     console.log(this.connection.hub)
      //     let myHubProxy = this.connection.myHub
      //     console.log(myHubProxy)
      //     myHubProxy.client.stopClient = function(){
      //       this.connection.stop
      //     }
      //     await this.connection.stop()     
      //   }

      //   this.connection = null       
      //   this.connection = await new HubConnectionBuilder()
      //     .withUrl("https://localhost:44301/MonitoreoAntenas/Status",{
      //       skipNegotiation: true,
      //       transport: HttpTransportType.WebSockets
      //   }).build()


      //   this.connection.start().then(() => {
      //     this.plazaId += 1
      //     console.log(this.plazaId)
      //     this.connection.invoke('SendMessage', this.plazaId)
      //     this.connection.on('SendError', (data) => {
      //         console.log(data)
      //     })
      //     this.connection.on('SendWarning', (data) => {
      //         console.log(data)
      //     })
      //     this.connection.on('SendChange', (data) => {
      //         console.log(data)
      //     })  
      //   })    
      // }
      // catch(ex)
      // {
      //   console.log(ex)
      // }    
    }
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
