<template>
  <div class="login">
    <Header></Header>
    <div class="flex h-screen min-700">
      <div id="login-form" class="flex flex-1 justify-center items-center h-screen min-700-imp">
        <div class="container mx-auto">
          <p id="login-title">Monitoreo de Pagos Electrónicos</p>
          <img class="img-centered" src="~@/assets/Login/top-user-logo.png" />
          <form class="bg-login-module" style="max-width: 500px; margin: auto">
            <div class="input-container">
              <img class="icon" src="~@/assets/Login/user.png" />
              <input
                class="input-field"
                type="text"
                placeholder="Username"
                name="usrnm"
              />
            </div>
            <div class="input-container">
              <img class="icon" src="~@/assets/Login/pass.png" />
              <!-- <i class="fa fa-key icon"></i>-->
              <input
                class="input-field"
                type="password"
                placeholder="Password"
                name="psw"
              />
            </div>
              <router-link to="/inicio" tag="div">
            <button type="submit" class="btn">Iniciar Sesión</button>
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
export default {
  name: "HelloWorld",
  components: {
    Footer,
    Header
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.min-700{
  min-height: 700px;
}
.min-700-imp{
  min-height: 700px !important;
}
#login-title {
  text-align: center;
  font-size: 28px;
}
@media (max-width:1024px){
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
  display: -ms-flexbox; /* IE10 */
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
.btn:focus{
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
@media (max-width:1024px){
  .img-centered {
  display: block;
  margin: auto;
  width: 110px;
  transform: translateY(50px);
}
}
</style>
