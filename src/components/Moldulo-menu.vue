<template>
  <div class="w-1/2 md:w-1/4 p-5">
    <router-link :to="ruta" tag="div">
      <img class="imagen-modulo" :src="require('@/assets/' + imagen)" />
      </router-link>
      <h1 class="titulo-modulo">{{ titulo }}</h1>
    
  </div>
</template>

<script>
export default {
  name: "ModulosComp",
  props: ["titulo", "imagen", "ruta"],
};
</script>
<style scoped>
.titulo-modulo {
  text-align: center;
  padding-top: 5px;
  font-weight: 400;
}
.imagen-modulo {
    display: block;
  margin: auto;
  width: 230px;
  background-color: #d3d3d3;
}
</style>