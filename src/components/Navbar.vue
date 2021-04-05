<template>
  <div class="flex justify-between bg-nav">
    <div class="flex-none">
      <img class="logo" src="~@/assets/prosissinfondo.png"><img>
    </div>
    <div class="flex-none">
      <router-link to="/" tag="div">
        <button class="btn-salir">Salir</button>
      </router-link>
    </div>
  </div>
</template>

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
