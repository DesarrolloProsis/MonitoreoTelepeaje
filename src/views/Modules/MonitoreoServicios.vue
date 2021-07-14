<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-0 resp-cont">
    <h1 class="title">Monitoreo de Servicios de Con Proveedor de Telepeaje</h1>
    <button
      :style="{ 'background-color': isActive1 ? '#fcb32a' : 'gray' }"
      @click="btn1()"
      class="btn-listas"
    >
      Mex-Ira
    </button>
    <button
      :style="{ 'background-color': isActive2 ? '#fcb32a' : 'gray' }"
      @click="btn2()"
      class="btn-listas"
    >
      Mex-Aca
    </button>
    <Tabla :dataListas="listas"></Tabla>
  </div>
  <Footer></Footer>
</template>
<script>
import Navbar from "../../components/Navbar";
import Tabla from "../../components/Tabla-monitoreo";
import Footer from "../../components/Footer-login";
import axios from "axios";
export default {
  components: {
    Navbar,
    Tabla,
    Footer
  },
  data() {
    return {
      res:[],
      listas: [],
      isActive1: true,
      isActive2: false,
      token:"",

    };
  },
  mounted() {
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    if(getCookie("Token")){
      this.token = getCookie("Token")
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }
      axios.get("http://prosisdev.sytes.net:84/api/Monitoreo", config)
      .then(response =>{
        this.res = response.data
        if(this.res.length != 0){
          let listaIra = this.res["historicosIrapuato"]
          listaIra.forEach(e =>{
            let obj = {
              plaza: e.plaza,
              actualizacionProveedor: e.ultimaActualizacionCarriles,
              ultactCarriles: e.ultimaActualizacionProveedor,
              ultcrucePlaza: e.ultimoLstabint,
              ultcruceEnviado: "2021/01/29 15:59:00",
            }
            this.listas.push(obj)
          })

        }
      })
    }
    this.btn1();
    this.interval = setInterval(() => this.actualizarData(), 1000*60);
  },
  methods: {
    actualizarData:function(){
      console.log("Actualizando data....")
      if(this.token){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        }
        axios.get("http://prosisdev.sytes.net:84/api/Monitoreo", config)
        .then(response =>{
          this.res = response.data
          console.log("Data actualizada exitosamente")
        })
      }
    },
    pedirLista: function (nombre){
      this.listas = []
      if(this.res.length != 0){
        let lista = this.res[nombre]
        lista.forEach(e =>{
          let obj = {
            plaza: e.plaza,
            actualizacionProveedor: e.ultimaActualizacionCarriles,
            ultactCarriles: e.ultimaActualizacionProveedor,
            ultcrucePlaza: e.ultimoLstabint,
            ultcruceEnviado: "2021/01/29 15:59:00",
          }
          this.listas.push(obj)
        })

      }
    },
    btn1: function () {
      this.isActive1 = true;
      this.isActive2 = false;
      //Consulta Axios
      this.pedirLista("historicosIrapuato")

    },
    btn2: function () {
      this.isActive2 = true;
      this.isActive1 = false;
      //Consulta Axios
      this.pedirLista("historicosAcapulco")

    },
  },
  unmounted(){
    clearInterval(this.interval)
  }
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
</style>
