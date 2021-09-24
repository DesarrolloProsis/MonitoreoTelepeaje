<template>
  <div class="flex justify-between bg-nav">
    <div class="flex-none">
      <router-link to="/inicio" class="inline-block pl-5 pt-1 text-white text-xl" tag="div">
      <img class="logo inline" src="~@/assets/logoProsis.png" >
      Inicio 
      </router-link>
    </div>
    <div class="flex-none">
      <router-link to="/" tag="div">
        <button class="btn-salir" @click="logout()">Salir</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default{
  methods:{
    logout: function(){
      document.cookie = "TipoUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "SameSite=None; Secure;";
      document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "SameSite=None; Secure;";
    }
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
}
.btn-salir:focus {
  outline: none;
}
.logo{
  width:30px;
}
</style>
