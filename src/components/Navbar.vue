<template>
  <div class="flex justify-between bg-nav">
    <div class="flex-none">
      <router-link to="/inicio" class="inline-block pl-5 pt-1 text-white text-xl" tag="div">
      <img class="logo inline" src="~@/assets/logoProsis.png" >
      Inicio 
      </router-link>
    </div>
    <span class="text-white mt-2">Bienvenido {{ nombre }}</span>
    <div class="flex-none border border-red-600 rounded-lg bg-red-500 animacion -mt-1">
      <router-link to="/" tag="div">
        <button class="btn-salir mt-2" @click="logout()">Salir</button>
      </router-link>
    </div>
  </div>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import Servicio from '../servicios/Token-Services';
//import jwt_decode from "jwt-decode";
import axios from "axios";
export default{
  data(){
    return {
      nombre:''
    }
  },
  beforeMount() {
    //Servicio.getCookie("Token")
    //let info = jwt_decode(Servicio.getCookie("Token"))
    let info = Servicio.obtenerInfoUser()
    this.nombre = info.nameid
  },
  methods:{
    logout: function(){      
      //if(Servicio.getCookie("Token")){
      if(Servicio.obtenerToken()){
        let info = Servicio.obtenerInfoUser() //jwt_decode(Servicio.getCookie("Token"))        
        try
        {
        document.cookie = "TipoUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "SameSite=None; Secure;";
        document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "SameSite=None; Secure;";
        this.$router.push('/')
        axios.post(`${API}/Login/LogOut/${info.UsuarioId}`)
        .then(() => {
            this.$router.push('/')
        })
        .catch((error) => console.log(error))
        }
        catch(error){
          console.log(error)
        }
      }
      else {        
        document.cookie = "TipoUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "SameSite=None; Secure;";
        document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "SameSite=None; Secure;";
        this.$router.push('/')
      }
    },
  }
}
</script>
<style scoped>
.bg-nav {
  background-color: #2c5282;
  padding: 10px;
}
.btn-salir {
  color: white;
  padding: 0px 10px;
  width: 80px;
}
.btn-salir:focus {
  outline: none;
}
.logo{
  width:30px;
}
</style>
