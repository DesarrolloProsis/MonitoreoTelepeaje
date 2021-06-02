<template>
  <div class="flex justify-between bg-nav">
    <div class="flex-none">
      <img class="logo" src="~@/assets/prosissinfondo.png"><img>
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
  background-color: #3e87f7;
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
 width:100px;
}
</style>
