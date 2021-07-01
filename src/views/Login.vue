<template>
<div class="login">
  <Header></Header>
  <div class="flex h-screen min-700">
    <div id="login-form" class="flex flex-1 justify-center items-center h-screen min-700-imp">
      <div class="container mx-auto">
        <p id="login-title">Monitoreo de Pagos Electrónicos</p>
        <img class="img-centered" src="~@/assets/Login/top-user-logo.png" />
        <form class="bg-login-module" style="max-width: 500px; margin: auto">
          <div class="error" v-if="mensaje != ''">
              {{mensaje}}
          </div>
          <div class="input-container">
            <img class="icon" src="~@/assets/Login/user.png" />
            <input id="username" class="input-field" type="text" placeholder="Username" />
          </div>
          <div class="input-container">
            <img class="icon" src="~@/assets/Login/pass.png" />
            <!-- <i class="fa fa-key icon"></i>-->
            <input id="password" class="input-field" type="password" placeholder="Password" />
          </div>
          <router-link to="/inicio">
            <button type="submit" class="btn" @click="login()">Iniciar Sesión</button>
          </router-link>
        </form>
      </div>
    </div>
    <div id="login-bg" class="flex-1 hidden md:block"></div>
  </div>
  <Footer></Footer>
</div>
</template>

<script>
import Footer from "../components/Footer-login.vue";
import Header from "../components/Header-login.vue";
import axios from "axios";
export default {
  name: "HelloWorld",
  components: {
    Footer,
    Header
  },
  props: {
    msg: String,
  },
  data(){
    return{
      user:"",
      pass:"",
      mensaje:""
    }
  },
  methods: {
    login: function() {
      document.cookie = "TipoUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "SameSite=None; Secure;";
      document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "SameSite=None; Secure;";
      this.user = document.getElementById("username").value;
      this.pass = document.getElementById("password").value;
      this.mensaje = ""
      const data = {
        "Usuario": this.user,
        "Password": this.pass
      }
      if(data["Usuario"] != "" &&  data["Password"] != ""){
        console.log("Cargando...")
        axios.post("http://prosisdev.sytes.net:84/api/Login", data)
        .then((result) => {
          console.log(result.data);
          // Set Cookie
          let d = new Date();
          let dias = 365;
          d.setTime(d.getTime() + dias * 24 * 60 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          document.cookie = "TipoUser=" + result.data['rol'] + ";" + expires + "SameSite=None; Secure;";
          document.cookie = "Token=" + result.data['bearer'] + ";" + expires + "SameSite=None; Secure;";
          this.mensaje =""
          this.$router.push('inicio')
        })
        .catch(()=>{
          this.mensaje="Error, verifica tus datos o intentalo más tarde."
        })
      }else{
        this.mensaje = "Escribe tu Usuario y Contraseña."
        console.log("NO hay datos para iniciar sesion")
      }
    },
  }
};
</script>

<style scoped>
.error{
  background-color: #f5b7b1;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  color:  #c0392b ;
}
.min-700 {
  min-height: 700px;
}

.min-700-imp {
  min-height: 700px !important;
}

#login-title {
  text-align: center;
  font-size: 28px;
}

@media (max-width:1024px) {
  #login-title {
    text-align: center;
    font-size: 23px;
  }
}

#login-bg {
  /*background-color: blue;*/
  background-image: url("~@/assets/Login/bg-login.png");
  background-size: cover;
}

#login-form {
  background-color: #ddd8d8;
  min-height: 100vh;
}

.bg-login-module {
  background-color: #eafff5;
  padding: 100px 50px;
  border-radius: 10px;
}

.input-container {
  display: -ms-flexbox;
  /* IE10 */
  display: flex;
  width: 100%;
  margin-bottom: 15px;
}

.icon {
  padding-right: 5px;
  color: blue;
  min-width: 50px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 10px;
  outline: none;
  border: 1px solid black;
  border-radius: 5px;
}

/* Set a style for the submit button */
.btn {
  background-color: dodgerblue;
  color: white;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
  border-radius: 25px;
}

.btn:focus {
  outline: 0;
}

.btn:hover {
  opacity: 1;
}

.img-centered {
  display: block;
  margin: auto;
  width: 130px;
  transform: translateY(50px);
}

@media (max-width:1024px) {
  .img-centered {
    display: block;
    margin: auto;
    width: 110px;
    transform: translateY(50px);
  }
}
</style>
