<template>
  <div class="w-full p-5 -mt-10 md:w-1/2">
    <router-link :to="ruta" tag="div">
      <div class="bg-blue-100 rounded-lg animacion p-8 ">
        <img class="img" :src="require('@/assets/' + img_src)" />
        <h1 class="text-center py-5 font-titulo font-bold">{{ nombre }}</h1>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "ModuloConfiguracion",
  props: ["nombre", "img_src", "ruta"],
};
</script>
<style scoped>
.border {
  border: 1px solid #ffffff;
  border-radius: 150px;
  -webkit-box-shadow: 5px 5px 14px -5px rgba(0, 0, 0, 0.44);
  box-shadow: 5px 5px 14px -5px rgba(0, 0, 0, 0.44);
}
.img {
  display: block;
  margin: auto;
  width: 200px;
  background-color: transparent;
}
.border h1 {
  text-align: center;
  padding-top: 15px;
}
</style>