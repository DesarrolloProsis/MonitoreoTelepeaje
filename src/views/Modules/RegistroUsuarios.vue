<template>
<Navbar></Navbar>
<div class="container mx-auto mh-full">
  <div class="flex flex-wrap justify-center content-center h-full">
    <div class="flex-none">
      <h1 class="title">Registro de Usuarios</h1>
      <div class="bg-form p-5 mb-8 md:p-14">
        <div class="alert">{{errorMessage}}</div>
        <div class="flex flex-wrap pt-2">
          <div class="flex-1">Nombre</div>
          <div class="flex-1">
            <input id="nombre" class="input-w-100" type="text" />
          </div>
        </div>
        <div class="flex flex-wrap pt-2">
          <div class="flex-1">Apellido Paterno</div>
          <div class="flex-1"><input id="apellidoMa" class="input-w-100" type="text" /></div>
        </div>
        <div class="flex flex-wrap pt-2">
          <div class="flex-1">Apellido Materno</div>
          <div class="flex-1"><input id="apellidoPa" class="input-w-100" type="text" /></div>
        </div>
        <div class="flex flex-wrap pt-2">
          <div class="flex-1">Contraseña</div>
          <div class="flex-1">
            <input id="pass" class="input-w-100" type="password" />
          </div>
        </div>
        <div class="flex flex-wrap pt-2">
          <div class="flex-1">Rol</div>
          <div class="flex-1">
            <select id="rol" class="input-w-100" name="rol">
              <option value="0">Administrador</option>
              <option value="1" selected>Sistemas</option>
            </select>
          </div>
        </div>
        <div class="flex flex-wrap pt-4">
          <div class="flex-1">
            <button class="button btn-aceptar" @click="registro()">Aceptar</button>
          </div>
          <div class="flex-1">
            <router-link to="/configuracion">
              <button class="button btn-cancelar">Cancelar</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<Footer></Footer>
</template>
<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import axios from "axios";
export default {
  name: "PerfilUsuario",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      nombre: "",
      apellidoPa: "",
      apellidoMa: "",
      pass: "",
      rol: "",
      errorMessage: '',
    }
  },
  methods: {
    getCookie: function(cname) {
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
    },
    registro: function() {

      const data = {
        "password": this.pass = document.getElementById("pass").value,
        "nombre": this.nombre = document.getElementById("nombre").value,
        "apellidoPaterno": this.apellidoPa = document.getElementById("apellidoPa").value,
        "apellidoMaterno": this.apellidMa = document.getElementById("apellidoMa").value,
        "rol": this.rol = document.getElementById("rol").value
      }
      if(this.getCookie("Token")){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + this.getCookie("Token")
          }
        }
        if(data["password"] != "" &&  data["nombre"] != "" && data["apellidoPa"] != "" && data["apellidoMa"] != "" && data["rol"] != ""){
          axios.post("http://prosisdev.sytes.net:86/api/Usuario",data,config)
          .then((result)=>{
              console.log(result)
              this.errorMessage = ""
          })
          .catch(() =>{
            this.errorMessage = "Hubo un error al crear el usuario, intentalo nuevamente."

          })
        }else{
          this.errorMessage ="Error, llena todos los campos."
        }
      }

    }
  }
};
</script>
<style scoped>
.alert{
  color:red;
  font-size:20px;
}
.button {
  text-align: center;
  width: 100%;

  padding: 5px;
  border-radius: 15px;
}

.btn-aceptar {
  border-right: 4px solid #c7c7c7;
  background-color: #73ff6e;
  color: #0f640c;
}

.btn-cancelar {
  border-left: 4px solid #c7c7c7;
  background-color: #ff4545;
  color: #9b0000;
}

.input-w-100 {
  width: 100%;
  font-size: 18px;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
}

.title {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.mh-full {
  height: calc(100vh - 85px);
  min-height: 400px;
}

.bg-form {
  background-color: #c7c7c7;
  border-radius: 20px;
}

@media (max-width: 750px) {
  .title {
    font-size: 18px;
    padding-bottom: 20px;
  }
}
</style>
